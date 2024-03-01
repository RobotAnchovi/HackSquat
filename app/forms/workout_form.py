from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DateField, IntegerField, SelectField
from datetime import date
from app.models import WorkoutPlan
from wtforms.validators import (
    DataRequired,
    Optional,
    NumberRange,
    Length,
    ValidationError,
)


class WorkoutForm(FlaskForm):
    workout_plan_id = IntegerField("Workout Plan ID", validators=[Optional()])
    date = DateField(
        "Workout Date",
        format="%Y-%m-%d",
        validators=[DataRequired(message="Date is required.")],
    )
    duration = IntegerField(
        "Duration (minutes)",
        validators=[
            Optional(),
            NumberRange(min=1, message="Duration must be at least 1 minute."),
        ],
    )
    intensity = IntegerField(
        "Intensity (1-10)",
        validators=[
            Optional(),
            NumberRange(min=1, max=10, message="Intensity must be between 1 and 10."),
        ],
    )
    location = StringField(
        "Location",
        validators=[
            Optional(),
            Length(max=50, message="Location must not exceed 50 characters."),
        ],
    )
    status = SelectField(
        "Status",
        choices=[
            ("Planned", "Planned"),
            ("Completed", "Completed"),
            ("Skipped", "Skipped"),
        ],
        validators=[DataRequired()],
    )
    notes = TextAreaField(
        "Notes",
        validators=[
            Optional(),
            Length(max=500, message="Notes must not exceed 500 characters."),
        ],
    )

    # ^ Custom validation methods
    def validate_date(self, field):
        # ^ Ensure the workout date is not in the past
        if field.data < date.today():
            raise ValidationError("Workout date cannot be in the past.")

    def validate_workout_plan_id(self, field):
        # ^ Ensure the workout_plan_id exists in the database if provided
        if field.data:
            workout_plan = WorkoutPlan.query.get(field.data)
            if not workout_plan:
                raise ValidationError("Workout Plan ID does not exist.")

    def validate(self):
        # ^ First, invoke the default validation logic
        if not super(WorkoutForm, self).validate():
            return False

        # ^ Additional custom validations
        if not (self.duration.data or self.intensity.data):
            self.duration.errors = list(self.duration.errors)  # Convert to list
            self.intensity.errors = list(self.intensity.errors)  # Convert to list
            self.duration.errors.append(
                "Either duration or intensity must be provided."
            )
            self.intensity.errors.append(
                "Either duration or intensity must be provided."
            )
            return False

        return True
