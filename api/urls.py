from django.contrib import admin
from django.urls import path, include
from .views import hello_api, calendar_api

urlpatterns = [
    path('hello/', hello_api, name='hello_api'),
    path('calendar/', calendar_api, name='calendar_api'),
    path('api/', include('api.urls')),  # mount the app here
    re_path(r"^.*$", TemplateView.as_view(template_name="index.html"), name="index"),
]
