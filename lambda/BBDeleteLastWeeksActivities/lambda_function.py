import json
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
start_of_day = int(datetime(curyear,curmonth,curday,0,0).timestamp())
curtime = int(datetime.today().timestamp())
oneweekbefore = start_of_day - 604800


def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
    activitytable = dynamodb.Table('BBAthleteActivities')
    athlete_id = get_qp(event,'id')
    athlete_activities=activitytable.get_item(Key={'id': athlete_id })
    #print(athlete_activities)
    aa = athlete_activities.get('Item').get('activities')
    filtered_activities = list(filter(lambda x: (int(datetime.strptime(x['Date'],'%Y-%m-%d').strftime("%s")) < oneweekbefore), aa))
    logger.debug(filtered_activities);
    activitytable.update_item(Key={'id':athlete_id} , UpdateExpression='set activities = :obj', ExpressionAttributeValues={":obj" : filtered_activities })
    activitytable.update_item(Key={'id':athlete_id} , UpdateExpression='set lastupdated = :obj', ExpressionAttributeValues={":obj" : oneweekbefore })
    return {
        'statusCode': 200,
        'body': json.dumps("Removed last one week activities for athlete : "+ athlete_id)
    }

def get_qp(event,qp):
    qpid = None
    if event.get('params') is not None :
        qpid=event.get('params').get('querystring').get(qp)
    return qpid


if __name__ == '__main__':
    evnt={ "params": { "querystring": { "id": "9671032" } } }
    print(lambda_handler(evnt,None))
