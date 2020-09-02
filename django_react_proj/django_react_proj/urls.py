from django.contrib import admin
from django.urls import path, re_path, include
from employees import views
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('admin/', admin.site.urls),
    path('token-auth/', obtain_jwt_token),
    re_path(r'^api/employees/$', views.employees_list),
    re_path(r'^api/employees/(?P<pk>[0-9]+)/$', views.employees_detail),
    path('core/', include('core.urls'))
]
