import json
import requests
import boto3
import operator
import time
import os
from boto3.dynamodb.conditions import Key, Attr
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

bbclientsec = os.environ['bbclientsec']

def lambda_handler(event, context):
    
    dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
    table = dynamodb.Table('BBAthleteTokens')
    response=table.scan()
    allitems = response['Items']
    validate_tokens(allitems,table)
    return {
        'statusCode': 200,
        'body': allitems
    }
        
def validate_tokens(allitems,table):
    cur_time_epoch= int(time.time())
    for item in allitems:
        expirytime=int(item.get('tokeninfo').get('expires_at'))
        print (expirytime)
        print (cur_time_epoch)
        if (expirytime < cur_time_epoch+3600):
            logger.info("token has expired or is expiring soon. Trying to obtain a fresh token")
            fresh_token_response=get_fresh_token(item.get('tokeninfo').get('refresh_token'))
            item['tokeninfo']['expires_at']=fresh_token_response.get('expires_at')
            item['tokeninfo']['access_token']=fresh_token_response.get('access_token')
            item['tokeninfo']['refresh_token']=fresh_token_response.get('refresh_token')
            item['tokeninfo']['expires_in']=fresh_token_response.get('expires_in')
            table.put_item(Item=item)
            logger.info("obtained a fresh token ")
            logger.info(fresh_token_response)
        else:
            print ("Token is still valid")

def get_fresh_token(refreshtoken):
    url='https://www.strava.com/api/v3/oauth/token'
    data={'client_id':'52553', 'client_secret':bbclientsec , 'grant_type':'refresh_token' ,'refresh_token':refreshtoken }
    resp=requests.post(url, data=data)
    if resp.status_code == 200 :
        respjson=resp.json()
        return respjson
    else:
        logger.warn("Error getting a fresh token")
        return {}
    
        

def get_bodyjson(event):
    body = None
    if event.get('body-json') is not None :
        body=event.get('body-json')
    return body
