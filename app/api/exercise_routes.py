from flask import Blueprint, jsonify, request, abort
from flask_login import login_required, current_user
from app.models import db, Exercise, User
from app.forms import ExerciseForm

exercise_routes = Blueprint("exercises", __name__)


# //*====> Create a new exercise <====
@exercise_routes.route("", methods=["POST"])
@login_required
def create_exercise():
    form = ExerciseForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate():
        new_exercise = Exercise(  # type: ignore
            user_id=current_user.id,
            name=form.name.data,
            description=form.description.data,
            category=form.category.data,
            is_public=form.is_public.data,
        )
        db.session.add(new_exercise)
        db.session.commit()
        return jsonify(new_exercise.to_dict()), 201
    else:
        return jsonify({"errors": form.errors}), 400


# //*====> Get ALL exercises including user created, and by categories <====
@exercise_routes.route("", methods=["GET"])
@login_required
def get_exercises():
    exercises = (
        Exercise.query.filter(
            (Exercise.user_id == current_user.id) | (Exercise.is_public == True)
        )
        .order_by(Exercise.category, Exercise.name)
        .all()
    )  # ^ Handle sorting on the backend to make my life easier later.
    return jsonify([exercise.to_dict() for exercise in exercises]), 200


# //*====> Get SINGLE exercise details <====
@exercise_routes.route("/<int:exercise_id>", methods=["GET"])
@login_required
def get_exercise(exercise_id):
    print(exercise_id, type(exercise_id))
    exercise = Exercise.query.get(exercise_id)
    if exercise:
        return jsonify(exercise.to_dict()), 200
    else:
        return jsonify({"errors": "Exercise not found."}), 404


# //*====> Update an exercise <====
@exercise_routes.route("/<int:exercise_id>", methods=["PUT"])
@login_required
def update_exercise(exercise_id):
    exercise = Exercise.query.get(exercise_id)
    # Debugging output
    print(
        f"Comparing user IDs: exercise.user_id={exercise.user_id} ({type(exercise.user_id)}) with current_user.id={current_user.id} ({type(current_user.id)})"
    )

    # ^ Convert exercise.user_id to integer for comparison
    if int(exercise.user_id) != current_user.id:  # type: ignore
        print(exercise.user_id, current_user.id)  # type: ignore
        return jsonify({"errors": "Unauthorized"}), 403

    form = ExerciseForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate():
        exercise.name = form.name.data  # type: ignore
        exercise.description = form.description.data  # type: ignore
        exercise.category = form.category.data  # type: ignore
        exercise.is_public = form.is_public.data  # type: ignore
        db.session.commit()
        return jsonify(exercise.to_dict()), 200  # type: ignore
    else:
        return jsonify({"errors": form.errors}), 400


# //*====> Delete an exercise <====
@exercise_routes.route("/<int:exercise_id>", methods=["DELETE"])
@login_required
def delete_exercise(exercise_id):
    exercise = Exercise.query.get(exercise_id)
    # Debugging output
    if int(exercise.user_id) != current_user.id:  # type: ignore
        print(exercise.user_id, current_user.id)  # type: ignore
        return jsonify({"errors": "Unauthorized"}), 403

    db.session.delete(exercise)
    db.session.commit()
    return jsonify({"message": "Exercise deleted."}), 200
