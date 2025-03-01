from django.db import models

# Create your models here.

class Participante(models.Model):
    nombre = models.CharField(max_length=100)
    edad = models.IntegerField()
    genero = models.CharField(max_length=10)
    peso = models.FloatField()
    categoria = models.CharField(max_length=50)
    experiencia = models.TextField()

    def __str__(self):
        return self.nombre

class Juez(models.Model):
    nombre = models.CharField(max_length=100)
    credenciales = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Puntuacion(models.Model):
    participante = models.ForeignKey(Participante, on_delete=models.CASCADE)
    juez = models.ForeignKey(Juez, on_delete=models.CASCADE)  # Asegúrate de incluir este campo
    simetria = models.FloatField()
    definicion = models.FloatField()
    comentarios = models.TextField()

    def __str__(self):
        return f"Puntuación de {self.participante.nombre} por {self.juez.nombre}"