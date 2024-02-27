import os, json, re
from flask import Blueprint, request, jsonify
from app.models import User, db
from app.forms import LoginForm, SignUpForm, UpdateUserForm, UpdatePasswordForm
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.security import check_password_hash
from sqlalchemy.exc import IntegrityError
from .aws_helpers import upload_file_to_s3, get_unique_filename

auth_routes = Blueprint("auth", __name__)


@auth_routes.route("/")
def authenticate():
    # //*====>Authenticates a user<====
    if current_user.is_authenticated and current_user.is_deleted == False:
        return current_user.to_dict(), 200
    # return {"errors": {"message": "Unauthorized"}}, 401
    return {"user": None}, 200


@auth_routes.route("/users")
@login_required
def get_all_users():
    # //*====> Get all users in HackSquat <====
    users = [user.to_dict() for user in User.query.all()]
    return users, 200


@auth_routes.route("/<int:id>")
@login_required
def get_current_user(id):
    # //*====> Get the user by id <====
    user = User.query.get(id)

    if not user:
        return {"message": "User not found"}, 404

    return user.to_dict(), 200


@auth_routes.route("/update", methods=["PUT"])
@login_required
def update_user():
    # //*====> Update current user information. Returns the updated user. <====
    form = UpdateUserForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        user = User.query.filter(
            User.email == form.data["email"]
            and User.is_deleted == False
            and User.id == current_user.id
        ).first()

        if not user:
            return {"message": "User not found"}, 404

        if not check_password_hash(user.password, form.data["password"]):
            return {"password": "Password is incorrect"}, 400

        image = form.data["profile_image_url"]

        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if "url" not in upload:
                return upload, 500
            user.profile_image_url = upload["url"]

        user.first_name = form.data["first_name"]
        user.last_name = form.data["last_name"]

    try:
        db.session.commit()
        return jsonify(user.to_dict()), 200
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Could not update user information"}), 500


@auth_routes.route("/login", methods=["POST"])
def login():
    # //*====> Logs a user in <====
    form = LoginForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        user = User.query.filter(User.email == form.data["email"]).first()

        if user.is_deleted == True:
            return {"message": "User not found"}, 404

        login_user(user)
        return jsonify(user.to_dict()), 200

    return form.errors, 401


@auth_routes.route("/password", methods=["PUT"])
@login_required
def update_user_password():
    # //*====> Update current user's password. Required to log in again after success update. <====
    form = UpdatePasswordForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        if not check_password_hash(current_user.password, form.data["password"]):
            return {"password": "Password is incorrect"}, 400
        current_user.password = form.data["new_password"]

        db.session.commit()

        logout_user()
        return {
            "message": "Successfully updated your password. Please log in again."
        }, 200

    return form.errors, 400


@auth_routes.route("/delete", methods=["DELETE"])
@login_required
def delete_user():

    if current_user.is_deleted == True:
        return {"message": "User not found"}, 404

    # //*====> Delete user  <====
    current_user.is_deleted = True

    # //!====> Delete workouts created by the user <====

    # //!====> Delete exercises created by the user <====

    # //*====> Logout <====
    db.session.commit()
    logout_user()

    return {"message": "Account successfully deleted"}, 200


@auth_routes.route("/logout")
def logout():
    # //*====> Logs a user out <====
    logout_user()
    return {"message": "User has been logged out"}, 200


@auth_routes.route("/signup", methods=["POST"])
def sign_up():
    # //*====> Signs a user up <====
    form = SignUpForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        image = form.data["profile_image_url"]
        url = None
        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if "url" not in upload:
                return upload, 500
            url = upload["url"]

        user = User(
            first_name=form.data["first_name"],
            last_name=form.data["last_name"],
            username=form.data["username"],
            email=form.data["email"],
            password=form.data["password"],
            profile_image_url=url,
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()

    return form.errors, 400


@auth_routes.route("/unauthorized")
def unauthorized():

    return {"message": "Unauthorized"}, 401


@auth_routes.route("/forbidden")
def forbidden():

    return {"message": "Forbidden"}, 403
