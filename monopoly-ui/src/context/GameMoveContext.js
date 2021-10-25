import React,{useContext,createContext,useReducer,useEffect} from 'react'
import { SocketContext } from './SocketContext';
import { GameContext } from './GameContext';
import { PlayerContext } from './PlayerContext';
import { ActionTypes } from '../common/constants';
import { gameMoveApi } from '../api/gameMoveApi';

export const GameMoveContext = createContext();

const gameMoveInitState = {
    gameMove:null,
    errors:null
  };
  


const gameMoveReducer =  (state,action)  =>{
    switch(action.type){
        case ActionTypes.LoadResource:
        case ActionTypes.CreateResource:
        case ActionTypes.UpdateResource:
          return {...state,gameMove:action.gameMove};
        case ActionTypes.DeleteResource:
          return {...state,gameMove:null,errors:action.errors};
    }
}


export const GameMoveContextProvider = ({children}) => {

    const [gameMoveState,gameMoveDispatch] = useReducer(gameMoveReducer,gameMoveInitState)
    const {socket} = useContext(SocketContext); 
    const {gameState,gameDispatch}  = useContext(GameContext);
    const {playerState,playerDispatch}  = useContext(PlayerContext);

    
    useEffect(() => {
        let isMounted=true;

        gameMoveApi.get(gameState.game.links.gameMoves,playerState.player.accessToken).then((success)=>{
            console.log(success.data);
            if(isMounted)
                gameMoveDispatch({type:ActionTypes.LoadResource,gameMove:success.data});
          }).catch((error)=>{
            console.log(error.response.data);
            if(isMounted)
                gameMoveDispatch({type:ActionTypes.DeleteResource,errors:error.response.data});
        });

        socket.on(`create_game_moves_${gameState.game.gamePassCode}`, (created_game_moves) => {
            console.log(`create_game_moves_${gameState.game.gamePassCode} fired!`);
            console.log(created_game_moves);
            if(isMounted)
                gameMoveDispatch({type:ActionTypes.CreateResource,gameMove:created_game_moves});
        });
    
             
        socket.on(`update_game_moves_${gameState.game.gamePassCode}`, (update_game_moves) => {
            console.log(`update_game_moves_${gameState.game.gamePassCode}`);
            console.log(update_game_moves);
            if(isMounted)
                gameMoveDispatch({type:ActionTypes.UpdateResource,gameMove:update_game_moves});
        });

        
        return () => {
            isMounted=false
        }
    }, [])


    return (
        <GameMoveContext.Provider
            value={{gameMoveState,gameMoveDispatch}}>
            {children}
        </GameMoveContext.Provider>
    )
}
