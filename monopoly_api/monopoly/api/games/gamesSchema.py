from marshmallow import fields,validates
from marshmallow.validate import Range
from marshmallow_enum import EnumField
import monopoly.common.enums as Enum
from monopoly import ma




class create_game_schema(ma.Schema):
    ownerPlayerId=fields.Int(required=True)


class update_game_schema(ma.Schema):
    gameId = fields.Int(required=True)
    numberOfTurnsPlayed = fields.Int(required=True,validate=Range(min=0,max=3))
    currentPlayerId = fields.Int(required=True)
    gameStatus =  EnumField(Enum.GameStatus, by_value=True)

    @validates('currentPlayerId')
    def is_current_player_id(self,value):
        return True

class game_schema(ma.Schema):
    pass
