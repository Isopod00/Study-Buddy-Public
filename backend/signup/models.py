from django.db import models
from django.core.validators import RegexValidator

# Create your models here.
class Profile(models.Model):
    grade_choices   = [('EL', 'Elementary'),
                       ('MI', 'Middle School'),
                       ('HI', 'High School'),
                       ('CO', 'College')]

    email           = models.EmailField(verbose_name='email address', null=True, unique=True, max_length=244)
    first_name      = models.CharField(max_length=30, null=True)
    last_name       = models.CharField(max_length=30, null=True)
    date_of_birth   = models.DateField(null=True)
    location        = models.CharField(max_length=30, null=True)
    grade           = models.CharField(max_length=2, choices=grade_choices, null=True)

    subjects        = models.TextField(blank=True, null=True)
    
    description     = models.TextField(blank=True, max_length=300)
    picture         = models.ImageField(upload_to="uploads/", null=True, default="uploads/default_profile_pic.jpg")
    student         = models.BooleanField(default=False)

    # YES WE KNOW THIS IS HORRIBLE
    password        = models.CharField(max_length=30, null=True)
    blacklist       = models.TextField(blank=True, default='')
    matched_list    = models.TextField(blank=True, default='')

    def _str_(self):
        return self.email
