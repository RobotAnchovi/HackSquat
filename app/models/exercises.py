from datetime import datetime
import uuid
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates
from sqlalchemy.dialects.postgresql import UUID


class Exercise(db.Model):
    __tablename__ = "exercises"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    exercise_id = db.Column(
        db.String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    user_id = db.Column(
        db.String(36),
        db.ForeignKey(f"{add_prefix_for_prod('users')}.id"),
        nullable=True,
    )
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    category = db.Column(db.String(255), nullable=False)
    is_public = db.Column(db.Boolean, default=False)

    # //*====> Relationships <====
    user = db.relationship("User", back_populates="exercises")

    # //*====> Validations <====
    @validates("name", "description", "category")
    def validate_fields(self, key, value):
        if key == "name" and (not value or len(value) < 3):
            raise ValueError("Exercise name must be at least 3 characters long.")
        if key == "description" and value and len(value) > 500:
            raise ValueError("Description must not exceed 500 characters.")
        if key == "category" and not value:
            raise ValueError("Category is required.")
        return value

    def to_dict(self):
        return {
            "exercise_id": self.exercise_id,
            "user_id": self.user_id,
            "name": self.name,
            "description": self.description,
            "category": self.category,
            "is_public": self.is_public,
            "created_at": (
                self.created_at.strftime("%Y-%m-%d") if self.created_at else None
            ),
            "updated_at": (
                self.updated_at.strftime("%Y-%m-%d") if self.updated_at else None
            ),
        }
