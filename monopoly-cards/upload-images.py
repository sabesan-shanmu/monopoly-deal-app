import os
from dotenv import load_dotenv
import pyrebase


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

source_folder = "property-cards\\"
for file_name in os.listdir(source_folder):
    file_destination = source_folder+file_name
    file_source = os.path.join(basedir,source_folder+file_name)
    storage.child("property-cards/"+file_name).put(file_source)


source_folder = "rent-cards\\"
for file_name in os.listdir(source_folder):
    file_destination = source_folder+file_name
    file_source = os.path.join(basedir,source_folder+file_name)
    storage.child("rent-cards/"+file_name).put(file_source)


source_folder = "action-cards\\"
for file_name in os.listdir(source_folder):
    file_destination = source_folder+file_name
    file_source = os.path.join(basedir,source_folder+file_name)
    storage.child("action-cards/"+file_name).put(file_source)


source_folder = "cash-cards\\"
for file_name in os.listdir(source_folder):
    file_destination = source_folder+file_name
    file_source = os.path.join(basedir,source_folder+file_name)
    storage.child("cash-cards/"+file_name).put(file_source)

