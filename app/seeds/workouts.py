from app.models import db, Workout, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta


def seed_workouts():
    print("Starting to seed workouts...")
    # ^ Attempt to fetch the user with id=1
    user = User.query.get(1)
    if not user:
        print(
            "User with ID 1 not found. Please ensure the user exists before seeding workouts."
        )
        return

    try:
        # ^ Define a list of workouts to add
        # ^ Calculate the future date
        future_date = datetime.now() + timedelta(days=7)

        workouts = [
            Workout(
                user_id=user.id,
                workout_plan_id=1,
                date=datetime.now(),
                duration=60,
                intensity=5,
                location="Home",
                status="Completed",
                notes="Great workout today!",
            ),
            Workout(
                user_id=user.id,
                workout_plan_id=2,
                date=datetime.now(),
                duration=75,
                intensity=7,
                location="Gym",
                status="Completed",
                notes="Felt strong today!",
            ),
            Workout(
                user_id=user.id,
                workout_plan_id=3,
                date=future_date,
                duration=45,
                intensity=6,
                location="Home",
                status="Planned",
                notes="Good pump today!",
            ),
            Workout(
                user_id=user.id,
                workout_plan_id=4,
                date=future_date,
                duration=90,
                intensity=8,
                location="Gym",
                status="Planned",
                notes="I need a good session today!",
            ),
            Workout(
                user_id=user.id,
                workout_plan_id=1,
                date=datetime.now(),
                duration=60,
                intensity=5,
                location="Home",
                status="Skipped",
                notes="Not feeling well today.",
            ),
            Workout(
                user_id=user.id,
                date=datetime.now(),
                duration=60,
                intensity=5,
                location="Home",
                status="Completed",
                notes="Great workout today!",
            ),
        ]
        # ^ Add workouts to the session and commit
        db.session.bulk_save_objects(workouts)
        db.session.commit()
        print(f"Added {len(workouts)} workouts to the database for User ID {user.id}.")

    except Exception as e:
        # ^ Rollback the session in case of error
        db.session.rollback()
        print(f"Error seeding workouts: {e}")


def undo_workouts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.workouts RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM workouts"))

    db.session.commit()
