from django.contrib.auth.backends import BaseBackend
from .models import DiscordUser
from django.contrib.auth.models import User

class DiscordAuthenticationBackend(BaseBackend):
    def authenticate(self, request, user):
        print('CALLING FROM THE DISCORD AUTH BACKEND')
        try:
            user = DiscordUser.objects.get(id=user['id'])
        except DiscordUser.DoesNotExist:
            user = DiscordUser.objects.create_new_discord_user(user)
        return user

    def get_user(self, user_id):
        try: 
          return DiscordUser.objects.get(pk=user_id)
        except DiscordUser.DoesNotExist:
          return None