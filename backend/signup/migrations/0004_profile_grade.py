# Generated by Django 4.1.5 on 2023-01-28 22:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('signup', '0003_alter_profile_date_of_birth'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='grade',
            field=models.CharField(choices=[('EL', 'ELEMENTARY'), ('MI', 'MIDDLE'), ('HI', 'HIGH'), ('CO', 'COLLEGE')], max_length=2, null=True),
        ),
    ]
