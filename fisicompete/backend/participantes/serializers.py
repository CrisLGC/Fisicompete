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
    participante_nombre = serializers.CharField(source='participante.nombre', read_only=True)
    juez_nombre = serializers.CharField(source='juez.nombre', read_only=True)

    class Meta:
        model = Puntuacion
        fields = ['id', 'participante_nombre', 'juez_nombre', 'simetria', 'definicion', 'comentarios', 'participante', 'juez']