from marshmallow import fields,validates,post_load,validate,ValidationError,pre_load
from marshmallow.validate import Range,Length
from marshmallow_enum import EnumField
import monopoly.common.enums as Enum
from monopoly import ma
from monopoly.models import Game




class create_game_schema(ma.Schema):
    name=fields.Str(required=True,validate=Length(max=20,min=1))

    @post_load
    def make_game(self, data, **kwargs):
        return Game(**data)


class update_game_schema(ma.Schema):
    gamePassCode = fields.Str(required=True)
    numberOfTurnsPlayed = fields.Int(required=True,validate=Range(min=0,max=3))
    currentPlayerId = fields.Int(allow_none=True)
    gameStatus =  EnumField(Enum.GameStatus, by_value=True)



    @post_load
    def make_game(self, data, **kwargs):
        return Game(**data)


class GameSchema(ma.Schema):
    gamePassCode = fields.Str(required=True)
    numberOfPlayers = fields.Int(required=True,validate=Range(min=0,max=3))
    name = fields.Str()
    currentPlayerId = fields.Int()
    numberOfTurnsPlayed = fields.Int()
    gameStatus = EnumField(Enum.GameStatus, by_value=True)
    createdUtcDate = fields.DateTime()
    links = ma.Hyperlinks(
        {"self": ma.AbsoluteUrlFor("single_game_resource", gamePassCode="<gamePassCode>")}
    )