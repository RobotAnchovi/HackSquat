from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField, SelectField, validators


class ExerciseForm(FlaskForm):
    name = StringField(
        "Name",
        validators=[
            validators.DataRequired(message="Exercise name is required."),
            validators.Length(
                min=3,
                max=255,
                message="Exercise name must be between 3 and 255 characters long.",
            ),
        ],
    )
    description = TextAreaField(
        "Description",
        validators=[
            validators.Optional(),  # Makes the field optional
            validators.Length(
                max=500, message="Description must not exceed 500 characters."
            ),
        ],
    )
    category = SelectField(
        "Category",
        choices=[
            ("strength", "Strength"),
            ("cardio", "Cardio"),
            ("balance", "Balance"),
            ("mobility", "Mobility"),
            ("accessory", "Accessory"),
            ("other", "Other"),
        ],
        validators=[validators.DataRequired(message="Category is required.")],
    )
    is_public = BooleanField(
        "Make this exercise public",
        default=True,
        validators=[validators.Optional()],
    )
