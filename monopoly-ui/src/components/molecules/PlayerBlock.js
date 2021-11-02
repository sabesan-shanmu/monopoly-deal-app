import React,{useContext} from 'react'
import { PlayerCharacter } from './PlayerCharacter'
import styled from 'styled-components'
import { GameBlockTypeEnum } from '../../common/constants';
import { MonopolyCard } from '../atoms/MonopolyCard';
import { MonopolyDealLabel } from '../atoms/MonopolyDealLabel';
import { CardTypeEnum } from '../../common/constants';
import {GameMoveContext} from '../../context/GameMoveContext'
import {PlayerContext} from '../../context/PlayerContext'
import { GameMoveStatusEnum } from '../../common/constants';


const StyledDrawPile = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    height:100%;
`;

const StyledPlayerBlock = styled.div`
    visibility:${(props)=>props.blockType?"visible":"hidden"};
    min-width:350px;
    min-height:350px;
    padding:5px;
    margin:5px;
    border:5px solid black;
    color:white;
`;



export const PlayerBlock = ({blockName,player,blockType}) => {
    
    const {gameMoveState,gameMoveDispatch} = useContext(GameMoveContext);
    const {playerState,playerDispatch} = useContext(PlayerContext);
    const playerBlock = {...player,isGameBoard:true};

    const isPlayerDrawingCard = gameMoveState?.gameMove?.currentPlayer?.playerId == playerState?.player?.playerId 
    && gameMoveState?.gameMove?.gameMoveStatus == GameMoveStatusEnum.DrawTwoCardsInProgress;
    
    return (
        <StyledPlayerBlock blockType={blockType}>
              {blockType == GameBlockTypeEnum.PlayerBlock  &&
                    <React.Fragment>
                        <PlayerCharacter
                            {...playerBlock}
                        />
                    </React.Fragment>
              }
              {blockType == GameBlockTypeEnum.DrawCardsBlock &&
                    <StyledDrawPile>  
                        <MonopolyCard cardType={CardTypeEnum.FaceDownCard}  isPlayerDrawingCard={isPlayerDrawingCard} />
                        <MonopolyDealLabel type="h4" text="Draw Card Pile"/>
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
