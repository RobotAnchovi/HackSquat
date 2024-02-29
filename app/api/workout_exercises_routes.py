from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, WorkoutExercise, Workout
from app.forms import WorkoutExerciseForm

workout_exercises_routes = Blueprint("workout_exercises", __name__)


# //*====> CREATE a new workout exercise <====
@workout_exercises_routes.route("/", methods=["POST"])
@login_required
def create_workout_exercise():
    form = WorkoutExerciseForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate():
        workout_id = form.data["workout_id"]
        workout = Workout.query.get(workout_id)
        if not workout:
            return jsonify({"errors": "Workout not found."}), 404
        if workout.user_id != current_user.id:
            return jsonify({"errors": "Unauthorized"}), 403
        workout_exercise = WorkoutExercise(  # type: ignore
            workout_id=workout_id,
            exercise_id=form.data["exercise_id"],
            sets_target=form.data["sets_target"],
            reps_target=form.data["reps_target"],
            weight_target=form.data["weight_target"],
            sets_completed=form.data["sets_completed"],
            reps_completed=form.data["reps_completed"],
            weight_used=form.data["weight_used"],
            duration_minutes=form.data["duration_minutes"],
            distance_km=form.data["distance_km"],
        )
        db.session.add(workout_exercise)
        db.session.commit()

        return jsonify(workout_exercise.to_dict()), 201
    return jsonify({"errors": form.errors}), 400


# //*====> GET Workout Exercises for a Workout <====
@workout_exercises_routes.route("/workout/<int:workout_id>/exercises", methods=["GET"])
@login_required
def get_workout_exercises(workout_id):
    workout_exercises = WorkoutExercise.query.filter_by(workout_id=workout_id).all()
    return (
        jsonify([workout_exercise.to_dict() for workout_exercise in workout_exercises]),
        200,
    )


# //*====> UPDATE a workout exercise <====
@workout_exercises_routes.route("/<int:workout_exercise_id>", methods=["PUT"])
@login_required
def update_workout_exercise(workout_exercise_id):
    workout_exercise = WorkoutExercise.query.get(workout_exercise_id)
    if not workout_exercise:
        return jsonify({"errors": "Workout exercise not found."}), 404
    if workout_exercise.workout.user_id != current_user.id:
        return jsonify({"errors": "Unauthorized"}), 403

    form = WorkoutExerciseForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate():
        form.populate_obj(workout_exercise)
        db.session.commit()
        return jsonify(workout_exercise.to_dict()), 200
    else:
        return jsonify({"errors": form.errors}), 400


# //*====> DELETE a workout exercise <====
@workout_exercises_routes.route("/<int:workout_exercise_id>", methods=["DELETE"])
@login_required
def delete_workout_exercise(workout_exercise_id):
    workout_exercise = WorkoutExercise.query.get(workout_exercise_id)
    if not workout_exercise:
        return jsonify({"errors": "Workout exercise not found."}), 404
    if workout_exercise.workout.user_id != current_user.id:
        return jsonify({"errors": "Unauthorized"}), 403

    db.session.delete(workout_exercise)
    db.session.commit()
    return jsonify({"message": "Workout exercise deleted."}), 200
