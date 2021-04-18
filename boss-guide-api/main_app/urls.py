from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import maparea as views

urlpatterns = [
    path('maparea/', views.MapAreaList.as_view()),
    path('maparea/<int:pk>', views.MapAreaDetail.as_view()),
    path('bosssetup/', views.BossSetupList.as_view()),
    path('bosssetup/<int:pk>', views.BossSetupDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)