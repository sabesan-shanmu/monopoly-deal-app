import React,{useContext,createContext,useReducer,useEffect,useRef} from 'react'
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
    const accessTokenRef = useRef(playerState.player.accessToken);
    accessTokenRef.current = playerState.player.accessToken;
   
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

        // Hand events are only sent to this player's private room, which the API lets a socket join
        // after verifying its access token. Join now and again after every reconnect (rooms don't survive one).
        const joinPlayerRoom = () => {
            socket.emit('join_player_room', {accessToken: accessTokenRef.current}, (ack) => {
                if(!ack || !ack.joined)
                    console.log("join_player_room failed", ack);
            });
        };
        if(socket.connected)
            joinPlayerRoom();
        socket.on('connect', joinPlayerRoom);

        const handEvent = (action) => `${action}_player_cards_on_hand_${gameState.game.gamePassCode}_${playerState.player.playerId}`;
        const handlers = {
            [handEvent('add')]: (player_cards) => {
                if(isMounted)
                    currentPlayerCardsStateDispatch({type:ResourceTypes.CreateResource,playerCards:player_cards});
            },
            [handEvent('update')]: (player_cards) => {
                if(isMounted)
                    currentPlayerCardsStateDispatch({type:ResourceTypes.UpdateResource,playerCards:player_cards});
            },
            [handEvent('delete')]: (player_cards) => {
                if(isMounted)
                    currentPlayerCardsStateDispatch({type:ResourceTypes.DeleteResource,playerCards:player_cards});
            }
        };
        Object.entries(handlers).forEach(([event, handler]) => socket.on(event, handler));

        return () => {
            isMounted=false
            socket.off('connect', joinPlayerRoom);
            Object.entries(handlers).forEach(([event, handler]) => socket.off(event, handler));
            // Stop receiving this hand once the board unmounts (logout, leaving the game)
            socket.emit('leave_player_room');
        }
    }, [gameState.game.gameStatus])


    return (
        <CurrentPlayerCardsContext.Provider
            value={{currentPlayerCardsState,currentPlayerCardsStateDispatch}}>
            {children}
        </CurrentPlayerCardsContext.Provider>
    )
}
