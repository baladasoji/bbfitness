import boto3
import simplejson as json
import decimal
import operator
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
    table = dynamodb.Table('BBAthleteTokens')
    response = table.scan()
    allitems = response['Items']
    #allitems.sort(key=operator.itemgetter('id'))
    print (allitems)
    return allitems


def myfunc():
    dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
    table = dynamodb.Table('BBAthleteActivities')
    athlete_id = '9671032'
    week_num = None
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
        totalpoints = sum(float(i['Points']) for i in acts)
        item['activities'] = acts
        item['totalpoints'] = totalpoints
    allitems=athleteActivities['Items']
    return allitems

if __name__ == '__main__':
    print(json.dumps(myfunc()))
    #myfunc()
