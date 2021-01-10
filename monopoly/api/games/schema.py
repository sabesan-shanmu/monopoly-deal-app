from marshmallow import fields,validates,post_load,validate,ValidationError,post_dump
from marshmallow.validate import Range,Length
from marshmallow_enum import EnumField
import monopoly.common.enums as Enum
from monopoly import ma
from monopoly.models import Game
from monopoly.api.games.players.schema import PlayerSchema



class create_game_schema(ma.Schema):
    name=fields.Str(required=True,validate=Length(max=20,min=1))
    gameMode =  EnumField(Enum.GameMode,required=True, by_value=True)
    @post_load
    def make_game(self, data, **kwargs):
        return Game(**data)


class update_game_schema(ma.Schema):
    gamePassCode = fields.Str(required=True)
    gameStatus =  EnumField(Enum.GameStatus, by_value=True)

    @post_load
    def make_game(self, data, **kwargs):
        return Game(**data)


class GameSchema(ma.Schema):
    gamePassCode = fields.Str(required=True)
    numberOfPlayers = fields.Int(required=True)
    name = fields.Str()
    currentPlayerId = fields.Int()
    gameStatus = EnumField(Enum.GameStatus, by_value=True)
    createdUtcDate = fields.DateTime()
    players = fields.Nested(PlayerSchema,many=True)
    links = ma.Hyperlinks(
        {"self": ma.AbsoluteUrlFor("Games_single_game_resource", gamePassCode="<gamePassCode>")}
    )
    @post_dump
    def update_number_of_players(self, data, many, **kwargs):
        data["numberOfPlayers"] = len(data["players"])
        return data

        


