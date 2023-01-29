"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib.staticfiles.urls import static, staticfiles_urlpatterns

from django.contrib import admin
from django.urls import path, include

from rest_framework import routers

import signup.views
import chat.views

router = routers.DefaultRouter()
router.register(r'profiles', signup.views.ProfileView, 'profiles')
router.register(r'messages', chat.views.MessageView, 'messages')

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/search', signup.views.sorted_list),
    path('api/setSubjects', signup.views.set_subjects),
    path('api/verifyPassword', signup.views.verify_password),
    path('api/setBio', signup.views.set_bio),
    path('api/setGrade', signup.views.set_grade),
    path('api/blacklist', signup.views.blacklist),
    path('api/matched', signup.views.matched),
    path('api/setLocation', signup.views.set_location),
    path('api/setImage', signup.views.set_image),

    path('api/chatGPT', chat.views.chatGPT),

    path('api/', include(router.urls)),

    path("chat/<str:chat_box_name>/", chat.views.chat_box, name="chat"),
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)