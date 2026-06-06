from django.db import models

class Category(models.Model):
    title = models.CharField(max_length=25)
    image = models.ImageField(upload_to="product/")

    def __str__(self):
        return self.title

class Product(models.Model):
    title = models.CharField(max_length=25)
    description = models.TextField()
    price = models.BigIntegerField()
    discount = models.BigIntegerField()
    category = models.ManyToManyField(Category, related_name="products")
    status = models.BooleanField()
    image = models.ImageField(upload_to="product/")

    def __str__(self):
        return self.title