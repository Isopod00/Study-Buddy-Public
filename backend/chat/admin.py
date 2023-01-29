from django.contrib import admin
from .models import Message

class ChatAdmin(admin.ModelAdmin):
    list_display = ('sender', 'text')

# Register your models here.
admin.site.register(Message, ChatAdmin)