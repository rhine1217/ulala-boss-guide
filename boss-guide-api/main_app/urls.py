from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import ulala as UlalaRefViews, setup as SetupViews

urlpatterns = [
    path('maparea/', UlalaRefViews.MapAreaList.as_view()),
    path('boss/', UlalaRefViews.UlalaBossList.as_view()),
    path('boss/<int:pk>', UlalaRefViews.UlalaBossDetail.as_view()),
    path('skill/', UlalaRefViews.UlalaSkillList.as_view()),
    path('toy/', UlalaRefViews.UlalaToyByClassList.as_view()),
    path('bosssetup/', SetupViews.BossSetupList.as_view()),
    path('bosssetup/<slug:slug>', SetupViews.BossSetupDetail.as_view()),
    path('bosssetup/favourite/', SetupViews.BossSetupFavouriteList.as_view()),
    path('addsetup/', SetupViews.BossPlayerSetupCreate.as_view()),
    path('editsetup/<slug:slug>', SetupViews.BossPlayerSetupUpdate.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)