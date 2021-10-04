import os
from dotenv import load_dotenv
import pyrebase
from uuid import uuid4

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))
firebase_storage = os.environ.get("STORAGE")




firebaseConfig = {
  "apiKey": "AIzaSyADCnd17s0cs4kbRzCM5WIrlbxegOBjtes",
  "authDomain":"monopoly-deal-images.firebaseapp.com",
  "databaseURL":"https://monopoly-deal-images-default-rtdb.firebaseio.com/",
  "storageBucket": "monopoly-deal-images.appspot.com",
  "serviceAccount":"./firebase-config.json"
}

firebase = pyrebase.initialize_app(firebaseConfig)
storage = firebase.storage()
auth = firebase.auth()

uid = str(uuid4())
custom_token = auth.create_custom_token(uid)


source_folder = "..\\monopoly-cards\\property-cards\\"
property_cards = []
propert_card_id = 1
for file_name in os.listdir(source_folder):
    file_destination = source_folder+file_name
    file_source = os.path.join(basedir,source_folder+file_name)
    storage.child("property-cards/"+file_name).put(file_source)
    url = storage.child("property-cards/"+file_name).get_url(custom_token)
    #property_cards.append()
    print(url)


source_folder = "..\\monopoly-cards\\rent-cards\\"
rent_cards = []
rent_card_id = 1
for file_name in os.listdir(source_folder):
    file_destination = source_folder+file_name
    file_source = os.path.join(basedir,source_folder+file_name)
    storage.child("rent-cards/"+file_name).put(file_source)
    url = storage.child("property-cards/"+file_name).get_url(custom_token)
    print(url)


source_folder = "..\\monopoly-cards\\action-cards\\"
action_cards = []
action_card_id = 1
for file_name in os.listdir(source_folder):
    file_destination = source_folder+file_name
    file_source = os.path.join(basedir,source_folder+file_name)
    storage.child("action-cards/"+file_name).put(file_source)
    url = storage.child("property-cards/"+file_name).get_url(custom_token)
    print(url)
    #action_cards.append(Cards(cardId=action_card_id,))
    #action_card_id+=1

source_folder = "..\\monopoly-cards\\cash-cards\\"
cash_cards = []
cash_card_id = 1
for file_name in os.listdir(source_folder):
    file_destination = source_folder+file_name
    file_source = os.path.join(basedir,source_folder+file_name)
    storage.child("cash-cards/"+file_name).put(file_source)
    url = storage.child("property-cards/"+file_name).get_url(custom_token)
    print(url)
