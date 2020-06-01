# Generated by Django 3.0.6 on 2020-05-31 20:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20200522_1055'),
    ]

    operations = [
        migrations.CreateModel(
            name='TwitchEmote',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('twitchId', models.IntegerField(unique=True)),
                ('name', models.CharField(max_length=64, unique=True)),
                ('emoticon_set', models.IntegerField()),
                ('height', models.IntegerField()),
                ('width', models.IntegerField()),
                ('image_url', models.CharField(max_length=256)),
                ('image_file', models.FileField(blank=True, upload_to='twitch_emotes/')),
            ],
        ),
        migrations.AddIndex(
            model_name='twitchemote',
            index=models.Index(fields=['twitchId'], name='api_twitche_twitchI_5a5442_idx'),
        ),
        migrations.AddIndex(
            model_name='twitchemote',
            index=models.Index(fields=['name'], name='api_twitche_name_f9bdcb_idx'),
        ),
    ]