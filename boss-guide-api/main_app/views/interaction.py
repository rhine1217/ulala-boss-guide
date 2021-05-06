from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from main_app.permissions import IsInteractionOwner
from main_app.models import UserLikes
from main_app.serializers import UserLikesSerializer

import urllib.parse
from utils import getenv
from hashids import Hashids
hashids = Hashids(salt=getenv()["HASH_ID_SALT"], min_length=16)

class UserLikesCreate(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        user_like_data = request.data
        boss_setup_id = hashids.decode(user_like_data['boss_setup'])[0]
        user_like_data['boss_setup'] = boss_setup_id
        serializer = UserLikesSerializer(data=user_like_data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLikesDestroy(APIView):
    permission_classes = (IsInteractionOwner,)
    def get_object(self):
        user_like_data = request.data
        boss_setup_id = hashids.decode(user_like_data['boss_setup'])[0]
        obj = get_object_or_404(UserLikes, boss_setup=boss_setup_id, user=user_like_data['user'])
        self.check_object_permissions(self.request, obj)
        return obj

    def delete(self, request):
        user_like_obj = self.get_object()
        user_like_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)