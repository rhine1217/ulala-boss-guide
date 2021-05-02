from rest_framework import serializers
from main_app.models import UlalaMapArea, BossSetup, PlayerSetup, UlalaBoss, UlalaSkill, UlalaToy, UlalaToyDescription, UlalaClass

class UlalaMapAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UlalaMapArea
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

class UlalaToyDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UlalaToyDescription
        fields = ['three_piece_effect', 'six_piece_effect', 'awakening_effect']
        
class UlalaToySerializer(serializers.ModelSerializer):
    description = UlalaToyDescriptionSerializer(read_only=True)
    class Meta:
        model = UlalaToy
        fields = ['id', 'name', 'description', 'not_allowed_with', 'img_url']

class UlalaToyByClassSerializer(serializers.ModelSerializer):
    toy_list = UlalaToySerializer(many=True, read_only=True)
    class Meta:
        model = UlalaClass
        fields = ['id', 'name', 'toy_list']
        
class PlayerSetupListSerializer(serializers.ModelSerializer):
    player_class = serializers.StringRelatedField()
    skills = serializers.SerializerMethodField('get_skills')
    toys = serializers.SerializerMethodField('get_toys')
    
    def get_skills(self, obj):
        output = []
        skills = [obj.skill1, obj.skill2, obj.skill3, obj.skill4]
        for skill in skills:
            output.append(UlalaSkillSerializer(skill).data)
        return output
    
    def get_toys(self, obj):
        output = []
        toys = [obj.toy1, obj.toy2, obj.toy3, obj.toy4]
        for toy in toys:
            output.append(UlalaToySerializer(toy).data)
        return output
      
    class Meta:
        model = PlayerSetup
        fields = ['player_class', 'skills', 'toys']
    
class BossSetupListSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField()
    status = serializers.CharField(source='get_status_display')
    boss = UlalaBossSerializer(read_only=True)
    player_setup = PlayerSetupListSerializer(many=True, read_only=True)
    player_classes = serializers.SerializerMethodField('get_player_classes')
    
    def get_player_classes(self, obj):
        output = []
        player_setups = PlayerSetup.objects.filter(boss_setup=obj.id)
        for setup in player_setups:
            output.append(PlayerSetupListSerializer(setup).data['player_class'])
        return output
      
    class Meta:
        model = BossSetup
        fields = ['id', 'boss', 'player_classes', 'player_setup', 'note', 'created_by', 'created_on', 'published_on', 'status']

class BossField(serializers.RelatedField):
    def to_representation(self, obj):
        return {
          'id': obj.id
        }
    def to_internal_value(self, data):
        return UlalaBoss.objects.get(name=data)

class BossSetupCreateSerializer(serializers.ModelSerializer):
    # created_by = serializers.ForeignKeyRelatedField()
    boss = BossField(queryset=UlalaBoss.objects.all())
    class Meta:
        model = BossSetup
        fields = '__all__'
    def create(self, validated_data):
        return BossSetup.objects.create(**validated_data)

class PlayerClassField(serializers.RelatedField):
    def to_representation(self, obj):
        return {
          'id': obj.id
        }
    def to_internal_value(self, data):
        print(data)
        return UlalaClass.objects.get(name=data)

class PlayerSetupCreateSerializer(serializers.ModelSerializer):
    player_class = PlayerClassField(queryset=UlalaClass.objects.all())
    class Meta:
        model = PlayerSetup
        fields = '__all__'
    def create(self, validated_data):
        return PlayerSetup.objects.create(**validated_data)