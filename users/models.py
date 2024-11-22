from django.db import models
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
)


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        print("Email: ", email)
        print("Password: ", password)
        print("kwargs: ", kwargs)
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(
            email
        )  # convert email domain to lowercase like JHONE@GOOGLE.com to jhone@google.com
        email = email.lower()  # convert email username to lowercase like JHON@google.com to jhone@google.com

        user = self.model(email=email, **kwargs)
        print("User: ", user)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **kwargs):
        user = self.create_user(email, password=password, **kwargs)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(
        unique=True,
        max_length=255,
    )

    # as our superuser don't need email activation we will keep the default=True
    # djsoer will make the is_active field as false by themselves
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def __str__(self):
        return self.email
