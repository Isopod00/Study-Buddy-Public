# Generated by Django 4.1.5 on 2023-01-28 23:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('signup', '0006_profile_subject_alter_profile_grade'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='date_of_birth',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
