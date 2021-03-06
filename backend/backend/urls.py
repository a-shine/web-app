from django.contrib import admin
from django.urls import include, path

from rest_framework import routers

from user import views

from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

urlpatterns = [
  path('admin/', admin.site.urls),
  path('health_check/', include('health_check.urls')),
  path('user/', include('user.urls')),
]

# if settings.DEBUG:
#   urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
