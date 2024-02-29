from flask_wtf import FlaskForm
from wtforms import IntegerField, DecimalField, BooleanField
from wtforms.validators import NumberRange, Optional


class WorkoutExerciseForm(FlaskForm):
    # ^ Fields for weight-based exercises
    sets_target = IntegerField(
        "Sets Target",
        validators=[
            Optional(),
            NumberRange(min=1, message="Sets target must be at least 1."),
        ],
    )
    reps_target = IntegerField(
        "Reps Target",
        validators=[
            Optional(),
            NumberRange(min=1, message="Reps target must be at least 1."),
        ],
    )
    weight_target = DecimalField(
        "Weight Target (lbs/kg)",
        validators=[
            Optional(),
            NumberRange(min=0.1, message="Weight must be more than 0."),
        ],
    )
    sets_completed = IntegerField(
        "Sets Completed",
        validators=[
            Optional(),
            NumberRange(min=1, message="Sets completed must be at least 1."),
        ],
    )
    reps_completed = IntegerField(
        "Reps Completed",
        validators=[
            Optional(),
            NumberRange(min=1, message="Reps completed must be at least 1."),
        ],
    )
    weight_used = DecimalField(
        "Weight Used (lbs/kg)",
        validators=[
            Optional(),
            NumberRange(min=0.1, message="Weight used must be more than 0."),
        ],
    )

    # ^ Fields for cardio activities
    duration_minutes = IntegerField(
        "Duration (minutes)",
        validators=[
            Optional(),
            NumberRange(min=1, message="Duration must be at least 1 minute."),
        ],
    )
    distance_km = DecimalField(
        "Distance (km)",
        validators=[
            Optional(),
            NumberRange(min=0.1, message="Distance must be more than 0 km."),
        ],
    )

    is_cardio = BooleanField("Is this a cardio exercise?")
