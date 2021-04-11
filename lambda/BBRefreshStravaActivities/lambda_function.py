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

# Activity type definitions and point multpliers
# Gives 5 points per 100 meters
distance_intensity_level1 = [ 'Swim' ]
dil1_point_multiplier = 0.05
# Gives 5 points per 1 km
distance_intensity_level2 = [ 'Run' ]
dil2_point_multiplier = 0.005
# Gives 3 points per 1 km
distance_intensity_level3 = [ 'Walk' ]
dil3_point_multiplier = 0.003
# Gives 2 points per 1 km
distance_intensity_level4 = [ 'Ride', 'InlineSkate', 'RollerSki', 'AlpineSki', 'BackcountrySki', 'IceSkate', 'Skateboard','EBikeRide'  ]
dil4_point_multiplier = 0.002
# Gives 15 points for 1 hour
time_intensity_level1 = [ 'RockClimbing', 'Canoeing', 'Crossfit', 'Elliptical', 'Handcycle', 'Hike', 'Kayaking', 'Kitesurf', 'NordicSki', 'Wheelchair', 'Windsurf', 'Workout', 'Yoga', 'Rowing', 'Sail', 'Snowboard', 'Snowshoe', 'Soccer', 'StairStepper', 'StandUpPaddling', 'Surfing', 'Velomobile', 'VirtualRide', 'VirtualRun', 'WeightTraining']
til1_point_multiplier = 0.00416
# Gives 10 points for 1 hour
time_intensity_level2 = [ 'Golf' ]
til2_point_multiplier = 0.00277
    


def lambda_handler(event, context):
    url='https://www.strava.com/api/v3/activities'
    dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
    table = dynamodb.Table('BBAthleteTokens')
    activitytable = dynamodb.Table('BBAthleteActivities')
    allathletes=table.scan()['Items']
    allathletes_activities=[]
    num_added=0
    num_updated=0
    num_skipped=0
    num_failed=0
    for athlete in allathletes:
        #print(athlete)
        logger.debug("Athlete is %s ", athlete);
        access_token=athlete['tokeninfo']['access_token']
        headers={'Authorization': 'Bearer '+access_token}
        athlete_id = athlete['id']
        athlete_name =  athlete['tokeninfo']['athlete']['firstname'] + " " + athlete['tokeninfo']['athlete']['lastname']
        athlete_pic_url = athlete['tokeninfo']['athlete']['profile_medium']
        athlete_entry = get_athlete_from_activities (athlete_id, activitytable)
        if athlete_entry is None :
            start_time = start_of_year
            end_time = curtime
            # We did not find the athlete in the activity table. Hence we get the full monty and set the item
            params= dict(after=start_time,per_page='200',before=end_time)
            resp=requests.get(url=url, params=params,headers=headers)
            newresp = []
            athlete_activities={}
            if resp.status_code == 200 :
                respjson=resp.json()
                for r in respjson:
                    dt = datetime.strptime(r['start_date_local'], '%Y-%m-%dT%H:%M:%SZ')
                    newresp.append( {'id': r['id'], 'Title': r['name'], 'Type': r['type'], 'Distance': format(r['distance']/1000, ".2f"), 'Date': str(dt.date()), 'Week': int(dt.strftime('%W')) , 'Duration': format(r['elapsed_time']/60, ".2f"), 'Points':calculatePointsForActivity(r)  } )
                athlete_activities = {'id' : athlete_id, 'name' : athlete_name , 'picture' : athlete_pic_url, 'lastupdated': end_time, 'activities' : newresp }
                activitytable.put_item(Item=athlete_activities)
                num_added+=1
            else:
                logger.warn ("Got a non 200 code %s", resp)
        else:
            start_time= athlete_entry['lastupdated']
            end_time= curtime
            # If not updated in the last 12 hours
            if end_time-start_time > 43000 :
                params= dict(after=start_time,per_page='150',before=end_time)
                resp=requests.get(url=url, params=params,headers=headers)
                newresp = []
                if resp.status_code == 200 :
                    respjson=resp.json()
                    for r in respjson:
                        dt = datetime.strptime(r['start_date_local'], '%Y-%m-%dT%H:%M:%SZ')
                        newresp.append( {'id': r['id'], 'Title': r['name'], 'Type': r['type'], 'Distance': format(r['distance']/1000, ".2f"), 'Date': str(dt.date()), 'Week': int(dt.strftime('%W')) , 'Duration': format(r['elapsed_time']/60, ".2f"), 'Points':calculatePointsForActivity(r)  } )
                    activitytable.update_item(Key={'id':athlete_id} , UpdateExpression='set activities = list_append(activities,:obj)', ExpressionAttributeValues={":obj" : newresp })
                    activitytable.update_item(Key={'id':athlete_id} , UpdateExpression='set lastupdated = :obj', ExpressionAttributeValues={":obj" : curtime })
                    num_updated+=1
                else:
                    logger.warn ("Got a non 200 code %s", resp)
                    num_failed+=1
            else :
                num_skipped+=1
                logger.debug ('Athlete %s recently updated hence taking no action', athlete_id)
    curtime_after = int(datetime.today().timestamp())
    time_taken=curtime_after-curtime
    response = {
        'statusCode': 200,
        'body': { 'Status' : 'Ok', 'TimeTaken' : time_taken , 'Number of user created' : num_added, 'Number of users updated' : num_updated,'Number of users skipped' : num_skipped, 'Number of users failed' : num_failed   }
    }
    logger.info(response)
    return response


def get_athlete_from_activities(id, table):
    try:
        response = table.get_item(Key={'id': id})
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        if 'Item' not in response:
            return None
        return response['Item']
    
def calculatePointsForActivity(r):
    points = 0.0
    activity_type = r['type']
    activity_distance = r['distance']
    activity_time = r['elapsed_time']
    if activity_type is None:
        return 0
    elif activity_type in distance_intensity_level1 :
        points = activity_distance * 0.05
    elif activity_type in distance_intensity_level2 :
        points = activity_distance * 0.005
    elif activity_type in distance_intensity_level3 :
        points = activity_distance * 0.003
    elif activity_type in distance_intensity_level4 :
        points = activity_distance * 0.002
    elif activity_type in time_intensity_level1 :
        points = activity_time * 0.00417
    points = int(points)
    logger.debug("Activity type: %s , Activity distance: %s, Activity time : %s, Points: %s ", activity_type, activity_distance, activity_time, points )
    return (points)
    
if __name__ == '__main__':
    print(lambda_handler(None,None))
