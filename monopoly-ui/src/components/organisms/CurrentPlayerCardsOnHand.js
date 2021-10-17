import React,{useContext,useEffect,useState} from 'react'
import { GameContext } from '../../context/GameContext'
import { PlayerContext } from '../../context/PlayerContext';
import { playerCardsApi } from '../../api/playerCardsApi';
import { InProgressBoardFooter } from '../atoms/InProgressBoardFooter';
import { MonopolyCard } from '../atoms/MonopolyCard';

export const CurrentPlayerCardsOnHand = ()=> {

    const {gameState,gameDispatch} = useContext(GameContext);
    const {playerState,playerDispatch} = useContext(PlayerContext);
    const [playerCards,setPlayerCards] = useState([])
    useEffect(()=>{
        playerCardsApi.get(gameState.game.links.playerCards,playerState.player.accessToken)
        .then(function(success){
            console.log(success.data);
            setPlayerCards(success.data);
        })
        .catch(function(error){
            console.log(error.response.data);
            setPlayerCards([]);
        })
    },[])
    
    return (
        <InProgressBoardFooter>
             {playerCards && playerCards.map((playerCard,key)=>
                <MonopolyCard gameCard={playerCard} key={key} />
             )}
        </InProgressBoardFooter>
    )
}


