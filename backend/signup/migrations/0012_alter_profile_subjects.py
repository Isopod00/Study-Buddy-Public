# Generated by Django 4.1.5 on 2023-01-29 00:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('signup', '0011_option_delete_choices_remove_profile_subjects_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='subjects',
            field=models.ManyToManyField(blank=True, to='signup.option'),
        ),
    ]
