from flask.cli import AppGroup
from .users import seed_users, undo_users
from .workout_plans import seed_workout_plans, undo_workout_plans
from .exercises import seed_exercises, undo_exercises
from .workouts import seed_workouts, undo_workouts
from .workout_exercises import seed_workout_exercises, undo_workout_exercises
from app.models.db import environment

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


@seed_commands.command("all")
def seed():
    if environment == "production":
        unseed_all_tables()
    seed_all_tables()


@seed_commands.command("undo")
def undo():
    unseed_all_tables()


@seed_commands.command("reset")
def seed_reset():
    unseed_all_tables()
    seed_all_tables()


def seed_all_tables():
    seed_users()
    seed_workout_plans()
    seed_exercises()
    seed_workouts()
    seed_workout_exercises()


def unseed_all_tables():
    undo_users()
    undo_workout_plans()
    undo_exercises()
    undo_workouts()
    undo_workout_exercises()
