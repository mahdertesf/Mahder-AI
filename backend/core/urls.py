from django.urls import path
from .serializers import GoogleLogin
from . import views 

urlpatterns=[
    
    path('rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    path("api/userprofile/",views.ProfileView.as_view(),name="userprofile"),
]