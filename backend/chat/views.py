from django.shortcuts import render
from django.http.response import HttpResponse
from django.core import serializers

from .serializers import MessageSerializer
from .models import Message
from django.shortcuts import render

from rest_framework import viewsets

import chatgpt

# Create your views here.
class MessageView(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()

def chatGPT(request):
    query = request.query_params.get('query', None)
    response = chatgpt.request(query)

    return HttpResponse(response, 'application/json')

def chat_box(request, chat_box_name):
    # we will get the chatbox name from the url
    return render(request, "chatbox.html", {"chat_box_name": chat_box_name})
    