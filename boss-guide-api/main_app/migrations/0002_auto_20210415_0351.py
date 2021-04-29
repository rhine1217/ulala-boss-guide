# Generated by Django 3.2 on 2021-04-15 03:51

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BossSetup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField()),
                ('published_on', models.DateTimeField(null=True)),
                ('status', models.CharField(choices=[('P', 'Published'), ('D', 'Draft')], default='D', max_length=1)),
                ('note', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='UlalaBoss',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('area', django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=100), size=2), size=None)),
            ],
        ),
        migrations.CreateModel(
            name='UlalaClass',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=16)),
            ],
        ),
        migrations.AlterField(
            model_name='discorduser',
            name='discriminator',
            field=models.CharField(max_length=4),
        ),
        migrations.AlterField(
            model_name='discorduser',
            name='locale',
            field=models.CharField(max_length=16),
        ),
        migrations.AlterField(
            model_name='discorduser',
            name='username',
            field=models.CharField(max_length=32),
        ),
        migrations.CreateModel(
            name='UserTeam',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_leader', models.BooleanField()),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.team')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.discorduser')),
            ],
        ),
        migrations.CreateModel(
            name='UserLikes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('boss_setup', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.bosssetup')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.discorduser')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='UserComments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.TextField()),
                ('posted_date', models.DateTimeField()),
                ('boss_setup', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.bosssetup')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.discorduser')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='UlalaToy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('img_url', models.URLField(null=True)),
                ('related_class', models.ManyToManyField(to='main_app.UlalaClass')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='UlalaSkill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('img_url', models.URLField(null=True)),
                ('related_class', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='main_app.ulalaclass')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='team',
            name='members',
            field=models.ManyToManyField(through='main_app.UserTeam', to='main_app.DiscordUser'),
        ),
        migrations.CreateModel(
            name='SaveToUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('boss_setup', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.bosssetup')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.discorduser')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='SaveToTeam',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('boss_setup', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.bosssetup')),
                ('team_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.userteam')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.discorduser')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='PlayerSetup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('boss_setup', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.bosssetup')),
                ('player_class', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='main_app.ulalaclass')),
                ('skills', models.ManyToManyField(to='main_app.UlalaSkill')),
                ('toys', models.ManyToManyField(to='main_app.UlalaToy')),
            ],
        ),
        migrations.AddField(
            model_name='bosssetup',
            name='boss',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='main_app.ulalaboss'),
        ),
        migrations.AddField(
            model_name='bosssetup',
            name='created_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.discorduser'),
        ),
    ]