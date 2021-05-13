from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import auth as AuthViews, ulala as UlalaRefViews, setup as SetupViews, interaction as InteractionViews

urlpatterns = [
    path('auth/user', AuthViews.get_authenticated_user, name='get_authenticated_user'),
    path('auth/user/logout', AuthViews.user_logout, name='user_logout'),
    path('oauth2/login', AuthViews.discord_login, name="oauth_login"),
    path('oauth2/login/redirect', AuthViews.discord_login_redirect, name="oauth_login_redirect"),
    path('maparea/', UlalaRefViews.MapAreaList.as_view()),
    path('boss/', UlalaRefViews.UlalaBossList.as_view()),
    path('boss/<int:pk>', UlalaRefViews.UlalaBossDetail.as_view()),
    path('skill/', UlalaRefViews.UlalaSkillList.as_view()),
    path('toy/', UlalaRefViews.UlalaToyByClassList.as_view()),
    path('bosssetup/', SetupViews.BossSetupList.as_view()),
    path('bosssetup/count', SetupViews.BossSetupCount.as_view()),
    path('bosssetup/random/', SetupViews.BossSetupListRandom.as_view()),
    path('bosssetup/<slug:slug>', SetupViews.BossSetupDetail.as_view()),
    path('bosssetup/favourite/', SetupViews.BossSetupFavouriteList.as_view()),
    path('addsetup/', SetupViews.BossPlayerSetupCreate.as_view()),
    path('editsetup/<slug:slug>', SetupViews.BossPlayerSetupUpdate.as_view()),
    path('interaction/', InteractionViews.UserLikesFavouritesCommentsCreateDestroy.as_view({'post': 'create'})),
    path('interaction/<slug:slug>', InteractionViews.UserLikesFavouritesCommentsCreateDestroy.as_view({'delete': 'destroy'}))
]

urlpatterns = format_suffix_patterns(urlpatterns)