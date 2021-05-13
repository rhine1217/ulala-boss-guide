import requests

from django.shortcuts import redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse

from decouple import config

auth_url_discord = config("AUTH_URL_DISCORD")

def get_authenticated_user(request):
    user = request.user
    if user.is_authenticated:
      return JsonResponse({
        "id": user.id,
        "username": user.username + '#' + user.discriminator,
        "avatar": user.avatar
      })
    else: 
      return HttpResponse(status=401)

def discord_login(request):
    return redirect(auth_url_discord)
  
def discord_login_redirect(request):
    code = request.GET.get('code')
    user = exchange_code(code)
    discord_user = authenticate(request, user=user)
    login(request, discord_user)
    return redirect('http://127.0.0.1:3000/login/success')
  
def exchange_code(code):
    data = {
      "client_id": config("DISCORD_CLIENT_ID"),
      "client_secret": config("DISCORD_CLIENT_SECRET"),
      "grant_type": "authorization_code",
      "code": code,
      "redirect_uri": config("HOST_NAME") + '/api/v1/oauth2/login/redirect',
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
    return redirect('http://127.0.0.1:3000')