import tracemalloc

tracemalloc.start()

import os
from flask import Flask, request, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import generate_csrf
from flask_login import LoginManager
from .models import db, User, WorkoutPlan, Exercise, WorkoutExercise, Workout
from .api.workout_plan_routes import workout_plan_routes
from .api.exercise_routes import exercise_routes
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.workout_exercises_routes import workout_exercises_routes
from .api.workout_routes import workout_routes
from .seeds import seed_commands
from .config import Config


app = Flask(__name__, static_folder="../react-vite/dist", static_url_path="/")

# Setup login manager
login = LoginManager(app)
login.login_view = "auth.unauthorized"  # type: ignore


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(auth_routes, url_prefix="/api/auth")
app.register_blueprint(user_routes, url_prefix="/api/users")
app.register_blueprint(workout_plan_routes, url_prefix="/api/workout-plans")
app.register_blueprint(exercise_routes, url_prefix="/api/exercises")
app.register_blueprint(workout_exercises_routes, url_prefix="/api/workout-exercises")
app.register_blueprint(workout_routes, url_prefix="/api/workouts")

db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get("FLASK_ENV") == "production":
        if request.headers.get("X-Forwarded-Proto") == "http":
            url = request.url.replace("http://", "https://", 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        "csrf_token",
        generate_csrf(),
        secure=True if os.environ.get("FLASK_ENV") == "production" else False,
        samesite="Strict" if os.environ.get("FLASK_ENV") == "production" else None,
        httponly=True,
    )
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    route_list = {
        rule.rule: [
            [method for method in rule.methods if method in acceptable_methods],  # type: ignore
            app.view_functions[rule.endpoint].__doc__,
        ]
        for rule in app.url_map.iter_rules()
        if rule.endpoint != "static"
    }
    return route_list


# Memory debugging route
@app.route("/debug/memory")
def debug_memory():
    if not tracemalloc.is_tracing():
        tracemalloc.start()

    snapshot = tracemalloc.take_snapshot()
    top_stats = snapshot.statistics("lineno")

    result = []
    for stat in top_stats[:20]:  # Adjust the slice for more or fewer lines
        result.append(str(stat))

    # Combine the results into a multi-line string and return as a response
    return "\n".join(result), 200


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == "favicon.ico":
        return app.send_from_directory("public", "favicon.ico")  # type: ignore
    return app.send_static_file("index.html")


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file("index.html")
