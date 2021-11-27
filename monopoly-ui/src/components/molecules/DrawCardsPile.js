import React,{useState} from 'react'
import styled from 'styled-components';
import { device } from '../../common/devices';
import { MonopolyDealLabel } from '../atoms/MonopolyDealLabel';
import { MonopolyCard } from '../atoms/MonopolyCard';
import { GameMoveStatusEnum,CardTypeEnum } from '../../common/constants';
import { drawCardsApi } from '../../api/drawCardsApi';
import { gameMoveApi } from '../../api/gameMoveApi';


const StyledDrawCardsPile = styled.div`
    min-width: 280px;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    height:100%;
`;

const StyledBorder = styled.div`
    border:2px solid white;
    display:grid;
    width: 240px;
    justify-items: center;
    position:relative;
    min-height:240px;
    padding: 5px;
`;


export const DrawCardsPile = ({game,gameMove,player}) => {
    
    const [isDrawCardsClicked, setIsDrawCardsClicked] = useState(false);
    

    const isPlayerDrawingCard = gameMove?.currentPlayer?.playerId == player?.playerId 
    && gameMove?.gameMoveStatus == GameMoveStatusEnum.DrawTwoCardsInProgress;

    const drawCardOnClick  = async()=>{
        if(!isPlayerDrawingCard || isDrawCardsClicked){
            console.log("player cannot draw cards");
            return false; 
        }
        console.log("Clicked on drawCard");
        let payload = {
            gameMoveStatus:GameMoveStatusEnum.MoveInProgress,
            currentPlayerId:player.playerId
        };

        
        setIsDrawCardsClicked(true);
        //1. draw 2 cards
        drawCardsApi.get(game.links.drawCards,player.accessToken)
        .then((success)=>{
            console.log(success.data);
            //2. update move status to in progress
            return gameMoveApi.patch(game.links.gameMoves,player.accessToken,payload)
        }).then((success)=>{
            console.log(success.data);
            //reset state
            setIsDrawCardsClicked(false);
        }).catch((error)=>{
            console.log(error.response.data);
            //reset state
            setIsDrawCardsClicked(false);
        });  

    }
    return (
        <StyledDrawCardsPile>
            <MonopolyDealLabel type="h2" text="-Draw Card Pile-" />
            <StyledBorder>
                <MonopolyCard onClick={()=>drawCardOnClick()} cardType={CardTypeEnum.FaceDownCard} isCardSelectable={isPlayerDrawingCard} />
            </StyledBorder>
        </StyledDrawCardsPile>
    )
}
