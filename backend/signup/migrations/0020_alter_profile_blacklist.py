# Generated by Django 4.1.5 on 2023-01-29 06:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('signup', '0019_alter_profile_blacklist'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='blacklist',
            field=models.TextField(blank=True, default=''),
        ),
    ]
