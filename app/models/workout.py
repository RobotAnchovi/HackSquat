from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates


class Workout(db.Model):
    __tablename__ = "workouts"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    workout_plan_id = db.Column(
        db.Integer,
        db.ForeignKey(f"{add_prefix_for_prod('workout_plans')}.id"),
        nullable=True,
    )
    user_id = db.Column(
        db.Integer,
        db.ForeignKey(f"{add_prefix_for_prod('users')}.id"),
        nullable=False,
    )
    date = db.Column(db.Date, nullable=False)
    duration = db.Column(db.Integer, nullable=True)
    intensity = db.Column(db.Integer, nullable=True)
    location = db.Column(db.String(50), nullable=True)
    status = db.Column(
        db.String(50), nullable=False, default="Planned"
    )  # ^ Planned, Completed, Skipped
    notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # //*====> Relationships <====
    workout_plan = db.relationship("WorkoutPlan", back_populates="workouts")
    user = db.relationship("User", back_populates="workouts")
    # ^ For direct user-workout queries
    workout_exercises = db.relationship("WorkoutExercise", back_populates="workout")


def to_dict(self, include_exercises=False):
    workout_dict = {
        "id": self.id,
        "workout_plan_id": self.workout_plan_id,
        "user_id": self.user_id,
        "date": self.date.isoformat() if self.date else None,
        "notes": self.notes,
        "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        "updated_at": self.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
    }

    if include_exercises:
        workout_dict["exercises"] = [
            exercise.to_dict() for exercise in self.workout_exercises
        ]
    return workout_dict
