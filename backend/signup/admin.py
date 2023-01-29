from django.contrib import admin
from .models import Profile

class ProfileAdmin(admin.ModelAdmin):
    # YES WE KNOW PUTTING PASSWORD IN HERE IS A BAD IDEA
    list_display = ('email', 'first_name', 'last_name', 'date_of_birth', 'password', 'grade', 'blacklist', 'matched_list', 'subjects', 'picture', 'location', 'description', 'student')

# Register your models here.
admin.site.register(Profile, ProfileAdmin)