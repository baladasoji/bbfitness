import json
import requests
import boto3
import os
from decimal import Decimal
from boto3.dynamodb.conditions import Key, Attr

bbclientsec = os.environ['bbclientsec']

def lambda_handler(event, context):
    url='https://www.strava.com/api/v3/oauth/token'
    body = get_bodyjson(event)
    code= body.get('AuthorizationCode')
    #code='d3d6d2d91e59c74a3f4d9ed4062b79688cf89f39'
    data={'client_id':'52553', 'client_secret':bbclientsec, 'code':code ,'grant_type':'authorization_code' }
    resp=requests.post(url, data=data)
    if resp.status_code == 200 :
        respjson=resp.json()
        respjson1 = json.loads(json.dumps(respjson), parse_float=Decimal)
        id=respjson1['athlete']['id']
        dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
        table = dynamodb.Table('BBAthleteTokens')
        response = table.put_item(
           Item={
                'id':str(id),
                'tokeninfo': respjson1
                }
        )
        
        #print(resp.json()[]['name'])
        # TODO implement
        return {
            'statusCode': 200,
            'body': respjson1['athlete']
        }
    else:
        print ("Got a non 200 code :"+ str(resp))
        return {
            'statusCode': resp.status_code,
            'body' : 'Error in obtaining token'
        }
        
        
        
def get_bodyjson(event):
    body = None
    if event.get('body-json') is not None :
        body=event.get('body-json')
    return body
