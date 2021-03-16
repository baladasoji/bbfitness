import json
import operator
from operator import itemgetter
import boto3
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    athlete_id = get_qp(event,'id')
    week_num = get_qp_asinteger(event,'week')
    print("Weeknum is")
    print(week_num)
    dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
    table = dynamodb.Table('BBAthleteActivities')
    fe=None
    if athlete_id is not None:
        fe = Key('id').eq(athlete_id)
    if fe is None:
        athleteActivities = table.scan()
    else :
        athleteActivities = table.scan( FilterExpression=fe )
    totalpoints = 0
    for item in athleteActivities['Items']:
        acts = item.get('activities')
        if week_num is not None:
            acts=list(filter(lambda act: act.get('Week')==week_num, acts))
            item['activities'] = acts
            item['week'] = week_num
    allitems=athleteActivities['Items']
    return allitems

def get_qp_asinteger(event,qp):
    qpid = None
    qpnum = None
    if event.get('params') is not None :
        qpid=event.get('params').get('querystring').get(qp)
    if qpid is not None:
        qpnum = int(qpid)
    return qpnum

   


def get_qp(event,qp):
    qpid = None
    if event.get('params') is not None :
        qpid=event.get('params').get('querystring').get(qp)
    return qpid
