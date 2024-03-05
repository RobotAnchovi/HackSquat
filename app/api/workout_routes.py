from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Workout
from app.forms import WorkoutForm
from sqlalchemy.exc import IntegrityError, DataError
from sqlalchemy.orm import joinedload

workout_routes = Blueprint("workouts", __name__)


# //*====> CREATE a new workout <====
@workout_routes.route("/", methods=["POST"])
@login_required
def create_workout():
    form = WorkoutForm(data=request.json)
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate():
        try:
            workout = Workout(
                workout_plan_id=form.data.get("workout_plan_id"),
                user_id=current_user.id,
                date=form.data["date"],
                duration=form.data.get("duration"),
                intensity=form.data.get("intensity"),
                location=form.data.get("location"),
                status=form.data["status"],
                notes=form.data.get("notes"),
            )
            db.session.add(workout)
            db.session.commit()
            return workout.to_dict(), 201
        except IntegrityError:
            db.session.rollback()
            return jsonify({"errors": "Workout already exists"}), 400
        except DataError:
            db.session.rollback()
            return jsonify({"errors": "Invalid data, check field formats."}), 400
    return jsonify({"errors": form.errors}), 400


# //~====> GET Workouts for a User <====
@workout_routes.route("/user/<int:user_id>", methods=["GET"])
@login_required
def get_workouts(user_id):
    if user_id != current_user.id:
        return jsonify({"errors": "Unauthorized"}), 401
    workouts = (
        Workout.query.options(joinedload(Workout.workout_exercises))
        .filter_by(user_id=user_id)
        .all()
    )
    return (
        jsonify([workout.to_dict(include_exercises=True) for workout in workouts]),
        200,
    )


# //~====> GET a single workout <====
@workout_routes.route("/<int:workout_id>", methods=["GET"])
@login_required
def get_workout_details(workout_id):
    workout = Workout.query.options(joinedload(Workout.workout_exercises)).get(  # type: ignore
        workout_id
    )
    if workout and workout.user_id == current_user.id:
        return jsonify(workout.to_dict(include_exercises=True)), 200
    return jsonify({"errors": "Workout not found or unauthorized"}), 404


# //*====> UPDATE a workout <====
@workout_routes.route("/<int:workout_id>", methods=["PUT"])
@login_required
def update_workout(workout_id):
    incoming_data = request.json
    print("INCOMING DATA: ", incoming_data)
    if incoming_data.get("workout_plan_id") is None:
        incoming_data["workout_plan_id"] = ""
    workout = Workout.query.get(workout_id)
    if not workout:
        return jsonify({"errors": "Workout not found."}), 404
    if workout.user_id != current_user.id:
        return jsonify({"errors": "Unauthorized"}), 403

    form = WorkoutForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate():
        try:
            workout.workout_plan_id = form.data.get("workout_plan_id")
            workout.date = form.data["date"]
            workout.duration = form.data.get("duration")
            workout.intensity = form.data.get("intensity")
            workout.location = form.data.get("location")
            workout.status = form.data["status"]
            workout.notes = form.data.get("notes")
            db.session.commit()
            return jsonify(workout.to_dict()), 200
        except IntegrityError:
            db.session.rollback()
            return jsonify({"errors": "Workout already exists"}), 400
        except DataError:
            db.session.rollback()
            return jsonify({"errors": "Invalid data, check field formats."}), 400
    return jsonify({"errors": form.errors}), 400


# //*====> DELETE a workout <====
@workout_routes.route("/<int:workout_id>", methods=["DELETE"])
@login_required
def delete_workout(workout_id):
    workout = Workout.query.get(workout_id)
    if workout and workout.user_id == current_user.id:
        db.session.delete(workout)
        db.session.commit()
        return jsonify({"message": "Workout successfully deleted."}), 200
    return jsonify({"errors": "Workout not found or unauthorized"}), 404
