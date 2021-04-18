import requests

from django.shortcuts import redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from utils import getenv

auth_url_discord = getenv()["AUTH_URL_DISCORD"]

@login_required(login_url="/oauth2/login")
def get_authenticated_user(request):
    user = request.user
    return JsonResponse({"msg": "Authenticated"})

def discord_login(request):
    return redirect(auth_url_discord)
  
def discord_login_redirect(request):
    code = request.GET.get('code')
    user = exchange_code(code)
    discord_user = authenticate(request, user=user)
    login(request, discord_user)
    return redirect('/auth/user')
  
def exchange_code(code):
    data = {
      "client_id": getenv()["DISCORD_CLIENT_ID"],
      "client_secret": getenv()["DISCORD_CLIENT_SECRET"],
      "grant_type": "authorization_code",
      "code": code,
      "redirect_uri": getenv()["HOST_NAME"] + '/oauth2/login/redirect',
      "scope": "identify"
    }
    
    headers = {
        "Content-Type": 'application/x-www-form-urlencoded',
    }
    
    response = requests.post("https://discord.com/api/oauth2/token", data=data, headers=headers)
    credentials = response.json()
    access_token = credentials['access_token']
    response = requests.get("https://discord.com/api/v6/users/@me", headers={
        'Authorization': f'Bearer {access_token}'
    })
    user = response.json()
    return user

def user_logout(request):
    logout(request)
    return redirect('/admin')