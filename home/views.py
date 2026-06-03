from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from product.models import Product

class Home(TemplateView):
    template_name = 'home/index.html'
