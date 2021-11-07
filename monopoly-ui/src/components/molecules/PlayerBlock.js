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
        console.log("Clicked on drawCard");
        let payload = {
            gameMoveStatus:GameMoveStatusEnum.MoveInProgress,
            currentPlayerId:playerState.player.playerId
        };

        
        setIsDrawCardsClicked(true);
        const [firstResponse, secondResponse] = await Promise.all([
            drawCardsApi.get(game.links.drawCards,playerState.player.accessToken),
            gameMoveApi.patch(game.links.gameMoves,playerState.player.accessToken,payload)
          ]);
        
     

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
                        <MonopolyCard onClick={isPlayerDrawingCard && !isDrawCardsClicked ? drawCardOnClick() : undefined } cardType={CardTypeEnum.FaceDownCard} isCardSelectable={isPlayerDrawingCard} />
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
