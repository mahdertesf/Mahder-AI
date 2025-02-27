from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from django.db import models
from rest_framework import serializers
from dj_rest_auth.registration.serializers import SocialLoginSerializer
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView

User=get_user_model()
class CustomUserCreateSerializer(UserCreateSerializer):
    email=models.EmailField(unique=True)
    class Meta(UserCreateSerializer.Meta):
        model=User
        fields=('id','email','username','first_name','last_name','password')
        
class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    serializer_class = SocialLoginSerializer