from django.contrib.auth import models
from datetime import datetime

class DiscordUserOAuth2Manager(models.UserManager):
    def create_new_discord_user(self, user):
        new_user = self.create(
            id=user['id'],
            username=user['username'],
            discriminator=user['discriminator'],
            avatar=user['avatar'],
            locale=user['locale'],
            last_login=datetime.now()
        )
        return new_user