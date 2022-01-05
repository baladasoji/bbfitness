import json
import jwt
from jwt import PyJWKClient

def lambda_handler(event, context):
    print(event)
    header=event['params']['header']
    if 'Authorization' in header:
        token=header['Authorization']
        token=token[7:]
        retbody = verify_token(token)
        if 'error' in retbody:
            status=403
        else:
            status=200
        return {
            'statusCode': status,
            'body': retbody
        }
    else:
        return {
            'statusCode': 403,
            'body': 'No Bearer token provided in headers'
        }



def verify_token(token):
    url = "https://everymovecounts.b2clogin.com/everymovecounts.onmicrosoft.com/discovery/v2.0/keys?p=b2c_1_emcsignin"
    jwks_client = PyJWKClient(url)
    decoded_token=''
    retdict={}
    try:
        signing_key = jwks_client.get_signing_key_from_jwt(token)
        data = jwt.decode(
         token,
         signing_key.key,
         algorithms=["RS256"],
         audience="08ebc94f-55a7-45bf-9586-56f69290af27",
         options={"verify_exp": True, "require": ["exp", "iss", "sub"]}
        )
        decoded_token=data
    except Exception as e:
        retdict['error']= 'Error in validating token :' + ' '+str(e)
    else:
        retdict={}
        #print (decoded_token)
        retdict['emails'] =decoded_token.pop('emails')
        retdict['sub'] =decoded_token.pop('sub')
        retdict['given_name'] =decoded_token.pop('given_name')
        retdict['extension_StravaID'] =decoded_token.pop('extension_StravaID')
    return retdict;

if __name__ == '__main__':
    evnt={ "params": { "querystring": { "id": "9671032" } , "header" : {"Authorization": "Bearer eyJOeXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJleHAiOjE2MzQ2MzQ4MDQsIm5iZiI6MTYzNDYzMTIwNCwidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9ldmVyeW1vdmVjb3VudHMuYjJjbG9naW4uY29tLzkxYjQ3YmQ4LTFhZjMtNDc5OS05NDlhLWEyYjhlNDk3ZTU1ZS92Mi4wLyIsInN1YiI6Ijc2YjAxODkwLTM5NDgtNDI4MC04ZGY1LTdhZWM5MTgwZDYwYSIsImF1ZCI6IjA4ZWJjOTRmLTU1YTctNDViZi05NTg2LTU2ZjY5MjkwYWYyNyIsIm5vbmNlIjoiZGVmYXVsdE5vbmNlIiwiaWF0IjoxNjM0NjMxMjA0LCJhdXRoX3RpbWUiOjE2MzQ2MzEyMDQsImdpdmVuX25hbWUiOiJCYWxhIiwiZmFtaWx5X25hbWUiOiJEYXNvamkiLCJuYW1lIjoiQmFsYSBEYXNvamkiLCJpZHAiOiJnb29nbGUuY29tIiwib2lkIjoiNzZiMDE4OTAtMzk0OC00MjgwLThkZjUtN2FlYzkxODBkNjBhIiwiY2l0eSI6IkJyw7huZGJ5IiwiY291bnRyeSI6IkRlbm1hcmsiLCJleHRlbnNpb25fU3RyYXZhSUQiOiI5NjcxMDMyIiwiZW1haWxzIjpbImJhbGEuZGFzb2ppQGdtYWlsLmNvbSJdLCJ0ZnAiOiJCMkNfMV9FTUNTaWduSW4ifQ.E64O4eqDInxSx4zLbWg9VmLq65p73YNTS5ijpYdp_IAYqeYSlMA_YHDEdnCAsE2U7NqB_rvgpb_gFnGAst2ob3zZBYbVfkJWegtOhU_rwkB6Otw3ELRZ4B-nARj0u2Qa8Mh8k9wpILTqa59OR8ZDVH2vqkhw4JixjBWim9zMw1-sNDfc7sqA9XXClLjpDG3GXzWH4sU3HA2Xz9KjaLabsuVR_ZKkw_K3Lx5UjLQ8cd0m2byWgMiX4sskvz22vVGXN4td0XZA67-zDAg5sGv2C7wcAmIkRMQfN3Wmx2qIaVmatGG2q3m-LpTeBLFMGi5wrbToKJX0it3UuA-J65qRgA"}}}
    print(lambda_handler(evnt,None))
