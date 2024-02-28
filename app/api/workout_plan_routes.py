from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, WorkoutPlan
from app.forms import WorkoutPlanForm

workout_plan_routes = Blueprint("workout-plans", __name__)


# //*====> Create a new workout plan <====
@workout_plan_routes.route("", methods=["POST"])
@login_required
def create_workout_plan():
    form = WorkoutPlanForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_plan = WorkoutPlan(
            user_id=current_user.id,
            name=form.data["name"],
            description=form.data["description"],
        )
        db.session.add(new_plan)
        db.session.commit()
        return jsonify(new_plan.to_dict())
    return jsonify({"errors": form.errors}), 400


# //*====> Get ALL workout plans for a user <====
@workout_plan_routes.route("/user/<int:user_id>", methods=["GET"])
@login_required
def get_user_workout_plans(user_id):
    if user_id != current_user.id:
        return jsonify({"errors": "Unauthorized"}), 403
    workout_plans = WorkoutPlan.query.filter(WorkoutPlan.user_id == user_id).all()

    if workout_plans:
        return jsonify([plan.to_dict() for plan in workout_plans]), 200
    else:
        return jsonify({"errors": "No workout plans found. Let's create one!"}), 404


# //*====> Get SINGLE workout plan details <====
@workout_plan_routes.route("/<int:plan_id>", methods=["GET"])
@login_required
def get_workout_plan(plan_id):
    plan = WorkoutPlan.query.get(plan_id)
    if plan.user_id != current_user.id:
        return jsonify({"errors": "Unauthorized"}), 403
    return jsonify(plan.to_dict()), 200


# //*====> Update a workout plan <====
@workout_plan_routes.route("/<int:plan_id>", methods=["PUT"])
@login_required
def update_workout_plan(plan_id):
    plan = WorkoutPlan.query.get(plan_id)
    if plan.user_id != current_user.id:
        return jsonify({"errors": "Unauthorized"}), 403
    form = WorkoutPlanForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        plan.name = form.name.data
        plan.description = form.description.data
        db.session.commit()
        return jsonify(plan.to_dict()), 200
    return jsonify({"errors": form.errors}), 400


# //*====> Delete a workout plan <====
@workout_plan_routes.route("/<int:plan_id>", methods=["DELETE"])
@login_required
def delete_workout_plan(plan_id):
    plan = WorkoutPlan.query.get(plan_id)
    if plan.user_id != current_user.id:
        return jsonify({"errors": "Unauthorized"}), 403
    db.session.delete(plan)
    db.session.commit()
    return jsonify({"message": "Workout plan deleted."}), 200
