# Generated by Django 3.0.6 on 2020-09-19 12:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0030_sound_private'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='sound',
            index=models.Index(fields=['private'], name='api_sound_private_22d264_idx'),
        ),
    ]
