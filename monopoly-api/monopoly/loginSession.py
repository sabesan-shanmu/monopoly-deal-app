from flask import session

def set_session(key,value):
    session[key]=value
    session.modified=True

def get_session(key):
    return session[key]

def delete_session(key):
    session.pop(key, None)