"""ulala_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from main_app.views import auth as views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/user', views.get_authenticated_user, name='get_authenticated_user'),
    path('auth/user/logout', views.user_logout, name='user_logout'),
    path('oauth2/login', views.discord_login, name="oauth_login"),
    path('oauth2/login/redirect', views.discord_login_redirect, name="oauth_login_redirect"),
    path('api/', include('main_app.urls'))
]
