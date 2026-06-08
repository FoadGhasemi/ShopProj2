from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, phone, fullname, password=None):
        """
        Creates and saves a User with the given phone, fullname and password.
        """
        if not phone:
            raise ValueError("Users must have an phone address.")

        user = self.model(
            phone = phone,
            fullname = fullname,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, phone, fullname, password=None):
        """
        Creates and saves a superuser with the given email, fullname and password.
        """
        user = self.create_user(
            phone = phone,
            password=password,
            fullname=fullname,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

