from django.contrib.auth.models import User, Group
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password'] # username will be email in this case
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validate_data):
        user = User.objects.create_user(**validate_data) # force data to hash password
        return user

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']