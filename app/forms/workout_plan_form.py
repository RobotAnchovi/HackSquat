from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, validators


class WorkoutPlanForm(FlaskForm):
    name = StringField(
        "Plan Name",
        [
            validators.Length(
                min=3, message="Plan Name must be at least 3 characters long."
            ),
            validators.DataRequired(),
        ],
    )
    description = TextAreaField(
        "Plan Description",
        [
            validators.Optional(),
            validators.Length(
                max=500, message="Description must not exceed 500 characters."
            ),
        ],
    )

    def validate(self):
        if not FlaskForm.validate(self):
            return False

        #! Additional custom validations can be added here

        return True
