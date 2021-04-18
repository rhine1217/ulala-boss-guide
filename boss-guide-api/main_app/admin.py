from django.contrib import admin
from .models import DiscordUser, UlalaMapArea, UlalaBoss, UlalaClass, UlalaToy, UlalaSkill, BossSetup, PlayerSetup, UserComments, UserLikes, SaveToUser, Team, UserTeam, SaveToTeam

# Register your models here.

user_models = [DiscordUser, UserTeam, Team]
interaction_models = [UserComments, UserLikes, SaveToUser, SaveToTeam]
ulala_ref_models = [UlalaMapArea, UlalaBoss, UlalaClass, UlalaToy, UlalaSkill]
setup_models = [BossSetup, PlayerSetup]

admin.site.register(user_models)
admin.site.register(interaction_models)
admin.site.register(ulala_ref_models)
admin.site.register(setup_models)
