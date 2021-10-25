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

    console.log(currentPlayer);
    return (
        <React.Fragment>
            <StyledMessageHeader imageId={currentPlayer.imageId}>
                {gameMoveStatus==GameMoveStatusEnum.WaitingForPlayerToBeginMove &&
                    <React.Fragment>
                        Waiting for {currentPlayer.playerName} to make Move # {(numberOfMovesPlayed+1)} 
                    </React.Fragment>
                }
                {gameMoveStatus==GameMoveStatusEnum.MoveInProgress &&
                    <React.Fragment>
                        {currentPlayer.playerName} : Move # {(numberOfMovesPlayed+1)} in progress...
                    </React.Fragment>
                }
            </StyledMessageHeader>
            
            
        </React.Fragment>
    )
}
