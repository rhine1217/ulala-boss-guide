# Generated by Django 3.2 on 2021-05-01 21:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0013_alter_ulalatoydescription_toy'),
    ]

    operations = [
        migrations.AddField(
            model_name='ulalaskill',
            name='not_allowed_with',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]