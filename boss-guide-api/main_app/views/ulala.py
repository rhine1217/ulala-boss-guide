from rest_framework import generics
from main_app.models import UlalaMapArea, UlalaBoss, UlalaSkill, UlalaClass
from main_app.serializers import UlalaMapAreaSerializer, UlalaBossSerializer, UlalaSkillSerializer, UlalaToyByClassSerializer

import urllib.parse
from hashids import Hashids
from decouple import config
hashids = Hashids(salt=config("HASH_ID_SALT"), min_length=16)

class MapAreaList(generics.ListAPIView):
    queryset = UlalaMapArea.objects.all()
    serializer_class=UlalaMapAreaSerializer
    
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