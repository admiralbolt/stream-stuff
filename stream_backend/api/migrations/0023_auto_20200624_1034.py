# Generated by Django 3.0.6 on 2020-06-24 15:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_auto_20200624_1017'),
    ]

    operations = [
        migrations.RenameField(
            model_name='vote',
            old_name='choice',
            new_name='question',
        ),
    ]
