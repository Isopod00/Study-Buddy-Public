# Generated by Django 4.1.5 on 2023-01-29 10:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('signup', '0026_profile_location'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='picture',
            field=models.ImageField(default='uploads/default_profile_pic.jpg', null=True, upload_to='uploads/'),
        ),
    ]
