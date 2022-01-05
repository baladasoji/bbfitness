import json
import boto3
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    event_id= get_qp(event,'eventid')
    athlete_id = get_qp(event,'id')
    dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
    eventtable = dynamodb.Table('BBEvents')
    print(athlete_id)
    eventtable.update_item(Key={'id':event_id} , UpdateExpression='set participants = list_append(participants,:obj)', ExpressionAttributeValues={':obj' : [athlete_id] })
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
    
def get_qp(event,qp):
    qpid = None
    if event.get('params') is not None :
        qpid=event.get('params').get('querystring').get(qp)
    return qpid