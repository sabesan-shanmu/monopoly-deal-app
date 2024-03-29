import React from 'react'
import {getBackgroundColour} from '../../common/ImageHelpers'
import styled from 'styled-components'
import {MAX_NUMBER_OF_MOVES,GameMoveStatusEnum,GamePlayActionEnum} from '../../common/constants'


const StyledMessageHeader = styled.div`
    margin-top:5px;
    background-color:${({imageId})=>getBackgroundColour(imageId,"secondary")};
    color:${({imageId})=>getBackgroundColour(imageId,"text")};
    border: 2px solid black;
    border-radius:2px;
`


export const MessageHeader = ({currentPlayer,transactionTracker,gameMoveStatus,numberOfMovesPlayed,totalGameMoveCount}) => {

    const getCount =(numberOfMovesPlayed) =>{
        return numberOfMovesPlayed==1?"1st":numberOfMovesPlayed==2?"2nd":numberOfMovesPlayed==3?"3rd":"";
    }

    return (
        <React.Fragment>
            <StyledMessageHeader imageId={currentPlayer.imageId}>

                {gameMoveStatus==GameMoveStatusEnum.WaitingForPlayerToBeginMove &&
                    <React.Fragment>
                        Waiting for {currentPlayer.playerName} to make {getCount(numberOfMovesPlayed+1)} move
                    </React.Fragment>
                }
                {gameMoveStatus==GameMoveStatusEnum.MoveInProgress && !transactionTracker &&
                    <React.Fragment>
                        {currentPlayer.playerName}'s {getCount(numberOfMovesPlayed+1)} move is in progress...
                    </React.Fragment>
                }
                {gameMoveStatus==GameMoveStatusEnum.MoveInProgress && transactionTracker &&
                    <div>
                        {currentPlayer.playerName} played {transactionTracker?.gameCard?.name} for {getCount(numberOfMovesPlayed+1)} move
                    </div>
                }
                {gameMoveStatus==GameMoveStatusEnum.DrawTwoCardsInProgress &&
                    <div>
                        {currentPlayer.playerName} click on Draw Card Pile to draw 2 cards
                    </div>
                }
                {gameMoveStatus==GameMoveStatusEnum.DiscardExtraCards &&
                    <div>
                        {currentPlayer.playerName} discard extra cards on hand (Max: 5 cards allowed on hand)
                    </div>
                }
                {gameMoveStatus==GameMoveStatusEnum.MoveComplete &&
                    <React.Fragment>
                        {currentPlayer.playerName} completed {getCount(numberOfMovesPlayed)} move
                    </React.Fragment>
                }
            </StyledMessageHeader>
            
            
        </React.Fragment>
    )
}
