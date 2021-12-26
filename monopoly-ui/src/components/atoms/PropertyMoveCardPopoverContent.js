import React,{useContext} from 'react'
import styled from 'styled-components'
import {PlayerContext} from '../../context/PlayerContext'
import { GameContext } from '../../context/GameContext'
import { PropertyMoveCheckContext } from '../../context/PropertyMoveCheckContext'
import {gameCardsApi} from '../../api/gameCardsApi'
import {ResourceTypes} from '../../common/constants'
import { propertyMoveCheckApi } from '../../api/propertyMoveCheckApi'
const StyledPopoverContent = styled.div`
    width:115 px;
    color:white;
    border:1px solid white;
    padding:3px;
    border-radius:2px;
`;

const StyledPopoverHeader = styled.div`
    background-color:#382F2F;
    color:white;
`;

const StyledPopoverBody = styled.div`
    background-color:white;
    color:black;
    cursor:pointer;
    &:hover{
        background-color:#AFAFAF;
    }
`;




export const PropertyMoveCardPopoverContent = ({gameCard,listOfPossibleMoves,setIsPopoverOpen}) =>{
    const {playerState,playerDispatch} = useContext(PlayerContext);
    const {gameState,gameDispatch} = useContext(GameContext);
    const {propertyMoveCheckState,propertyMoveCheckStateDispatch} = useContext(PropertyMoveCheckContext);

    const refreshMoveCardList = (gameCard,game,currentPlayer,gameCardmove) =>{
            //1. move the card
            const gameCardPayload = {
                gameCardId:gameCardmove.gameCardId,
                isCardRightSideUp:gameCardmove.isCardRightSideUp,
                assignedColourId:gameCardmove.assignedColourId,
                groupId:gameCardmove.groupId
            };
            gameCardsApi.patch(gameCard.links.self,currentPlayer.accessToken,gameCardPayload)
            .then((success)=>{
                console.log(success.data)
                return propertyMoveCheckApi.get(game.links.propertyMoveCheck,currentPlayer.accessToken);
            })
            .then((success)=>{
                propertyMoveCheckStateDispatch({type:ResourceTypes.LoadResource,listOfPossibleMoves:success.data});
                //close popover
                setIsPopoverOpen(false);
            })
            .catch((error)=>{
                console.log(error.response.data);
                    propertyMoveCheckStateDispatch({   
                            type:ResourceTypes.LoadResource,
                            listOfPossibleMoves:[]
                        });
                    //close popover
                    setIsPopoverOpen(false);    
            });
    }

    return (
        <StyledPopoverContent>
            <StyledPopoverHeader>Choose an Action:</StyledPopoverHeader>
            {listOfPossibleMoves.map((move,key)=>
                <StyledPopoverBody key={key} onClick={()=>{
                    //refresh data
                    refreshMoveCardList(gameCard,gameState.game,playerState.player,move);
                }}>{move.description}</StyledPopoverBody>
            )}
        </StyledPopoverContent>
    )
}

