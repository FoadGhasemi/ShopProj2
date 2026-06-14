from django.contrib import messages
from django.contrib.auth import login, logout
from django.contrib.auth.mixins import UserPassesTestMixin
from django.contrib.auth.views import LoginView
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic import CreateView
from .forms import UserCreationForm
from django.contrib.auth.forms import AuthenticationForm


class UserRegisterView(UserPassesTestMixin, CreateView):
    form_class = UserCreationForm
    template_name = "user/register.html"
    success_url = reverse_lazy('home:home')

    def test_func(self):
        return not self.request.user.is_authenticated

    def handle_no_permission(self):
        return redirect("home:home")

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return super().form_valid(form)


class UserLoginView(LoginView):

    form_class = AuthenticationForm
    template_name = "user/login.html"
    redirect_authenticated_user = True
    next_page = "home:home"

