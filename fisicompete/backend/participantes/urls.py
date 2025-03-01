from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ParticipanteViewSet, JuezViewSet, PuntuacionViewSet

router = DefaultRouter()
router.register(r'participantes', ParticipanteViewSet)
router.register(r'jueces', JuezViewSet)
router.register(r'puntuaciones', PuntuacionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]