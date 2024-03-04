from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, WorkoutPlan
from app.forms import WorkoutPlanForm
from sqlalchemy.orm import joinedload


workout_plan_routes = Blueprint("workout-plans", __name__)


# //*====> Create a new workout plan <====
@workout_plan_routes.route("", methods=["POST"])
@login_required
def create_workout_plan():
    form = WorkoutPlanForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate():
        new_plan = WorkoutPlan(
            user_id=current_user.id,
            name=form.name.data,
            description=form.data["description"],
        )
        db.session.add(new_plan)
        db.session.commit()
        return jsonify(new_plan.to_dict())
    return jsonify({"errors": form.errors}), 400


# //~====> Get ALL workout plans for a user <====
@workout_plan_routes.route("/user/<int:user_id>", methods=["GET"])
@login_required
def get_user_workout_plans(user_id):
    if user_id != current_user.id:
        return jsonify({"errors": "Unauthorized"}), 403
    workout_plans = (
        WorkoutPlan.query.options(joinedload(WorkoutPlan.workouts))
        .filter(WorkoutPlan.user_id == user_id)
        .all()
    )

    if workout_plans:
        return (
            jsonify([plan.to_dict(include_workouts=True) for plan in workout_plans]),
            200,
        )
    else:
        return jsonify({"errors": "No workout plans found. Let's create one!"}), 404


# //~====> Get SINGLE workout plan details <====
@workout_plan_routes.route("/user/<int:user_id>/<int:plan_id>", methods=["GET"])
@login_required
def get_workout_plan(user_id, plan_id):
    if user_id != current_user.id:
        return jsonify({"errors": "Unauthorized"}), 403
    plan = (
        WorkoutPlan.query.options(joinedload(WorkoutPlan.workouts))
        .filter_by(user_id=user_id, plan_id=plan_id)
        .first()
    )
    if plan:
        return jsonify(plan.to_dict(include_workouts=True)), 200
    else:
        return jsonify({"errors": "Workout plan not found."}), 404


# //*====> Update a workout plan <====
@workout_plan_routes.route("/user/<int:user_id>/<int:plan_id>", methods=["PUT"])
@login_required
def update_workout_plan(user_id, plan_id):
    if user_id != current_user.id:
        return jsonify({"errors": "Unauthorized"}), 403

    plan = WorkoutPlan.query.filter_by(user_id=user_id, plan_id=plan_id).first()
    if not plan:
        return jsonify({"errors": "Workout plan not found."}), 404

    form = WorkoutPlanForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate():
        plan.name = form.data["name"]
        plan.description = form.data["description"]
        db.session.commit()
        return jsonify(plan.to_dict()), 200

    return jsonify({"errors": form.errors}), 400


# //*====> Delete a workout plan <====
@workout_plan_routes.route("/user/<int:user_id>/<int:plan_id>", methods=["DELETE"])
@login_required
def delete_workout_plan(user_id, plan_id):
    if user_id != current_user.id:
        return jsonify({"errors": "Unauthorized"}), 403

    plan = WorkoutPlan.query.filter_by(user_id=user_id, plan_id=plan_id).first()
    if not plan:
        return jsonify({"errors": "Workout plan not found."}), 404

    db.session.delete(plan)
    db.session.commit()
    return jsonify({"message": "Workout plan deleted successfully."}), 200
