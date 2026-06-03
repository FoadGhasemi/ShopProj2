from django.db import models

class Product(models.Model):
    title = models.CharField(max_length=25)
    description = models.TextField()
    price = models.BigIntegerField()
    # category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products")
    status = models.BooleanField()
    image = models.ImageField(upload_to="product/")

    def __str__(self):
        return self.name