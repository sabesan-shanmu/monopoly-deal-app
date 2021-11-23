import React,{useContext,useState} from 'react'
import { PlayerCharacter } from './PlayerCharacter'
import styled from 'styled-components'
import { GameBlockTypeEnum } from '../../common/constants';
import {GameMoveContext} from '../../context/GameMoveContext'
import {PlayerContext} from '../../context/PlayerContext'
import { PropertyPile } from './PropertyPile';
import { CashPile } from './CashPile';
import { InPlayPile } from './InPlayPile';
import { DrawCardsPile } from './drawCardsPile';



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

    const playerBlock = {...player,isGameBoard:true};

    
    return (
        <StyledPlayerBlock blockType={blockType}>
              {blockType == GameBlockTypeEnum.PlayerBlock  &&
                    <React.Fragment>
                        <PlayerCharacter
                            {...playerBlock}
                        />
                        
                        <PropertyPile cards={playerState?.player?.propertyPileCards}/>
                        <CashPile cards={playerState?.player?.cashPileCards}/>
                    </React.Fragment>
              }
              {blockType == GameBlockTypeEnum.DrawCardsBlock &&
                    <React.Fragment>  
                       <DrawCardsPile game={game} player={playerState.player} gameMove={gameMoveState.gameMove}/>
                    </React.Fragment>
                  
              }
               {blockType == GameBlockTypeEnum.ActiveCardsBlock &&
                    <React.Fragment>  
                        <InPlayPile cards={game?.inPlayPileCards} />
                    </React.Fragment>
                  
              }
                
        </StyledPlayerBlock>
      
    )
}
