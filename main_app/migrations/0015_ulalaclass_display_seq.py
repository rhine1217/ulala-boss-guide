# Generated by Django 3.2 on 2021-05-05 07:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0014_ulalaskill_not_allowed_with'),
    ]

    operations = [
        migrations.AddField(
            model_name='ulalaclass',
            name='display_seq',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
