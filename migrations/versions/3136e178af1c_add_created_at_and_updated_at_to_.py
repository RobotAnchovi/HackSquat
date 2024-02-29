"""Add created_at and updated_at to exercises

Revision ID: 3136e178af1c
Revises: 1d1dcf27227a
Create Date: 2024-02-29 09:45:32.168063

"""

from alembic import op
import sqlalchemy as sa
from alembic.operations import BatchOperations


# revision identifiers, used by Alembic.
revision = "3136e178af1c"
down_revision = "1d1dcf27227a"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("exercises", schema=None) as batch_op:
        batch_op.add_column(sa.Column("created_at", sa.DateTime(), nullable=False))
        batch_op.add_column(sa.Column("updated_at", sa.DateTime(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("exercises", schema=None) as batch_op:
        batch_op.drop_column("updated_at")
        batch_op.drop_column("created_at")

    # ### end Alembic commands ###
