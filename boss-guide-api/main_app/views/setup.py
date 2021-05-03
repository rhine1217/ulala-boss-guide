from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from main_app.models import BossSetup, PlayerSetup
from main_app.serializers import BossSetupListSerializer, BossSetupCreateUpdateSerializer, PlayerSetupCreateUpdateSerializer

import urllib.parse
from utils import getenv
from hashids import Hashids
hashids = Hashids(salt=getenv()["HASH_ID_SALT"], min_length=16)

class BossSetupList(generics.ListAPIView):
    serializer_class=BossSetupListSerializer
    def get_queryset(self):
        queryset = BossSetup.objects.all()
        bossname_encoded = self.request.query_params.get('name')
        if bossname_encoded is not None:
          bossname = urllib.parse.unquote(bossname_encoded)
          queryset = queryset.filter(boss__name=bossname)
        return queryset

class BossSetupDetail(generics.RetrieveAPIView):
    serializer_class=BossSetupListSerializer
    def get_object(self):
        slug = self.kwargs['slug']
        boss_setup_id = hashids.decode(slug)[0]
        obj = BossSetup.objects.get(id=boss_setup_id)
        try:
          return obj
        except obj.DoesNotExist:
          return Response(status=status.HTTP_404_NOT_FOUND)

class BossPlayerSetupCreate(APIView):
    def post(self, request, format=None):
        boss_setup_data = request.data['bossSetup']
        player_setups = request.data['playerSetups']
        new_boss_setup = BossSetupCreateSerializer(data=boss_setup_data)
        if new_boss_setup.is_valid():
            new_boss_setup.save()
            for i, player_setup in enumerate(player_setups):
                player_setup_data = {}
                player_setup_data['boss_setup'] = new_boss_setup['id'].value
                player_setup_data['player_class'] = player_setup['player_class']
                for j, skill in enumerate(player_setup['skills']):
                    player_setup_data[f'skill{j+1}'] = skill
                for k, toy in enumerate(player_setup['toys']):
                    player_setup_data[f'toy{k+1}'] = toy
                new_player_setup = PlayerSetupCreateSerializer(data=player_setup_data)
                if new_player_setup.is_valid():
                    new_player_setup.save()
            serializer = BossSetupListSerializer(BossSetup.objects.get(pk=new_boss_setup['id'].value))
            return Response(serializer.data, status=status.HTTP_201_CREATED, content_type='application/json')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BossPlayerSetupUpdate(APIView):
    def patch(self, request, slug, format=None):
        boss_setup_id = hashids.decode(slug)[0]
        boss_setup_obj = BossSetup.objects.get(id=boss_setup_id)
        boss_setup_data = request.data['bossSetup']
        player_setups_data = request.data['playerSetups']
        new_boss_setup = BossSetupCreateUpdateSerializer(boss_setup_obj, data=boss_setup_data, partial=True)
        if new_boss_setup.is_valid():
            new_boss_setup.save()
            current_player_setups = PlayerSetup.objects.filter(boss_setup=boss_setup_id)
            for i, player_setup_obj in enumerate(current_player_setups):
                player_setup_data = {}
                player_setup_data['player_class'] = player_setups_data[i]['player_class']
                for j, skill in enumerate(player_setups_data[i]['skills']):
                    player_setup_data[f'skill{j+1}'] = skill
                for k, toy in enumerate(player_setups_data[i]['toys']):
                    player_setup_data[f'toy{k+1}'] = toy
                new_player_setup = PlayerSetupCreateUpdateSerializer(player_setup_obj, data=player_setup_data, partial=True)
                if new_player_setup.is_valid():
                    new_player_setup.save()
            serializer = BossSetupListSerializer(BossSetup.objects.get(pk=boss_setup_id))
            return Response(serializer.data, status=status.HTTP_200_OK, content_type='application/json')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)