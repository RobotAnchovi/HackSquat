from app.models import db, Exercise
from app.models import environment, SCHEMA
from sqlalchemy.sql import text


def seed_exercises():
    # ^ Public exercises
    public_exercises = [
        # ^ Strength
        Exercise(
            user_id=None,
            name="Squat",
            description=None,
            category="Strength",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Deadlift",
            description=None,
            category="Strength",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Bench Press",
            description=None,
            category="Strength",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Pull Up",
            description=None,
            category="Strength",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Push Up",
            description=None,
            category="Strength",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Lunges",
            category="Strength",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Planks",
            category="Strength",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Overhead Press",
            category="Strength",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Barbell Rows",
            category="Strength",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Pull Downs",
            category="Strength",
            is_public=True,
        ),
        # ^ Cardio
        Exercise(
            user_id=None,
            name="Running",
            category="Cardio",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Cycling",
            category="Cardio",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Jump Rope",
            category="Cardio",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Rowing",
            category="Cardio",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="High-Intensity Interval Training (HIIT)",
            category="Cardio",
            is_public=True,
        ),
        # ^ Flexibility exercises
        Exercise(
            user_id=None,
            name="Yoga",
            category="Flexibility",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Pilates",
            category="Flexibility",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Dynamic Stretching",
            category="Flexibility",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Static Stretching",
            category="Flexibility",
            is_public=True,
        ),
        # ^ Balance exercises
        Exercise(
            user_id=None,
            name="Single-Leg Deadlift",
            category="Balance",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Balance Ball Exercises",
            category="Balance",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Bosu Ball Exercises",
            category="Balance",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Tai Chi",
            category="Balance",
            is_public=True,
        ),
        # ^ Bodyweight exercises
        Exercise(
            user_id=None,
            name="Mountain Climbers",
            category="Bodyweight",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Burpees",
            category="Bodyweight",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Sit-Ups",
            category="Bodyweight",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Leg Raises",
            category="Bodyweight",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Dips",
            category="Bodyweight",
            is_public=True,
        ),
        # ^ Plyometric exercises
        Exercise(
            user_id=None,
            name="Box Jumps",
            category="Plyometric",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Jump Squats",
            category="Plyometric",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Power Push-Ups",
            category="Plyometric",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Lateral Bounds",
            category="Plyometric",
            is_public=True,
        ),
        # ^ Mobility exercises
        Exercise(
            user_id=None,
            name="Hip Circles",
            category="Mobility",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Shoulder Pass-Throughs",
            category="Mobility",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Cat-Cow Stretches",
            category="Mobility",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Ankle Mobility Exercises",
            category="Mobility",
            is_public=True,
        ),
        # ^ Core exercises
        Exercise(
            user_id=None,
            name="Russian Twists",
            category="Core",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Hollow Hold",
            category="Core",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Flutter Kicks",
            category="Core",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Plank Up-Downs",
            category="Core",
            is_public=True,
        ),
        # ^ Strength exercises (More)
        Exercise(
            user_id=None,
            name="Kettlebell Swings",
            category="Strength",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Farmer's Walk",
            category="Strength",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Turkish Get-Up",
            category="Strength",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Zercher Squat",
            category="Strength",
            is_public=True,
        ),
        # ^ Power exercises
        Exercise(
            user_id=None,
            name="Clean and Jerk",
            category="Power",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Power Clean",
            category="Power",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Medicine Ball Slam",
            category="Power",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Plyometric Push-Up",
            category="Power",
            is_public=True,
        ),
        # ^ Speed exercises
        Exercise(
            user_id=None,
            name="Sprint",
            category="Speed",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Agility Ladder Drills",
            category="Speed",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Speed Skaters",
            category="Speed",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Reactive Shuttle Runs",
            category="Speed",
            is_public=True,
        ),
        # ^ Olympic exercises
        Exercise(
            user_id=None,
            name="Snatch",
            category="Olympic",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Olympic Weightlifting Squats",
            category="Olympic",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Split Jerk",
            category="Olympic",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Hang Clean",
            category="Olympic",
            is_public=True,
        ),
        # ^ Accessory exercises
        Exercise(
            user_id=None,
            name="Calf Raises",
            category="Accessory",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Bicep Curls",
            category="Accessory",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Tricep Extensions",
            category="Accessory",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Face Pulls",
            category="Accessory",
            is_public=True,
        ),
        # ^ Other exercises
        Exercise(
            user_id=None,
            name="Battle Ropes",
            category="Other",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Sandbag Lifts",
            category="Other",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Tire Flips",
            category="Other",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Sled Push/Pull",
            category="Other",
            is_public=True,
        ),
        # ^ Strength exercises (additional)
        Exercise(
            user_id=None,
            name="Hex Bar Deadlift",
            category="Strength",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Good Mornings",
            category="Strength",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Bulgarian Split Squats",
            category="Strength",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Landmine Press",
            category="Strength",
            is_public=True,
        ),
        # ^ Cardio exercises (additional)
        Exercise(
            user_id=None,
            name="Stair Climber",
            category="Cardio",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Elliptical Trainer",
            category="Cardio",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Assault Bike",
            category="Cardio",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Swimming",
            category="Cardio",
            is_public=True,
        ),
        # ^ Flexibility exercises (additional)
        Exercise(
            user_id=None,
            name="Standing Toe Touch",
            category="Flexibility",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Butterfly Stretch",
            category="Flexibility",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Seated Hamstring Stretch",
            category="Flexibility",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Chest Opener Stretch",
            category="Flexibility",
            is_public=True,
        ),
        # ^ Plyometrics exercises (additional)
        Exercise(
            user_id=None,
            name="Depth Jumps",
            category="Plyometrics",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Knee Tuck Jumps",
            category="Plyometrics",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Broad Jumps",
            category="Plyometrics",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Single-Leg Hop",
            category="Plyometrics",
            is_public=True,
        ),
        # ^ Bodyweight exercises (additional)
        Exercise(
            user_id=None,
            name="Handstand Push-Ups",
            category="Bodyweight",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Archer Push-Ups",
            category="Bodyweight",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Pistol Squats",
            category="Bodyweight",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Dragon Flags",
            category="Bodyweight",
            is_public=True,
        ),
        # ^ Core exercises (additional)
        Exercise(
            user_id=None,
            name="Cable Woodchoppers",
            category="Core",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Hanging Leg Raises",
            category="Core",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Ab Wheel Rollouts",
            category="Core",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Swiss Ball Crunches",
            category="Core",
            is_public=True,
        ),
        # ^ Power exercises (additional)
        Exercise(
            user_id=None,
            name="Atlas Stones",
            category="Power",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Log Lift",
            category="Power",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Tire Hammer Strikes",
            category="Power",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Farmer's Carry",
            category="Power",
            is_public=True,
        ),
        # ^ Speed exercises (additional)
        Exercise(
            user_id=None,
            name="Parachute Sprints",
            category="Speed",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Banded Sprints",
            category="Speed",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Cone Drills",
            category="Speed",
            is_public=True,
        ),
        Exercise(
            user_id=None,
            name="Lateral High Knees",
            category="Speed",
            is_public=True,
        ),
    ]

    # ^ User-created exercises (for user_id=1)
    user_exercises = [
        Exercise(
            user_id=1,
            name="Demo's Custom Squat",
            description="A custom squat exercise created by Demo.",
            category="Strength",
            is_public=False,
        ),
        Exercise(
            user_id=1,
            name="Demo's Custom Cardio",
            description="A custom cardio exercise created by Demo.",
            category="Cardio",
            is_public=False,
        ),
    ]

    # ^ Add exercises to the session and commit
    db.session.bulk_save_objects(public_exercises + user_exercises)

    db.session.commit()


def undo_exercises():
    if environment == "production":
        db.session.execute(  # type: ignore
            f"TRUNCATE table {SCHEMA}.exercises RESTART IDENTITY CASCADE;"  # type: ignore
        )
    else:
        db.session.execute(text("DELETE FROM exercises"))

    db.session.commit()
