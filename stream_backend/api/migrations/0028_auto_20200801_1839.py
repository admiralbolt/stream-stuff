# Generated by Django 3.0.6 on 2020-08-01 18:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0027_auto_20200801_1811'),
    ]

    operations = [
        migrations.AlterField(
            model_name='twitchchatter',
            name='latest_join',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='twitchchatter',
            name='latest_part',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
