from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates
from datetime import datetime


class WorkoutPlan(db.Model):
    __tablename__ = "workout_plans"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    plan_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(f"{add_prefix_for_prod('users')}.id"), nullable=False
    )
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # //*====> Relationships <====
    user = db.relationship("User", back_populates="workout_plans")
    workouts = db.relationship("Workout", back_populates="workout_plan")

    @validates("name")
    def validate_name(self, _, value):
        if not value:
            raise ValueError("Workout plan name is required.")
        if len(value) < 3:
            raise ValueError("Workout plan name must be at least 3 characters long.")
        return value

    @validates("description")
    def validate_description(self, _, value):
        if value and len(value) > 500:
            raise ValueError("Description must not exceed 500 characters.")
        return value

    def to_dict(self):
        return {
            "plan_id": self.plan_id,
            "user_id": self.user_id,
            "name": self.name,
            "description": self.description,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "updated_at": self.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
        }
