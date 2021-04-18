from rest_framework import serializers
from main_app.models import UlalaMapArea, BossSetup

class UlalaMapAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UlalaMapArea
        fields = ['id', 'continent', 'area']


class BossSetupSerializer(serializers.ModelSerializer):
    class Meta:
        model = BossSetup
        fields = ['boss', 'created_by', 'created_on', 'published_on', 'status', 'note']