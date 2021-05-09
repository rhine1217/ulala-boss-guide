from rest_framework import serializers
from main_app.models import DiscordUser, UlalaMapArea, BossSetup, PlayerSetup, UlalaBoss, UlalaSkill, UlalaToy, UlalaToyDescription, UlalaClass, UserLikes, UserComments, SaveToUser
from utils import getenv
from hashids import Hashids
hashids = Hashids(salt=getenv()["HASH_ID_SALT"], min_length=16)

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
    id = serializers.SerializerMethodField('get_hash_id')
    created_by = serializers.StringRelatedField()
    status = serializers.CharField(source='get_status_display')
    boss = UlalaBossSerializer(read_only=True)
    player_setup = serializers.SerializerMethodField('get_player_setup')
    player_classes = serializers.SerializerMethodField('get_player_classes')
    likes = serializers.SerializerMethodField('get_likes')
    favourites = serializers.SerializerMethodField('get_favourites')
    comments_count = serializers.SerializerMethodField('get_comments_count')
    
    def get_ordered_player_setups_queryset(self, obj):
        return PlayerSetup.objects.filter(boss_setup=obj.id).order_by('player_class__display_seq')
    
    def get_player_classes(self, obj):
        output = []
        player_setups = self.get_ordered_player_setups_queryset(obj)
        for setup in player_setups:
            output.append(PlayerSetupListSerializer(setup).data['player_class'])
        return output
    
    def get_player_setup(self, obj):
        ordered_player_setups = self.get_ordered_player_setups_queryset(obj)
        return PlayerSetupListSerializer(ordered_player_setups, many=True, read_only=True, context=self.context).data
    
    def get_hash_id(self, obj):
        return hashids.encode(obj.id)
    
    def get_likes(self, obj):
        return UserLikes.objects.filter(boss_setup=obj.id).count()

    def get_favourites(self, obj):
        return SaveToUser.objects.filter(boss_setup=obj.id).count()

    def get_comments_count(self, obj):
        return UserComments.objects.filter(boss_setup=obj.id).count()
      
    class Meta:
        model = BossSetup
        fields = ['id', 'boss', 'player_classes', 'player_setup', 'note', 'created_by', 'created_on', 'published_on', 'status', 'likes', 'favourites', 'comments_count']

class BossSetupListWithInteractionsSerializer(BossSetupListSerializer):
    liked_by_current_user = serializers.SerializerMethodField('check_like')
    favourited_by_current_user = serializers.SerializerMethodField('check_favourite')
    
    def check_like(self, obj):
        request = self.context.get('request', None)
        return UserLikes.objects.filter(boss_setup=obj.id, user=request.user).count() > 0

    def check_favourite(self, obj):
        request = self.context.get('request', None)
        return SaveToUser.objects.filter(boss_setup=obj.id, user=request.user).count() > 0
      
    class Meta(BossSetupListSerializer.Meta):
        fields = BossSetupListSerializer.Meta.fields + ['liked_by_current_user', 'favourited_by_current_user']

class DiscordUserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField('get_name')
    def get_name(self, obj):
        return str(obj)
    class Meta:
        model = DiscordUser
        fields = ['id', 'name', 'avatar']
        
class UserCommentsSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField('get_hash_id')
    user = DiscordUserSerializer(read_only=True)
    def get_hash_id(self, obj):
        return hashids.encode(obj.id)
    class Meta:
        model = UserComments
        fields = ['id', 'user', 'comment', 'posted_date']
        
class BossSetupListWithCommentsSerializer(BossSetupListSerializer):
    comments = serializers.SerializerMethodField('get_comments')
    def get_comments(self, obj):
        ordered_comments = UserComments.objects.filter(boss_setup=obj.id).order_by('posted_date')
        return UserCommentsSerializer(ordered_comments, many=True, read_only=True).data
    class Meta(BossSetupListSerializer.Meta):
        fields = BossSetupListSerializer.Meta.fields + ['comments']

class BossSetupListWithInteractionsCommentsSerializer(BossSetupListWithInteractionsSerializer):
    comments = serializers.SerializerMethodField('get_comments')
    def get_comments(self, obj):
        ordered_comments = UserComments.objects.filter(boss_setup=obj.id).order_by('posted_date')
        return UserCommentsSerializer(ordered_comments, many=True, read_only=True).data
    class Meta(BossSetupListWithInteractionsSerializer.Meta):
        fields = BossSetupListWithInteractionsSerializer.Meta.fields + ['comments']
        
class BossField(serializers.RelatedField):
    def to_representation(self, obj):
        return {
          'id': obj.id
        }
    def to_internal_value(self, data):
        return UlalaBoss.objects.get(name=data)

class BossSetupCreateUpdateSerializer(serializers.ModelSerializer):
    boss = BossField(queryset=UlalaBoss.objects.all())
    class Meta:
        model = BossSetup
        fields = '__all__'
    def create(self, validated_data):
        return BossSetup.objects.create(**validated_data)
    def update(self, instance, validated_data):
        instance.boss = validated_data.get('boss', instance.boss)
        instance.published_on = validated_data.get('published_on', instance.published_on)
        instance.status = validated_data.get('status', instance.status)
        instance.note = validated_data.get('note', instance.note)
        instance.save()
        return instance

class PlayerClassField(serializers.RelatedField):
    def to_representation(self, obj):
        return {
          'id': obj.id
        }
    def to_internal_value(self, data):
        return UlalaClass.objects.get(name=data)

class PlayerSetupCreateUpdateSerializer(serializers.ModelSerializer):
    player_class = PlayerClassField(queryset=UlalaClass.objects.all())
    class Meta:
        model = PlayerSetup
        fields = '__all__'
    def create(self, validated_data):
        return PlayerSetup.objects.create(**validated_data)
    def update(self, instance, validated_data):
        instance.player_class = validated_data.get('player_class', instance.player_class)
        instance.skill1 = validated_data.get('skill1', instance.skill1)
        instance.skill2 = validated_data.get('skill2', instance.skill2)
        instance.skill3 = validated_data.get('skill3', instance.skill3)
        instance.skill4 = validated_data.get('skill4', instance.skill4)
        instance.toy1 = validated_data.get('toy1', instance.toy1)
        instance.toy2 = validated_data.get('toy2', instance.toy2)
        instance.toy3 = validated_data.get('toy3', instance.toy3)
        instance.toy4 = validated_data.get('toy4', instance.toy4)
        instance.save()
        return instance

class UserLikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLikes
        fields = '__all__'
    def create(self, validated_data):
        return UserLikes.objects.create(**validated_data)

class UserFavouritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaveToUser
        fields = '__all__'
    def create(self, validated_data):
        return SaveToUser.objects.create(**validated_data)

class UserCommentsCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserComments
        fields = '__all__'
    def create(self, validated_data):
        return UserComments.objects.create(**validated_data)