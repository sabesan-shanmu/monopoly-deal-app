import os
from dotenv import load_dotenv
import pyrebase
from uuid import uuid4
from monopoly.models import Cards
from monopoly import create_app,db

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))
firebase_storage = os.environ.get("STORAGE")




firebaseConfig = {
  "apiKey": "removeed",
  "authDomain": "monopoly-deal-images.firebaseapp.com",
  "databaseURL": "https://monopoly-deal-images-default-rtdb.firebaseio.com",
  "projectId": "monopoly-deal-images",
  "storageBucket": "monopoly-deal-images.appspot.com",
  "messagingSenderId": "removed",
  "appId": "removed",
  "measurementId": "removed",
  "serviceAccount":"./firebase-config.json"
};

firebase = pyrebase.initialize_app(firebaseConfig)
storage = firebase.storage()
auth = firebase.auth()

uid = str(uuid4())
custom_token = auth.create_custom_token(uid)


user = input("Enter username:")
password = input("Enter password:")

user=auth.sign_in_with_email_and_password(user,password)

updated_cards = []

print("Starting property cards...")
source_folder = "..\\monopoly-cards\\property-cards\\"
for file_name in os.listdir(source_folder):
    card_id = file_name.split(".")[0]
    file_destination = source_folder+file_name
    file_source = os.path.join(basedir,source_folder+file_name)
    storage.child("property-cards/"+file_name).put(file_source,user["idToken"])
    url = storage.child("property-cards/"+file_name).get_url(None)
    updated_cards.append(Cards(cardImageUrl=url,propertiesCardId=int(card_id),rentCardId=None,actionCardId=None,cashCardId=None))
print("Finishing property cards...")


print("Starting rent cards...")
source_folder = "..\\monopoly-cards\\rent-cards\\"
for file_name in os.listdir(source_folder):
    card_id = file_name.split(".")[0]
    file_destination = source_folder+file_name
    file_source = os.path.join(basedir,source_folder+file_name)
    storage.child("rent-cards/"+file_name).put(file_source,user["idToken"])
    url = storage.child("rent-cards/"+file_name).get_url(None)
    updated_cards.append(Cards(cardImageUrl=url,propertiesCardId=None,rentCardId=int(card_id),actionCardId=None,cashCardId=None))
print("Finishing rent cards...")

print("Starting action cards...")
source_folder = "..\\monopoly-cards\\action-cards\\"
for file_name in os.listdir(source_folder):
    card_id = file_name.split(".")[0]
    file_destination = source_folder+file_name
    file_source = os.path.join(basedir,source_folder+file_name)
    storage.child("action-cards/"+file_name).put(file_source,user["idToken"])
    url = storage.child("action-cards/"+file_name).get_url(None)
    updated_cards.append(Cards(cardImageUrl=url,propertiesCardId=None,rentCardId=None,actionCardId=int(card_id),cashCardId=None))
print("Finishing action cards...")

print("Starting cash cards...")
source_folder = "..\\monopoly-cards\\cash-cards\\"
for file_name in os.listdir(source_folder):
    card_id = file_name.split(".")[0]
    file_destination = source_folder+file_name
    file_source = os.path.join(basedir,source_folder+file_name)
    storage.child("cash-cards/"+file_name).put(file_source,user["idToken"])
    url = storage.child("cash-cards/"+file_name).get_url(None)
    updated_cards.append(Cards(cardImageUrl=url,propertiesCardId=None,rentCardId=None,actionCardId=None,cashCardId=int(card_id)))
print("Finishing cash cards...")

app = create_app()
with app.app_context():

    try:
        cards = db.session.query(Cards).all()
        for c in cards:
            if c.propertiesCardId is not None:
                c.cardImageUrl = next((x.cardImageUrl for x in updated_cards if x.propertiesCardId==c.propertiesCardId), None)
            elif c.rentCardId is not None:
                c.cardImageUrl = next((x.cardImageUrl for x in updated_cards if x.rentCardId==c.rentCardId), None)
            elif c.actionCardId is not None:
                c.cardImageUrl = next((x.cardImageUrl for x in updated_cards if x.actionCardId==c.actionCardId), None)
            elif c.cashCardId is not None:
                c.cardImageUrl = next((x.cardImageUrl for x in updated_cards if x.cashCardId==c.cashCardId), None)
        db.session.commit() 
    except Exception as error:
        print(error)
        db.session.rollback()

print("Done!")
