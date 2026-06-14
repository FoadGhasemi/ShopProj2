from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError
from phonenumber_field.formfields import PhoneNumberField
from .models import User
from django.utils.translation import gettext_lazy as _

class UserCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""

    phone = PhoneNumberField(widget=forms.TextInput(attrs={"placeholder": "۰۹۰۱***۳۹۲۲"}),
                             error_messages={'invalid': _("لطفا یک شماره موبایل معتبر وارد کنید"),})
    password1 = forms.CharField(label="گذر واژه", widget=forms.PasswordInput(attrs={"placeholder": "گذرواژه"}))
    password2 = forms.CharField(label="تایید گذر واژه", widget=forms.PasswordInput(attrs={"placeholder": "تکرار گذرواژه"}))

    class Meta:
        model = User
        fields = ["fullname", "phone", "password1", "password2"]
        widgets = {
            "fullname": forms.TextInput(attrs={"placeholder": "نام کامل"}),
        }

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("پسورد %(value)s از پسورد اول متفاوت است",
                                  code='non_matching_passwords',
                                  params={'value': f'{password2}'})
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    """A form for updating users. Includes all the fields on
    the user, but replaces the password field with admin's
    disabled password hash display field.
    """

    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = ["email", "password", "fullname", "phone", "profile_image", "is_active", "is_admin"]

