"""Add org_task_index for steps table

Revision ID: c4dca14a5e69
Revises: 68d78072fdb5
Create Date: 2024-05-05 02:49:34.719311+00:00

"""
from typing import Sequence, Union

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "c4dca14a5e69"
down_revision: Union[str, None] = "68d78072fdb5"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_index("org_task_index", "steps", ["organization_id", "task_id"], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index("org_task_index", table_name="steps")
    # ### end Alembic commands ###
