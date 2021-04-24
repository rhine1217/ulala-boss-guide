from django.contrib.postgres.fields import ArrayField
from django.db import models
from .managers import DiscordUserOAuth2Manager

# Create your models here.
class DiscordUser(models.Model):
    objects = DiscordUserOAuth2Manager()
    id = models.BigIntegerField(primary_key=True)
    username = models.CharField(max_length=32)
    discriminator = models.CharField(max_length=4)
    avatar = models.CharField(max_length=100)
    locale = models.CharField(max_length=16)
    last_login = models.DateTimeField()
    
    def is_authenticated(self):
        return True
    
    def is_active(self):
        return True

class UlalaMapArea(models.Model):
    continent = models.CharField(max_length=100)
    area = models.CharField(max_length=100)
    def __str__(self):
        return f'{self.continent} Continent, {self.area}'

class UlalaBoss(models.Model):
    name = models.CharField(max_length=100)
    map_area = models.ManyToManyField(UlalaMapArea)

class UlalaClass(models.Model):
    name = models.CharField(max_length=16)
    def __str__(self):
        return self.name
    
class UlalaCommonInfo(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    img_url = models.CharField(max_length=100, null=True)
    class Meta:
        abstract = True

class UlalaToy(UlalaCommonInfo):
    related_class = models.ManyToManyField(UlalaClass, related_name="toy_list")

class UlalaSkill(UlalaCommonInfo):
    related_class = models.ForeignKey(UlalaClass, on_delete=models.RESTRICT)
    energy = models.IntegerField(null=True)
    energy_type = models.CharField(max_length=16, blank=True, null=True)

class BossSetup(models.Model):
    boss = models.ForeignKey(UlalaBoss, on_delete=models.RESTRICT)
    created_by = models.ForeignKey(DiscordUser, on_delete=models.CASCADE)
    created_on = models.DateTimeField()
    published_on = models.DateTimeField(null=True)
    STATUS_CHOICES = [('P', 'Published'), ('D', 'Draft')]
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='D')
    note = models.TextField(blank=True)
  
class PlayerSetup(models.Model):
    boss_setup = models.ForeignKey(BossSetup, related_name='players', on_delete=models.CASCADE)
    player_class = models.ForeignKey(UlalaClass, on_delete=models.RESTRICT)
    skills = models.ManyToManyField(UlalaSkill)
    toys = models.ManyToManyField(UlalaToy)

class UserInteractions(models.Model):
    boss_setup = models.ForeignKey(BossSetup, on_delete=models.CASCADE)
    user = models.ForeignKey(DiscordUser, on_delete=models.CASCADE)
    class Meta:
        abstract = True

class UserComments(UserInteractions):
    comment = models.TextField()
    posted_date = models.DateTimeField()

class UserLikes(UserInteractions):
    pass

class SaveToUser(UserInteractions):
    pass
  
class Team(models.Model):
    members = models.ManyToManyField(DiscordUser, through='UserTeam', through_fields=('team', 'user'))

class UserTeam(models.Model):
    user = models.ForeignKey(DiscordUser, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    is_leader = models.BooleanField()

class SaveToTeam(UserInteractions):
    team_id = models.ForeignKey(UserTeam, on_delete=models.CASCADE)