import json
import operator
from operator import itemgetter
import boto3
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
    table = dynamodb.Table('BBEvents')
    events = table.scan()
    return events['Items']
    