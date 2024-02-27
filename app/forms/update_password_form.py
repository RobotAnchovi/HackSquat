from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


def password_check_len(form, field):
    if len(field.data) < 6:
        raise ValidationError("Password must be at least 6 characters.")


class UpdatePasswordForm(FlaskForm):
    password = StringField("Password", validators=[DataRequired(), password_check_len])
    new_password = StringField(
        "New Password", validators=[DataRequired(), password_check_len]
    )
