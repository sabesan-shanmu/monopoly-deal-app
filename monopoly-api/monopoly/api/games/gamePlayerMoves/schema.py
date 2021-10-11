from monopoly import ma
from marshmallow import fields,post_load
from marshmallow_enum import EnumField
import monopoly.common.enums as Enum
from monopoly.models import GamePlayerMoves
from monopoly.api.games.players.schema import PlayerSchema
from monopoly.api.games.gameActionTracker.schema import GameActionTrackerSchema

class GamePlayerMovesSchema(ma.Schema):
    numberOfMovesPlayed = fields.Integer()
    totalGameMoveCount = fields.Integer()
    gameMoveStatus = EnumField(Enum.GameMoveStatus, by_value=True)
    currentPlayer = fields.Nested(PlayerSchema)
    gameActionTracker = fields.Nested(GameActionTrackerSchema)


class update_player_moves(ma.Schema):
    gameMoveStatus = EnumField(Enum.GameMoveStatus, by_value=True,required=True)
    currentPlayerId = fields.Integer(required=True)
    @post_load
    def make_player(self, data, **kwargs):
        return GamePlayerMoves(**data) 