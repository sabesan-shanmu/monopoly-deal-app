import React,{useContext,useState} from 'react'
import { PlayerCharacter } from './PlayerCharacter'
import styled from 'styled-components'
import { GameBlockTypeEnum } from '../../common/constants';
import { MonopolyCard } from '../atoms/MonopolyCard';
import { MonopolyDealLabel } from '../atoms/MonopolyDealLabel';
import { CardTypeEnum } from '../../common/constants';
import {GameMoveContext} from '../../context/GameMoveContext'
import {PlayerContext} from '../../context/PlayerContext'
import { GameMoveStatusEnum } from '../../common/constants';
import { drawCardsApi } from '../../api/drawCardsApi';
import { gameMoveApi } from '../../api/gameMoveApi';
import { PropertyPile } from './PropertyPile';
import { CashPile } from './CashPile';

const StyledDrawPile = styled.div`
    min-width: 280px;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    height:100%;
`;

const StyledPlayerBlock = styled.div`
    visibility:${(props)=>props.blockType?"visible":"hidden"};
    padding:5px;
    margin:5px;
    border:5px solid black;
    color:white;
`;



export const PlayerBlock = ({game,blockName,player,blockType}) => {
    
    const {gameMoveState,gameMoveDispatch} = useContext(GameMoveContext);
    const {playerState,playerDispatch} = useContext(PlayerContext);
    const [isDrawCardsClicked, setIsDrawCardsClicked] = useState(false);
    const playerBlock = {...player,isGameBoard:true};

    const isPlayerDrawingCard = gameMoveState?.gameMove?.currentPlayer?.playerId == playerState?.player?.playerId 
    && gameMoveState?.gameMove?.gameMoveStatus == GameMoveStatusEnum.DrawTwoCardsInProgress;


    const drawCardOnClick  = async()=>{
        if(!isPlayerDrawingCard || isDrawCardsClicked){
            console.log("player cannot draw cards");
            return false; 
        }
        console.log("Clicked on drawCard");
        let payload = {
            gameMoveStatus:GameMoveStatusEnum.MoveInProgress,
            currentPlayerId:playerState.player.playerId
        };

        
        setIsDrawCardsClicked(true);
        //1. draw 2 cards
        drawCardsApi.get(game.links.drawCards,playerState.player.accessToken)
        .then((success)=>{
            console.log(success.data);
            //2. update move status to in progress
            return gameMoveApi.patch(game.links.gameMoves,playerState.player.accessToken,payload)
        }).then((success)=>{
            console.log(success.data);
        }).catch((error)=>{
            console.log(error.response.data)
        });  

    }
    
    return (
        <StyledPlayerBlock blockType={blockType}>
              {blockType == GameBlockTypeEnum.PlayerBlock  &&
                    <React.Fragment>
                        <PlayerCharacter
                            {...playerBlock}
                        />
                        
                        <PropertyPile/>
                        <CashPile/>
                    </React.Fragment>
              }
              {blockType == GameBlockTypeEnum.DrawCardsBlock &&
                    <StyledDrawPile>  
                        <MonopolyCard onClick={()=>drawCardOnClick()} cardType={CardTypeEnum.FaceDownCard} isCardSelectable={isPlayerDrawingCard} />
                        <MonopolyDealLabel type="h4" text="Draw Card Pile" />
                    </StyledDrawPile>
                  
              }
               {blockType == GameBlockTypeEnum.ActiveCardsBlock &&
                    <StyledDrawPile>  
                        <MonopolyCard cardType={CardTypeEnum.PlaceholderCard}  />
                        <MonopolyDealLabel type="h4" text="Card In Play Pile"/>
                    </StyledDrawPile>
                  
              }
                
        </StyledPlayerBlock>
      
    )
}
