from django.contrib import admin
from django.urls import path, re_path
from employees import views

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/employees/$', views.employees_list),
    re_path(r'^api/employees/(?P<pk>[0-9]+)/$', views.employees_detail),
]
