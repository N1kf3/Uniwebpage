"""empty message

Revision ID: 6051f932d06f
Revises: 85532f7627ff
Create Date: 2023-06-16 13:33:39.795445

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6051f932d06f'
down_revision = '85532f7627ff'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=80), nullable=False))
        batch_op.add_column(sa.Column('last_name', sa.String(length=80), nullable=False))
        batch_op.add_column(sa.Column('user_ID', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('career', sa.String(length=80), nullable=False))
        batch_op.create_unique_constraint(None, ['user_ID'])
        batch_op.drop_column('is_active')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('career')
        batch_op.drop_column('user_ID')
        batch_op.drop_column('last_name')
        batch_op.drop_column('name')

    # ### end Alembic commands ###
