from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_users():
    demo = User(
        username="Demo",
        first_name="Demo",
        last_name="Lition",
        email="demo@aa.io",
        password="password",
    )
    marisela = User(
        username="seli",
        first_name="Marisela",
        last_name="Gomez",
        email="seli@aa.io",
        password="password",
    )
    dwayne = User(
        username="dmoney",
        first_name="Dwayne",
        last_name="Walker",
        email="dwayne@aa.io",
        password="password",
    )
    logan = User(
        username="fated",
        first_name="Logan",
        last_name="Fate",
        email="logan@aa.io",
        password="password",
    )
    jason = User(
        username="robotanchovy",
        first_name="Jason",
        last_name="Whitlock",
        email="jason@aa.io",
        password="password",
    )

    db.session.add(demo)
    db.session.add(marisela)
    db.session.add(dwayne)
    db.session.add(logan)
    db.session.add(jason)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
