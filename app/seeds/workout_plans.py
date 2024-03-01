from app.models import db, WorkoutPlan, User, environment, SCHEMA
from datetime import datetime, timedelta
from sqlalchemy.sql import text


def seed_workout_plans():
    print("Starting to seed workout plans...")
    # ^ Attempt to fetch the user with id=1
    user = User.query.get(1)
    if not user:
        print(
            "User with ID 1 not found. Please ensure the user exists before seeding workout plans."
        )
        return

    try:
        # ^ Define a list of workout plans to add
        workout_plans = [
            WorkoutPlan(
                user_id=user.id,
                name="Beginner Full Body",
                description="A full-body workout plan suitable for beginners. Focus on compound movements.",
                created_at=datetime.now() - timedelta(days=10),
                updated_at=datetime.now() - timedelta(days=5),
            ),
            WorkoutPlan(
                user_id=user.id,
                name="Advanced Split Routine",
                description="An advanced workout plan focusing on a different muscle group each day.",
                created_at=datetime.now() - timedelta(days=20),
                updated_at=datetime.now() - timedelta(days=10),
            ),
            WorkoutPlan(
                user_id=user.id,
                name="Intermediate Push-Pull Routine",
                description="An intermediate workout plan focusing on push and pull movements.",
                created_at=datetime.now() - timedelta(days=30),
                updated_at=datetime.now() - timedelta(days=15),
            ),
            WorkoutPlan(
                user_id=user.id,
                name="Cardio and Core",
                description="A workout plan focusing on cardio and core exercises.",
                created_at=datetime.now() - timedelta(days=40),
                updated_at=datetime.now() - timedelta(days=20),
            ),
            #! Add more workout plans as needed
        ]

        # ^ Add workout plans to the session and commit
        db.session.bulk_save_objects(workout_plans)
        db.session.commit()
        print(
            f"Added {len(workout_plans)} workout plans to the database for User ID {user.id}."
        )

    except Exception as e:
        # ^ Rollback the session in case of error
        db.session.rollback()
        print(f"Error seeding workout plans: {e}")


def undo_workout_plans():
    if environment == "production":
        db.session.execute(
            text(f"TRUNCATE table {SCHEMA}.workout_plans RESTART IDENTITY CASCADE;")
        )
    else:
        db.session.execute(text("DELETE FROM workout_plans"))

    db.session.commit()
