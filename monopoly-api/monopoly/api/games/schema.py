from marshmallow import fields,validates,post_load,validate,ValidationError,post_dump
from marshmallow.validate import Range,Length
from marshmallow_enum import EnumField
import monopoly.common.enums as Enum
from monopoly import ma
from monopoly.models import Game
from monopoly.api.games.players.schema import PlayerSchema
from monopoly.api.games.gameCards.schema import GameCardSchema
from monopoly.common.utils import url_overwrite


class create_game_schema(ma.Schema):
    name=fields.Str(required=True,validate=Length(max=20,min=1))
    gameMode =EnumField(Enum.GameMode,required=True, by_value=True)
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
    gameMode =  EnumField(Enum.GameMode, by_value=True)
    gameStatus = EnumField(Enum.GameStatus, by_value=True)
    createdUtcDate = fields.DateTime()
    players = fields.Nested(PlayerSchema,many=True)
    inPlayPileCards = fields.Nested(GameCardSchema,many=True)
    links = ma.Hyperlinks(
        {
            "self":url_overwrite("Games_single_game_resource", gamePassCode="<gamePassCode>"),
            "register": url_overwrite("Players_register_resource", gamePassCode="<gamePassCode>"),
            "login": url_overwrite("Players_login_resource", gamePassCode="<gamePassCode>"),
            "refresh": url_overwrite("Players_refresh_resource", gamePassCode="<gamePassCode>"),
            "vote": url_overwrite("Players_vote_resource", gamePassCode="<gamePassCode>"),
            "gameCards": url_overwrite("GameCards_many_game_cards_resource", gamePassCode="<gamePassCode>"),
            "playerCards": url_overwrite("PlayerCards_many_player_cards_resource", gamePassCode="<gamePassCode>"),
            "gameMoves": url_overwrite("GamePlayerMoves_game_player_moves_resource", gamePassCode="<gamePassCode>"),
            "preMoveCheck": url_overwrite("PreMoveCheck_pre_move_check_resource", gamePassCode="<gamePassCode>"),
            "inPlayMoveCheck": url_overwrite("InPlayMoveCheck_in_play_move_check_resource", gamePassCode="<gamePassCode>"),
            "selectionMoveCheck": url_overwrite("SelectionMoveCheck_selection_move_check_resource", gamePassCode="<gamePassCode>"),
            "propertyMoveCheck": url_overwrite("PropertyMoveCheck_property_move_check_resource", gamePassCode="<gamePassCode>"),
            "drawCards": url_overwrite("DrawCards_draw_cards_resource", gamePassCode="<gamePassCode>"),
            "transactionTracker": url_overwrite("TransactionTracker_many_transaction_tracker_resource", gamePassCode="<gamePassCode>")
        }
    )
    @post_dump
    def update_number_of_players(self, data, many, **kwargs):
        data["numberOfPlayers"] = len(data["players"])
        return data

        


