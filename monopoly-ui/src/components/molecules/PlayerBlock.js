import React,{useContext,useState} from 'react'
import { PlayerCharacter } from './PlayerCharacter'
import styled from 'styled-components'
import { GameBlockTypeEnum } from '../../common/constants';
import {GameMoveContext} from '../../context/GameMoveContext'
import {PlayerContext} from '../../context/PlayerContext'
import {SelectionMoveCheckContext} from '../../context/SelectionMoveCheckContext'
import { PropertyPile } from './PropertyPile';
import { CashPile } from './CashPile';
import { InPlayPile } from './InPlayPile';
import { DrawCardsPile } from './DrawCardsPile';


const StyledPlayerBlock = styled.div`
    ${(props)=>props.blockType == GameBlockTypeEnum.HiddenBlock? "display:none":props.blockType?"visibility:visible":"visibility:hidden"};
    padding:5px;
    margin:5px;
    border:5px solid black;
    color:white;
`;


export const PlayerBlock = ({game,blockName,player,blockType}) => {
    
    const {gameMoveState,gameMoveDispatch} = useContext(GameMoveContext);
    const {playerState,playerDispatch} = useContext(PlayerContext);
    const {selectionMoveCheckState,selectionMoveCheckDispatch} = useContext(SelectionMoveCheckContext);

    const playerBlock = {...player,isGameBoard:true};
    console.log(playerBlock);

    const listOfPossibleMoves  = selectionMoveCheckState?.listOfPossibleMoves?.selectablePlayers.filter(t=>t.playerId == playerBlock.playerId);
    const isSelectable = listOfPossibleMoves?.length>0;
    console.log(listOfPossibleMoves);
    console.log(selectionMoveCheckState);

    return (
        <StyledPlayerBlock blockType={blockType}>
              {blockType == GameBlockTypeEnum.PlayerBlock  &&
                    <React.Fragment>
                        <PlayerCharacter
                            {...playerBlock}
                            isSelectable={isSelectable}
                            listOfPossibleMoves={listOfPossibleMoves}
                        />
                        
                        <PropertyPile propertyPileCards={playerBlock?.propertyPileCards}/>
                        <CashPile cashPileCards={playerBlock?.cashPileCards}/>
                    </React.Fragment>
              }
              {blockType == GameBlockTypeEnum.DrawCardsBlock &&
                    <React.Fragment>  
                       <DrawCardsPile game={game} player={playerState.player} gameMove={gameMoveState.gameMove}/>
                    </React.Fragment>
                  
              }
               {blockType == GameBlockTypeEnum.ActiveCardsBlock &&
                    <React.Fragment>  
                        <InPlayPile players={game.players} inPlayPileCards={game?.inPlayPileCards} />
                    </React.Fragment>
                  
              }
                
        </StyledPlayerBlock>
      
    )
}
