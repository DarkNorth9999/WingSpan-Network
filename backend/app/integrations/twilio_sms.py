from twilio.rest import Client

TWILIO_ACCOUNT_SID = 'AC6902800b3118d29294c6f2fb5762cac1'
TWILIO_AUTH_TOKEN = '3dbf584f3f15b409aa07c96668f7dd42'
TWILIO_PHONE_NUMBER = '+16187541957'
RECIPIENT_PHONE_NUMBER = '+919899079236'

async def send_sms(phone_list,message):
    try:
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

        for phone in phone_list:
            client.messages.create(
                to=phone,
                from_=TWILIO_PHONE_NUMBER,
                body=message
            )

        print("Message sent successfully!")
    except Exception as e:
        print(f"Failed to send the message: {e}")

