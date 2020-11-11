from django.db import models

# Create your models here.


class Movie(models.Model):
    year = models.IntegerField()
    title = models.TextField(null=True, blank=True)
    origin = models.TextField(null=True, blank=True)
    director = models.TextField(null=True, blank=True)
    cast = models.TextField(null=True, blank=True)
    genre = models.TextField(null=True, blank=True)
    wikipage = models.TextField(null=True, blank=True)
    plot = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title
