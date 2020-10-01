from django.urls import path, include
from rest_framework import routers
from user import views
from rest_framework.authtoken.views import ObtainAuthToken


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('data/', views.UserData.as_view(),),
    path('auth/', ObtainAuthToken.as_view(),),
    path('register/', views.RegisterUser.as_view(),),
    path('is-valid-token/', views.IsValidToken.as_view(),),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]