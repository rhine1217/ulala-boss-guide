from django.contrib.auth.backends import BaseBackend
from .models import DiscordUser
from django.contrib.auth.models import User
from django.utils import timezone

class DiscordAuthenticationBackend(BaseBackend):
    def authenticate(self, request, user):
        try:
            found_user = DiscordUser.objects.get(id=user['id'])
            found_user.discriminator = user['discriminator']
            found_user.avatar = user['avatar']
            found_user.username = user['username']
            found_user.last_login = timezone.now()
            found_user.save()
        except DiscordUser.DoesNotExist:
            found_user = DiscordUser.objects.create_new_discord_user(user)
        return found_user

    def get_user(self, user_id):
        try: 
          return DiscordUser.objects.get(pk=user_id)
        except DiscordUser.DoesNotExist:
          return None