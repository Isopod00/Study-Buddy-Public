# Generated by Django 4.1.5 on 2023-01-29 09:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('signup', '0025_alter_profile_subjects'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='location',
            field=models.CharField(max_length=30, null=True),
        ),
    ]
