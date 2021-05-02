from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from main_app.models import UlalaMapArea, BossSetup, UlalaBoss, UlalaSkill, UlalaClass
from main_app.serializers import UlalaMapAreaSerializer, BossSetupListSerializer, UlalaBossSerializer, UlalaSkillSerializer, UlalaToyByClassSerializer

import urllib.parse

class MapAreaList(generics.ListAPIView):
    """
    List all map areas.
    """
    queryset = UlalaMapArea.objects.all()
    serializer_class=UlalaMapAreaSerializer
    # def get(self, request, format=None):
    #     maparea = UlalaMapArea.objects.all()
    #     serializer = UlalaMapAreaSerializer(maparea, many=True)
    #     return Response(serializer.data)
    
    # def post(self, request, format=None):
    #     serializer = UlalaMapAreaSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MapAreaDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a map area
    """
    queryset = UlalaMapArea.objects.all()
    serializer_class=UlalaMapAreaSerializer
    
    # def get_object(self, pk):
    #     try: 
    #         maparea = UlalaMapArea.objects.get(pk=pk)
    #     except UlalaMapArea.DoesNotExist:
    #         return Response(status=status.HTTP_404_NOT_FOUND)
      
    # def get(self, request, pk, format=None):
    #     maparea = self.get_object(pk)
    #     serializer = UlalaMapAreaSerializer(maparea)
    #     return Response(serializer.data)
    
    # def put(self, request, pk, format=None):
    #     maparea = self.get_object(pk)
    #     serializer = UlalaMapAreaSerializer(maparea, data=request.data)
    #     if serializer.is_valid():
    #         serializer.savae()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # def delete(self, request, pk, format=None):
    #     maparea = self.get_object(pk)
    #     maparea.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)


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

# class BossPlayerSetup(APIView):
#     def post(self, request, format=None):
#     #     serializer = UlalaMapAreaSerializer(data=request.data)
#     #     if serializer.is_valid():
#     #         serializer.save()
#     #         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


