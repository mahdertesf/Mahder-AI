from django.shortcuts import render
from .serializers import CustomUserCreateSerializer
from djoser.views import UserViewSet

# Create your views here.
class CustomUserViewSet(UserViewSet):
    serializer_class = CustomUserCreateSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        user.first_name = serializer.validated_data.get('first_name', '')
        user.last_name = serializer.validated_data.get('last_name', '')
        user.save()