# Create your views here.
from rest_framework import viewsets
from .models import Participante, Juez, Puntuacion
from .serializers import ParticipanteSerializer, JuezSerializer, PuntuacionSerializer

class ParticipanteViewSet(viewsets.ModelViewSet):
    queryset = Participante.objects.all()
    serializer_class = ParticipanteSerializer

class JuezViewSet(viewsets.ModelViewSet):
    queryset = Juez.objects.all()
    serializer_class = JuezSerializer

class PuntuacionViewSet(viewsets.ModelViewSet):
    queryset = Puntuacion.objects.all()
    serializer_class = PuntuacionSerializer