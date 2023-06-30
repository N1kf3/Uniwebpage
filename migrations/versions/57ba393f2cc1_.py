"""empty message

Revision ID: 57ba393f2cc1
Revises: 2880c1c8cb4d
Create Date: 2023-06-22 18:43:38.677767

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '57ba393f2cc1'
down_revision = '2880c1c8cb4d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('studen_grade', schema=None) as batch_op:
        batch_op.alter_column('notas',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=3),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('studen_grade', schema=None) as batch_op:
        batch_op.alter_column('notas',
               existing_type=sa.String(length=3),
               type_=sa.INTEGER(),
               existing_nullable=False)

    # ### end Alembic commands ###