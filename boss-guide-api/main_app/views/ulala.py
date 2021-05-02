from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from main_app.models import UlalaMapArea, BossSetup, UlalaBoss, UlalaSkill, UlalaClass
from main_app.serializers import UlalaMapAreaSerializer, BossSetupListSerializer, BossSetupCreateSerializer, PlayerSetupCreateSerializer, UlalaBossSerializer, UlalaSkillSerializer, UlalaToyByClassSerializer

import urllib.parse

class MapAreaList(generics.ListAPIView):
    """
    List all map areas.
    """
    queryset = UlalaMapArea.objects.all()
    serializer_class=UlalaMapAreaSerializer

class MapAreaDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a map area
    """
    queryset = UlalaMapArea.objects.all()
    serializer_class=UlalaMapAreaSerializer

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
    queryset = BossSetup.objects.all()
    serializer_class=BossSetupListSerializer

class UlalaBossList(generics.ListAPIView):
    queryset = UlalaBoss.objects.all()
    serializer_class=UlalaBossSerializer

class UlalaBossDetail(generics.RetrieveAPIView):
    queryset = UlalaBoss.objects.all()
    serializer_class=UlalaBossSerializer
    
class UlalaSkillList(generics.ListAPIView):
    queryset = UlalaSkill.objects.all()
    serializer_class=UlalaSkillSerializer

class UlalaToyByClassList(generics.ListAPIView):
    queryset = UlalaClass.objects.all()
    serializer_class=UlalaToyByClassSerializer

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