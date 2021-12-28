import React,{useContext,createContext,useReducer,useEffect} from 'react'
import { SocketContext } from './SocketContext';
import { GameContext } from './GameContext';
import { ResourceTypes } from '../common/constants';
import { playerCardsApi } from '../api/playerCardsApi';
import { PlayerContext } from './PlayerContext';

export const CurrentPlayerCardsContext = createContext();

const currentPlayerCardsInitState = {
    playerCards:[],
    errors:null
  };
  


const currentPlayerCardsReducer =  (state,action)  =>{
    const currentPlayerCards = [...state.playerCards];
    switch(action.type){
        case ResourceTypes.LoadResource:
            return {...state,playerCards:action.playerCards};
        case ResourceTypes.CreateResource:
            const updated_playerCards = [...state.playerCards,...action.playerCards];
            return {...state,playerCards:updated_playerCards};
        case ResourceTypes.DeleteResource:
            if(!state.playerCards)
                return {...state}
            
            action.playerCards.forEach(gameCard=>{
                console.log(`searching:${gameCard.gameCardId}`);
                const foundIndex = currentPlayerCards.findIndex(C=>{return C.gameCardId == gameCard.gameCardId });
                if(foundIndex>-1)
                currentPlayerCards.splice(foundIndex,1);
            });
            return {...state,playerCards:currentPlayerCards};
        case ResourceTypes.UpdateResource:
            if(!state.playerCards)
                return {...state}

            action.playerCards.forEach(gameCard=>{
                console.log(`searching:${gameCard.gameCardId}`);
                const foundIndex = currentPlayerCards.findIndex(C=>{return C.gameCardId == gameCard.gameCardId });
                if(foundIndex>-1)
                currentPlayerCards[foundIndex] = gameCard;
            });
        
            return {...state,playerCards:currentPlayerCards}; 
    }
}


export const CurrentPlayerCardsContextProvider = ({children}) => {

    const [currentPlayerCardsState,currentPlayerCardsStateDispatch] = useReducer(currentPlayerCardsReducer,currentPlayerCardsInitState)
    const {socket} = useContext(SocketContext); 
    const {gameState,gameDispatch}  = useContext(GameContext);
    const {playerState,playerDispatch}  = useContext(PlayerContext);
   
    useEffect(() => {
        let isMounted=true;

        playerCardsApi.get(gameState.game.links.playerCards,playerState.player.accessToken).then((success)=>{
            console.log(success.data);
            if(isMounted)
                currentPlayerCardsStateDispatch({type:ResourceTypes.LoadResource,playerCards:success.data});
          }).catch((error)=>{
            console.log(error.response.data);
            if(isMounted)
                currentPlayerCardsStateDispatch({type:ResourceTypes.DeleteResource,errors:error.response.data});
        });

        socket.on(`add_player_cards_on_hand_${gameState.game.gamePassCode}_${playerState.player.playerId}`, (player_cards) => {
      
            console.log("add_player_cards_on_hand fired!");
            console.log(player_cards);
            if(isMounted)
                currentPlayerCardsStateDispatch({type:ResourceTypes.CreateResource,playerCards:player_cards});
          });

        socket.on(`update_player_cards_on_hand_${gameState.game.gamePassCode}_${playerState.player.playerId}`, (player_cards) => {
      
            console.log("update_player_cards_on_hand fired!");
            console.log(player_cards);
            if(isMounted)
                currentPlayerCardsStateDispatch({type:ResourceTypes.UpdateResource,playerCards:player_cards});
        });

        
        socket.on(`delete_player_cards_on_hand_${gameState.game.gamePassCode}_${playerState.player.playerId}`, (player_cards) => {
      
            console.log("delete_player_cards_on_hand fired!");
            console.log(player_cards);
            if(isMounted)
                currentPlayerCardsStateDispatch({type:ResourceTypes.DeleteResource,playerCards:player_cards});
          });

        return () => {
            isMounted=false
        }
    }, [gameState.game.gameStatus])


    return (
        <CurrentPlayerCardsContext.Provider
            value={{currentPlayerCardsState,currentPlayerCardsStateDispatch}}>
            {children}
        </CurrentPlayerCardsContext.Provider>
    )
}
