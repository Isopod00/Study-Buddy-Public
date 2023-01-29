from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        # YES WE KNOW THIS IS HORRIBLE
        fields = ('id', 'email', 'first_name', 'last_name', 'date_of_birth', 'password', 'grade', 'subjects', 'matched_list', 'picture', 'location', 'description', 'student')
