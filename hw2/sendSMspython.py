import json
import boto3

def lambda_handler(event, context):
    # TODO implement
    client = boto3.client(
    "sns",
    # aws_access_key_id="YOUR ACCES KEY",
    # aws_secret_access_key="YOUR SECRET KEY",
    region_name="us-east-1"
    )

# Send your sms message.
    client.publish(
        PhoneNumber="+9293106827",
        Message="Hello World!"
    )
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
