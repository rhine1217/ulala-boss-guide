from dotenv import dotenv_values
import os, urllib.parse

def getenv():
    BASEDIR = os.path.abspath(os.path.dirname(__file__))
    env_values = dotenv_values(os.path.join(BASEDIR, '../.env/bin', '.env'))
    return env_values

def uriencode(text):
    return urllib.parse.quote(text, safe='')
