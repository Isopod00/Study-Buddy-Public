from django.shortcuts import render
from django.http.response import HttpResponse, JsonResponse
from django.core import serializers

from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.parsers import FileUploadParser

from .serializers import ProfileSerializer
from .models import Profile

import sort

# Create your views here.
class ProfileView(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

@api_view(['GET'])
def sorted_list(request):
    profiles = sort.pullFromData(request.query_params.get('email', None))
    data = serializers.serialize('json', profiles)
    return HttpResponse(data, 'application/json')

@api_view(['GET'])
def verify_password(request):
    # YES WE KNOW THIS IS HORRIBLE
    profile = Profile.objects.filter(email=request.query_params.get('email', None))[0]
    if request.query_params.get('password', None) == profile.password:
        return HttpResponse("true", 'application/json')
    else:
        return HttpResponse("false", 'application/json')

@api_view(['POST'])
def set_subjects(request):
    profile = Profile.objects.filter(email=request.query_params.get('email', None))[0]
    profile.subjects = request.query_params.get('subjects', None)
    profile.save()
    return HttpResponse("subjects have been set to: " + profile.subjects, 'application/json')

@api_view(['POST'])
def set_location(request):
    profile = Profile.objects.filter(email=request.query_params.get('email', None))[0]
    profile.location = request.query_params.get('location', None)
    profile.save()
    return HttpResponse("location has been set to: " + profile.location, 'application/json')

@api_view(['POST'])
def set_bio(request):
    profile = Profile.objects.filter(email=request.query_params.get('email', None))[0]
    profile.description = request.query_params.get('bio', None)
    profile.save()
    return HttpResponse("bio has been set to: " + profile.description, 'application/json')

@api_view(['POST'])
def blacklist(request):
    profile = Profile.objects.filter(email=request.query_params.get('email', None))[0]
    profile_to_blacklist = Profile.objects.filter(email=request.query_params.get('blacklist', None))[0]
    email_to_blacklist = profile_to_blacklist.email
    profile.blacklist += f" {email_to_blacklist}"
    profile.save()
    return HttpResponse(email_to_blacklist + "has been added to the blacklist for" + profile.email, 'application/json')

@api_view(['POST'])
def matched(request):
    profile = Profile.objects.filter(email=request.query_params.get('email', None))[0]
    matched_profile = Profile.objects.filter(email=request.query_params.get('matched', None))[0]
    matched_email = matched_profile.email
    profile.matched_list += f" {matched_email}"
    profile.save()

    matched_profile.matched_list += f" {request.query_params.get('email', None)}"
    matched_profile.save()

    return HttpResponse(matched_email + " has been added to the match list for " + profile.email + " and vice-versa", 'application/json')

@api_view(['POST'])
def set_grade(request):
    profile = Profile.objects.filter(email=request.query_params.get('email', None))[0]
    profile.grade = request.query_params.get('grade', None)
    profile.save()
    return HttpResponse("grade has been set to: " + profile.grade, 'application/json')

@api_view(['PUT'])
def set_image(request):
    profile = Profile.objects.filter(email=request.query_params.get('email', None))[0]
    profile.picture = request.FILES['image']
    profile.save()
    return HttpResponse("Updated image", 'application/json')