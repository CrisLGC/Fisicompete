from rest_framework import serializers
from .models import Participante, Juez, Puntuacion

class ParticipanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participante
        fields = '__all__'

class JuezSerializer(serializers.ModelSerializer):
    class Meta:
        model = Juez
        fields = '__all__'

class PuntuacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Puntuacion
        fields = '__all__'