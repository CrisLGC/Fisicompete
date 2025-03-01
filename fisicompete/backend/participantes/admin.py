from django.contrib import admin

from .models import Participante, Juez, Puntuacion

# Registra los modelos aquí
admin.site.register(Participante)
admin.site.register(Juez)
admin.site.register(Puntuacion)
