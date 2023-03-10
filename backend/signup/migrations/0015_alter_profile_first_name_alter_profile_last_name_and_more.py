# Generated by Django 4.1.5 on 2023-01-29 00:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('signup', '0014_rename_subject_profile_subjects'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='first_name',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='last_name',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='picture',
            field=models.ImageField(null=True, upload_to='uploads/'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='subjects',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
