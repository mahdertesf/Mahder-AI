from django.urls import path
from . import views

urlpatterns = [
    path('api/trainmodel', views.trainModel, name='trainModel'),
    path("api/download_model",views.downloadModel)
]