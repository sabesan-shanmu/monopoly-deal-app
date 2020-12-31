from monopoly import ma
from marshmallow import fields,post_load
from marshmallow_enum import EnumField
import monopoly.common.enums as Enum
from monopoly.models import GamePlayerMoves

class GamePlayerMovesSchema(ma.Schema):
    currentPlayerId = fields.Integer()
    numberMovesPlayed = fields.Integer()
    gameTurn = fields.Integer()
    gameMoveStatus = EnumField(Enum.GameMoveStatus, by_value=True)
    links = ma.Hyperlinks(
        {"card": ma.AbsoluteUrlFor("Cards_single_card_resource", cardId="<currentInPlayCardId>")}
    )

class update_player_moves(ma.Schema):
    gameMoveStatus = EnumField(Enum.GameMoveStatus, by_value=True)
    currentPlayerId = fields.Integer()
    @post_load
    def make_player(self, data, **kwargs):
        return GamePlayerMoves(**data) 