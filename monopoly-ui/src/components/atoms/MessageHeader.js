import React from 'react'
import {getBackgroundColour} from '../../common/ImageHelpers'
import styled from 'styled-components'
import {MAX_NUMBER_OF_MOVES,GameMoveStatusEnum} from '../../common/constants'


const StyledMessageHeader = styled.div`
    margin-top:5px;
    background-color:${({imageId})=>getBackgroundColour(imageId,"secondary")};
    border: 2px solid black;
    border-radius:2px;
`


export const MessageHeader = ({currentPlayer,gameActionTracker,gameMoveStatus,numberOfMovesPlayed,totalGameMoveCount}) => {

    const getCount =(numberOfMovesPlayed) =>{
        return numberOfMovesPlayed==1?"1st":numberOfMovesPlayed==2?"2nd":numberOfMovesPlayed==3?"3rd":"";
    }

    console.log(currentPlayer);
    return (
        <React.Fragment>
            <StyledMessageHeader imageId={currentPlayer.imageId}>

                {gameMoveStatus==GameMoveStatusEnum.WaitingForPlayerToBeginMove &&
                    <React.Fragment>
                        Waiting for {currentPlayer.playerName} to make {getCount(numberOfMovesPlayed+1)} move
                    </React.Fragment>
                }
                {gameMoveStatus==GameMoveStatusEnum.MoveInProgress &&
                    <React.Fragment>
                        {currentPlayer.playerName}'s {getCount(numberOfMovesPlayed+1)} move is in progress...
                    </React.Fragment>
                }
                {gameMoveStatus==GameMoveStatusEnum.DrawTwoCardsInProgress &&
                    <React.Fragment>
                        {currentPlayer.playerName} drawing 2 cards
                    </React.Fragment>
                }
                {gameMoveStatus==GameMoveStatusEnum.MoveComplete &&
                    <React.Fragment>
                        {currentPlayer.playerName} completed {getCount(numberOfMovesPlayed)} moves
                    </React.Fragment>
                }
            </StyledMessageHeader>
            
            
        </React.Fragment>
    )
}
