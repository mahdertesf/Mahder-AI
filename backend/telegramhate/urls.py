from django.urls import path
from . import views

urlpatterns = [
    path("api/v1/predictHate", views.predictHate, name="predictHate"),
    
]