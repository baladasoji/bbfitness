import json
import requests
import boto3
from datetime import datetime
from decimal import Decimal
from boto3.dynamodb.conditions import Key, Attr


def lambda_handler(event, context):
    url='https://www.strava.com/api/v3/activities'
    params= dict(after='1615100000',per_page='100')
    dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
    table = dynamodb.Table('BBAthleteTokens')
    activitytable = dynamodb.Table('BBAthleteActivities')
    allathletes=table.scan()['Items']
    allathletes_activities=[]
    for athlete in allathletes:
        #print(athlete)
        access_token=athlete['tokeninfo']['access_token']
        headers={'Authorization': 'Bearer '+access_token}
        resp=requests.get(url=url, params=params,headers=headers)
        newresp = []
        athlete_activities={}
        if resp.status_code == 200 :
            respjson=resp.json()
            print (respjson)
            for r in respjson:
                dt = datetime.strptime(r['start_date_local'], '%Y-%m-%dT%H:%M:%SZ')
                #print (dt)
                newresp.append( {'id': r['id'], 'Title': r['name'], 'Type': r['type'], 'Distance': format(r['distance']/1000, ".2f"), 'Date': str(dt.date()), 'Week': int(dt.strftime('%W')) , 'Duration': format(r['elapsed_time']/60, ".2f"), 'Points':calculatePointsForActivity(r)  } )
                #print (r['name'])
                #print (r['type'])
                #print (r['distance']/1000)
            #print (newresp)
            athlete_activities = {'id' : athlete['id'], 'name' : athlete['tokeninfo']['athlete']['firstname'] , 'activities' : newresp }
            existing_activities = activitytable.get_item(Key={'id':athlete['id']} , AttributesToGet=['activities'])
            #print(existing_activities)
            #print(type(existing_activities))
            le = list(existing_activities)
            #print(type(le))
            #print(newresp)
            #print(type(newresp))
            activitytable.update_item(Key={'id':athlete['id']} , UpdateExpression='set activities = :obj', ExpressionAttributeValues={":obj" : remove_dup(list(existing_activities),newresp) })
            #activitytable.put_item(Item=athlete_activities)
            #print(resp.json()[]['name'])
            # TODO implement
            
        else:
            print ("Got a non 200 code"+ str(resp.status_code))
        
    return {
        'statusCode': 200,
        'body': { 'allactivities' : allathletes_activities }
    }
def remove_dup(l1,l2):
    #return list(set(l1 + l2))
    comb_list = l1+l2
    print("combilist is")
    print (comb_list)
    res = [] 
    [res.append(x) for x in comb_list if x not in res] 
    return res
    
    
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
    print(points)
    return int(points)
    
