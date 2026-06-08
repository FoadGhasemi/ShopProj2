from django.db import models


class Category(models.Model):
    title = models.CharField(max_length=25, verbose_name="عنوان")
    image = models.ImageField(upload_to="product/", verbose_name="تصویر")

    def __str__(self):
        return self.title

class Product(models.Model):
    title = models.CharField(max_length=25, verbose_name="عنوان")
    description = models.TextField(verbose_name="توضیحات")
    price = models.DecimalField(max_digits=10, decimal_places=0, verbose_name="قیمت")
    discount = models.DecimalField(max_digits=10, decimal_places=0, verbose_name="تخفیف")
    category = models.ManyToManyField(Category, related_name="products", verbose_name="دسته بندی")
    status = models.BooleanField(verbose_name="وضعیت")
    image = models.ImageField(upload_to="product/", verbose_name="تصویر")

    def __str__(self):
        return self.title