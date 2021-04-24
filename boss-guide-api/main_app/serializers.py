from rest_framework import serializers
from main_app.models import UlalaMapArea, BossSetup, UlalaBoss, UlalaSkill, UlalaToy, UlalaClass

class UlalaMapAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UlalaMapArea
        fields = '__all__'

class BossSetupSerializer(serializers.ModelSerializer):
    class Meta:
        model = BossSetup
        fields = '__all__'

class UlalaBossSerializer(serializers.ModelSerializer):
    map_area = serializers.StringRelatedField(many=True)
    class Meta:
        model = UlalaBoss
        fields = '__all__'

class UlalaSkillSerializer(serializers.ModelSerializer):
    related_class = serializers.StringRelatedField()
    class Meta:
        model = UlalaSkill
        fields = '__all__'

class UlalaToySerializer(serializers.ModelSerializer):
    class Meta:
        model = UlalaToy
        fields = ['id', 'name', 'description', 'img_url']

class UlalaToyByClassSerializer(serializers.ModelSerializer):
    toy_list = UlalaToySerializer(many=True, read_only=True)
    class Meta:
        model = UlalaClass
        fields = ['id', 'name', 'toy_list']