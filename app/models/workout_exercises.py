from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates


class WorkoutExercise(db.Model):
    __tablename__ = "workout_exercises"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    workout_id = db.Column(
        db.Integer,
        db.ForeignKey(f"{add_prefix_for_prod('workout')}.id"),
        nullable=False,
    )
    exercise_id = db.Column(
        db.Integer,
        db.ForeignKey(f"{add_prefix_for_prod('exercises')}.id"),
        nullable=False,
    )
    # ^ Fields for weight-based exercises
    sets_target = db.Column(db.Integer, nullable=False)
    reps_target = db.Column(db.Integer, nullable=False)
    weight_target = db.Column(db.Numeric, nullable=False)
    sets_completed = db.Column(db.Integer, nullable=True)
    reps_completed = db.Column(db.Integer, nullable=True)
    weight_used = db.Column(db.Numeric, nullable=True)

    # ^ Fields for cardio activities
    duration_minutes = db.Column(db.Integer, nullable=True)
    distance_km = db.Column(db.Numeric, nullable=True)

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # //*====> Relationships <====
    workout = db.relationship("Workout", back_populates="workout_exercises")
    exercise = db.relationship("Exercise", back_populates="workout_exercises")

    def to_dict(self):
        return {
            "id": self.id,
            "workout_id": self.workout_id,
            "exercise_id": self.exercise_id,
            "sets_target": self.sets_target,
            "reps_target": self.reps_target,
            "weight_target": self.weight_target,
            "sets_completed": self.sets_completed,
            "reps_completed": self.reps_completed,
            "weight_used": self.weight_used,
            "duration_minutes": self.duration_minutes,
            "distance_km": self.distance_km,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "updated_at": self.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
        }
