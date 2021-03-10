import json
import requests
import boto3
import sys
from datetime import datetime
from decimal import Decimal
from boto3.dynamodb.conditions import Key, Attr
import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

today=datetime.today()
curyear=today.year
curmonth=today.month
curday=today.day
start_of_year = int(datetime(curyear,1,1,0,0).timestamp())
start_of_month = int(datetime(curyear,curmonth,1,0,0).timestamp())
start_of_day = int(datetime(curyear,curmonth,curday,0,0).timestamp())
curtime = int(datetime.today().timestamp())

def lambda_handler(event, context):
    url='https://www.strava.com/api/v3/activities'
    params= dict(after=start_of_year,per_page='200',before=start_of_day)
    dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
    table = dynamodb.Table('BBAthleteTokens')
    activitytable = dynamodb.Table('BBAthleteActivities')
    allathletes=table.scan()['Items']
    allathletes_activities=[]
    for athlete in allathletes:
        #print(athlete)
        logger.debug("Athlete is %s ", athlete);
        access_token=athlete['tokeninfo']['access_token']
        headers={'Authorization': 'Bearer '+access_token}
        resp=requests.get(url=url, params=params,headers=headers)
        newresp = []
        athlete_activities={}
        if resp.status_code == 200 :
            respjson=resp.json()
            #print (respjson)
            for r in respjson:
                dt = datetime.strptime(r['start_date_local'], '%Y-%m-%dT%H:%M:%SZ')
                newresp.append( {'id': r['id'], 'Title': r['name'], 'Type': r['type'], 'Distance': format(r['distance']/1000, ".2f"), 'Date': str(dt.date()), 'Week': int(dt.strftime('%W')) , 'Duration': format(r['elapsed_time']/60, ".2f"), 'Points':calculatePointsForActivity(r)  } )
            athlete_activities = {'id' : athlete['id'], 'name' : athlete['tokeninfo']['athlete']['firstname'] , 'activities' : newresp }
            activitytable.put_item(Item=athlete_activities)
            
        else:
            print ("Got a non 200 code"+ str(resp.status_code))
            logger.warn ("Got a non 200 code %s", resp)
        
    curtime_after = int(datetime.today().timestamp())
    time_taken=curtime_after-curtime
    return {
        'statusCode': 200,
        'body': { 'Status' : 'Ok', 'TimeTaken' : time_taken }
    }
    
def calculatePointsForActivity(r):
    points = 0
    if r['type'] == 'Run':
        points = r['distance']*0.005
    elif r['type'] == 'Walk':
        points = r['distance']*0.003
    elif r['type'] == 'Ride':
        points = r['distance']*0.002
    elif r['type'] == 'Workout':
        points = r['elapsed_time']*0.00139
    logger.debug(points)
    return int(points)
    
if __name__ == '__main__':
    print(lambda_handler(None,None))
