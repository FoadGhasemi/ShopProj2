from django.urls import path
from . import views
from django.contrib.auth.views import LogoutView

app_name = "user"

urlpatterns = [
    path('logout', LogoutView.as_view(next_page = "home:home"), name = "logout"),
    path('login', views.UserLoginView.as_view(), name = "login"),
    path('register', views.UserRegisterView.as_view(), name = "register"),
]