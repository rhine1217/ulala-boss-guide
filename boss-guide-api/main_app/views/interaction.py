from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from main_app.permissions import IsInteractionOwner
from main_app.models import UserLikes, BossSetup, SaveToUser, UserComments
from main_app.serializers import UserLikesSerializer, UserFavouritesSerializer, UserCommentsCreateSerializer, BossSetupListWithInteractionsSerializer, BossSetupListWithInteractionsCommentsSerializer

import urllib.parse
from utils import getenv
from hashids import Hashids
hashids = Hashids(salt=getenv()["HASH_ID_SALT"], min_length=16)

class UserLikesFavouritesCommentsCreateDestroy(viewsets.ViewSet):

    def get_object(self):
      slug = self.kwargs['slug']
      boss_setup_id = hashids.decode(slug)[0]
      obj = get_object_or_404(self.get_model_serializer()[0], boss_setup=boss_setup_id, user=self.request.user)
      self.check_object_permissions(self.request, obj)
      return obj
    
    def get_comment_obj(self):
      slug = self.kwargs['slug']
      comment_id = hashids.decode(slug)[0]
      obj = get_object_or_404(self.get_model_serializer()[0], pk=comment_id)
      self.check_object_permissions(self.request, obj)
      return obj
    
    def get_permissions(self):
        if self.action == 'create':
            permission_classes = (IsAuthenticated,)
        else:
            permission_classes = (IsInteractionOwner,)
        return [permission() for permission in permission_classes]
    
    def get_interaction_type(self):
        return self.request.query_params.get('interaction')
      
    def get_model_serializer(self):
        serializers = {
          'like': (UserLikes, UserLikesSerializer),
          'favourite': (SaveToUser, UserFavouritesSerializer),
          'comment': (UserComments, UserCommentsCreateSerializer)
        }
        return serializers[self.get_interaction_type()]
    
    def get_output_serializer(self):
        with_comments = self.request.query_params.get('withComments')
        if with_comments:
            return BossSetupListWithInteractionsCommentsSerializer
        else:
            return BossSetupListWithInteractionsSerializer
      
    def create(self, request):
        user_interaction_data = request.data
        boss_setup_id = hashids.decode(user_interaction_data['boss_setup'])[0]
        user_interaction_data['boss_setup'] = boss_setup_id
        serializer = self.get_model_serializer()[1](data=user_interaction_data)
        print('serializer', serializer)
        if serializer.is_valid():
            serializer.save()
            boss_serializer = self.get_output_serializer()(BossSetup.objects.get(pk=boss_setup_id), context={'request': request})
            return Response(boss_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, slug):
        user_interaction_obj = self.get_object()
        boss_setup_obj = user_interaction_obj.boss_setup
        user_interaction_obj.delete()
        boss_serializer = self.get_output_serializer()(boss_setup_obj, context={'request': request})
        return Response(boss_serializer.data, status=status.HTTP_200_OK)