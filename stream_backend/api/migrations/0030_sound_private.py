# Generated by Django 3.0.6 on 2020-09-19 12:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0029_auto_20200824_1603'),
    ]

    operations = [
        migrations.AddField(
            model_name='sound',
            name='private',
            field=models.BooleanField(default=False),
        ),
    ]