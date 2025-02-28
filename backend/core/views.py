from django.shortcuts import render
from .serializers import CustomUserCreateSerializer
from djoser.views import UserViewSet
from rest_framework import generics
from .serializers import ProfileSerializer
from .models import CustomUser
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class CustomUserViewSet(UserViewSet):
    serializer_class = CustomUserCreateSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        user.first_name = serializer.validated_data.get('first_name', '')
        user.last_name = serializer.validated_data.get('last_name', '')
        user.save()
        
#view for Profile
class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes=[IsAuthenticated]
    serializer_class=ProfileSerializer
    def get_object(self):
        return self.request.user