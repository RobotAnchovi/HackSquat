from app.models import (
    db,
    WorkoutExercise,
    environment,
    SCHEMA,
)
from sqlalchemy.sql import text


def seed_workout_exercises():
    print("Starting to seed workout exercises...")

    try:
        # ^ Define a list of workout exercises to add
        workout_exercises = [
            WorkoutExercise(
                workout_id=1,
                exercise_id=1,
                sets_target=3,
                reps_target=10,
                weight_target=100,
                sets_completed=3,
                reps_completed=10,
                weight_used=100,
            ),
            WorkoutExercise(
                workout_id=1,
                exercise_id=2,
                sets_target=3,
                reps_target=10,
                weight_target=100,
                sets_completed=3,
                reps_completed=10,
                weight_used=100,
            ),
            # ^ Cardio
            WorkoutExercise(
                workout_id=2,
                exercise_id=11,
                sets_target=1,
                reps_target=1,
                weight_target=0.1,
                duration_minutes=30,
                distance_km=5,
            ),
            # ^ Mixed Categories for testing
            WorkoutExercise(
                workout_id=3,
                exercise_id=3,
                sets_target=3,
                reps_target=10,
                weight_target=0.1,
            ),
            WorkoutExercise(
                workout_id=3,
                exercise_id=12,
                sets_target=1,
                reps_target=1,
                weight_target=0.1,
                duration_minutes=30,
                distance_km=5,
            ),
            WorkoutExercise(
                workout_id=4,
                exercise_id=4,
                sets_target=3,
                reps_target=10,
                weight_target=100,
            ),
            # ^ Unplanned Session with mixed categories
            WorkoutExercise(
                workout_id=4,
                exercise_id=13,
                sets_target=1,
                reps_target=1,
                weight_target=0.1,
                sets_completed=1,
                reps_completed=1,
                duration_minutes=30,
                distance_km=5,
                weight_used=0.1,
            ),
            WorkoutExercise(
                workout_id=4,
                exercise_id=2,
                sets_target=3,
                reps_target=10,
                weight_target=100,
                sets_completed=3,
                reps_completed=10,
                weight_used=100,
            ),
        ]
        # ^ Add workout_exercises to session and commit
        db.session.bulk_save_objects(workout_exercises)
        db.session.commit()
        print(f"Added {len(workout_exercises)} workout exercises to the database!")

    except Exception as e:
        # ^ Rollback the session in case of error
        db.session.rollback()
        print(f"Error seeding workout_exercises: {e}")


def undo_workout_exercises():
    if environment == "production":
        db.session.execute(
            text(f"TRUNCATE table {SCHEMA}.workout_exercises RESTART IDENTITY CASCADE;")
        )

    else:
        db.session.execute(text("DELETE FROM workout_exercises;"))

    db.session.commit()
