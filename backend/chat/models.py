from django.db import models

# Create your models here.
class Message(models.Model):
    sender = models.CharField(max_length=120)
    text = models.TextField()

    def _str_(self):
        return self.text