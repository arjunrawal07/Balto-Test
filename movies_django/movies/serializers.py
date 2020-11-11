from rest_framework import serializers
from .models import Movie


class MovieSerializer(serializers.ModelSerializer):
    movie_url = serializers.ModelSerializer.serializer_url_field(
        view_name='movie_detail'
    )

    class Meta:
        model = Movie
        fields = ('year',
                  'title',
                  'origin',
                  'director',
                  'cast',
                  'genre',
                  'wikipage',
                  'plot',
                  'movie_url',)
