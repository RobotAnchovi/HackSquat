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

    def validate(self):
        # ^ First, invoke the default validation logic
        is_valid = super(WorkoutExerciseForm, self).validate()

        # ~ Custom validation logic based on is_cardio
        if self.is_cardio.data:  # ^ If this is a cardio exercise
            if not self.duration_minutes.data and not self.distance_km.data:
                self.duration_minutes.errors = list(
                    self.duration_minutes.errors
                )  # ^ Change the type to list
                self.distance_km.errors = list(
                    self.distance_km.errors
                )  # ^ Change the type to list
                self.duration_minutes.errors.append(
                    "Duration is required for cardio exercises."
                )
                self.distance_km.errors.append(
                    "Distance is required for cardio exercises."
                )
                is_valid = False
        else:  # ^ For weight-based exercises
            if not self.sets_target.data and not self.reps_target.data:
                self.sets_target.errors = list(
                    self.sets_target.errors
                )  # ^ Change the type to list
                self.reps_target.errors = list(
                    self.reps_target.errors
                )  # ^ Change the type to list
                self.sets_target.errors.append(
                    "Sets target is required for weight-based exercises."
                )
                self.reps_target.errors.append(
                    "Reps target is required for weight-based exercises."
                )
                is_valid = False

        return is_valid
