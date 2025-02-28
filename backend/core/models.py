from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class CustomUser(AbstractUser):
    first_name=models.CharField(max_length=150)
    last_name=models.CharField(max_length=150)
    email=models.EmailField(unique=True)
    photo=models.ImageField(upload_to="profile_pics/", null=True, blank=True)  
    REQUIRED_FIELDS=['email','first_name','last_name']
    