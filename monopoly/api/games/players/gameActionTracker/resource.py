from flask_restx import Resource,Namespace
from flask import request,jsonify   
from monopoly.auth import validate_gamepassCode,validate_player
from monopoly.api.games.services import get_game_by_gamepasscode
from monopoly.api.games.players.gamePlayerMoves.services import is_player_valid
from monopoly.api.games.players.gamePlayerMoves.services import get_game_player_moves,update_game_player_moves
from monopoly.exceptions import ResourceNotFoundException,ResourceValidationException,FieldValidationException
from marshmallow import ValidationError
from .services import get_game_action_tracker,get_game_action_trackers
from .schema import GameActionTrackerSchema,create_game_action_tracker,update_game_action_tracker





game_action_tracker_namespace = Namespace('GameActionTracker', description='Resource to track the player actions on their turn.')


@game_action_tracker_namespace.route('/')
class ManyGameActionTrackerResource(Resource):
    @validate_gamepassCode
    @validate_player
    def post(self,gamePassCode,playerId):
        try:
        
            game_action_tracker = create_game_action_tracker().load(request.get_json())

            game = get_game_by_gamepasscode(gamePassCode)
            if game is None:
                raise ResourceNotFoundException(message="Game Not Found")   
            
            current_player_move = get_game_player_moves(game.gameId)
            if current_player_move is None:
                raise ResourceNotFoundException(message="No Current Moves found")

            if current_player_move.playerId != playerId or game_action_tracker.playerId != playerId:
                raise FieldValidationException(message="Requested player is unable to start an action.")
            elif current_player_move.gameActionTrackerId is not None:
                raise FieldValidationException(message="Unable to start a new action while an action is in progress.")

            create_game_action_tracker(game_action_tracker)
            result = GameActionTrackerSchema().dump(game_action_tracker)
            current_player_move.gameActionTrackerId=result.gameActionTrackerId
            update_game_player_moves(current_player_move)

            return jsonify(result)
        except ValidationError as e:
            raise ResourceValidationException(e)
    
    @validate_gamepassCode
    @validate_player
    def get(self,gamePassCode,playerId):
        try:
            game = get_game_by_gamepasscode(gamePassCode)     
            if game is None:
                raise ResourceNotFoundException(message="Game Not Found")   
            
            game_action_trackers = get_game_action_trackers(game.gameId)
            
            result= GameActionTrackerSchema(many=True).dump(game_action_trackers)
            return jsonify(result)

        except ValidationError as e:
            raise ResourceValidationException(e)

@game_action_tracker_namespace.route('/<int:gameActionTrackerId>/')
class SingleGameActionTrackerResource(Resource):
    @validate_gamepassCode
    @validate_player
    def post(self,gamePassCode,playerId,gameActionTrackerId):
        try:
            game_action_tracker = update_game_action_tracker().load(request.get_json())
            game = get_game_by_gamepasscode(gamePassCode)             
            if game is None:
                raise ResourceNotFoundException(message="Game Not Found")   

            current_player_move = get_game_player_moves(game.gameId)
            if current_player_move is None:
                raise ResourceNotFoundException(message="No Current Moves found")

            if current_player_move.playerId != playerId:
                raise FieldValidationException(message="Requested player is unable to start an action.")

        except ValidationError as e:
            raise ResourceValidationException(e)

    @validate_gamepassCode
    @validate_player
    def get(self,gamePassCode,playerId,gameActionTrackerId):
        try:
            game = get_game_by_gamepasscode(gamePassCode)     
            if game is None:
                raise ResourceNotFoundException(message="Game Not Found")   
            
            game_action_tracker = get_game_action_tracker(game.gameId,gameActionTrackerId)
            
            if game_action_tracker is None:
                raise ResourceNotFoundException(message="Game Action Tracker Not Found")   
            
            result = GameActionTrackerSchema().dump(game_action_tracker)

            return jsonify(result)
        except ValidationError as e:
            raise ResourceValidationException(e)

