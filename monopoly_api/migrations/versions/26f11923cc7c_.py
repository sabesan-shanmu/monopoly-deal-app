"""empty message

Revision ID: 26f11923cc7c
Revises: 22402bbdd154
Create Date: 2020-08-12 23:33:10.001035

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '26f11923cc7c'
down_revision = '22402bbdd154'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('player_playerPassCode_key', 'player', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('player_playerPassCode_key', 'player', ['playerPassCode'])
    # ### end Alembic commands ###
