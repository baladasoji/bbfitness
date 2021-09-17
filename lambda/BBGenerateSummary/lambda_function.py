import json
import copy
import operator
from datetime import datetime
from operator import itemgetter
import boto3
from boto3.dynamodb.conditions import Key, Attr

today=datetime.today()
current_week_num= int(today.strftime('%W'))

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
    table = dynamodb.Table('BBAthleteActivities')
    summarytable = dynamodb.Table('BBAthleteSummary')
    athleteActivities = table.scan()
    for item in athleteActivities['Items']:
        summaryItem=copy.deepcopy(item)
        del summaryItem['activities']
        acts = item.get('activities')
        summaryItem['WeeklySummary'] = generateSummary(acts)
        generateYearlySummary(summaryItem)
        summarytable.put_item(Item=summaryItem)
    return {
        'statusCode': 200,
        'body': json.dumps('Finished')
    }

def generateYearlySummary(summaryItem):
    summaryItem['AnnualSummary'] = {'Run':0 , 'Ride':0, 'Walk':0, 'Swim':0, 'Others':0, 'Total':0 } 
    for wk in summaryItem['WeeklySummary'] :
        summaryItem['AnnualSummary']['Run'] = summaryItem['AnnualSummary']['Run'] + wk['Summary']['Run']
        summaryItem['AnnualSummary']['Ride'] = summaryItem['AnnualSummary']['Ride'] + wk['Summary']['Ride']
        summaryItem['AnnualSummary']['Walk'] = summaryItem['AnnualSummary']['Walk'] + wk['Summary']['Walk']
        summaryItem['AnnualSummary']['Swim'] = summaryItem['AnnualSummary']['Swim'] + wk['Summary']['Swim']
        summaryItem['AnnualSummary']['Others'] = summaryItem['AnnualSummary']['Others'] + wk['Summary']['Others']
        summaryItem['AnnualSummary']['Total'] = summaryItem['AnnualSummary']['Total'] + wk['Summary']['Total']

def generateSummary(detailactivities):
    sumacts=[]
    for i in range(1,current_week_num+1):
        acts=list(filter(lambda act: act.get('Week')==i, detailactivities))
        sumacts.append ({'Week': i, 'Summary' : {'Run':0 , 'Ride':0, 'Walk':0, 'Swim':0, 'Others':0, 'Total':0 } , 'acts':acts })
    for sumact in sumacts:
        for detailedact in sumact['acts']:
            if (detailedact['Type'] == 'Run'):
                sumact['Summary']['Run'] = sumact['Summary']['Run'] + detailedact['Points']
            elif (detailedact['Type'] == 'Ride' or detailedact['Type'] == 'EBikeRide'):
                sumact['Summary']['Ride'] = sumact['Summary']['Ride'] + detailedact['Points']
            elif (detailedact['Type'] == 'Walk'):
                sumact['Summary']['Walk'] = sumact['Summary']['Walk'] + detailedact['Points']
            elif (detailedact['Type'] == 'Swim'):
                sumact['Summary']['Swim'] = sumact['Summary']['Swim'] + detailedact['Points']
            else:
                sumact['Summary']['Others'] = sumact['Summary']['Others'] + detailedact['Points']
            sumact['Summary']['Total'] = sumact['Summary']['Total'] + detailedact['Points']
        del sumact['acts']
    return sumacts;

if __name__ == '__main__':
    print(lambda_handler(None,None))
