import copy
import json
import operator
from datetime import datetime
from operator import itemgetter
import boto3
from boto3.dynamodb.conditions import Key, Attr
today=datetime.today()
current_week_num= int(today.strftime('%W'))

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
    table = dynamodb.Table('BBAthleteSummary')
    athlete_id = get_qp(event,'id')
    sumtype = get_qp(event,'type')
    fe = None
    if athlete_id is not None:
        fe = Key('id').eq(athlete_id)
    if fe is None:
        athleteActivities = table.scan()
        items=athleteActivities['Items']
        if sumtype is not None:
            if sumtype == 'yearly':
                annual_summary=[]
                for summaryItem in items:
                    summaryItem['Summary']=summaryItem['AnnualSummary']
                    del summaryItem['WeeklySummary']
                    del summaryItem['AnnualSummary']
                    annual_summary.append(summaryItem);
                return annual_summary
            else :
                curweek_summary=[]
                for summaryItem in items:
                    summaryItem['Summary'] = summaryItem['WeeklySummary'][current_week_num-1]['Summary']
                    del summaryItem['WeeklySummary']
                    del summaryItem['AnnualSummary']
                    curweek_summary.append(summaryItem);
                return curweek_summary
        else:
            return items
    
    else :
        athleteActivities = table.scan( FilterExpression=fe )
        return athleteActivities['Items']
        
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

if __name__ == '__main__':
    print(lambda_handler({'params' : {'querystring' : {'type' : 'yearly'}}},None))
    #print(lambda_handler({},None))
