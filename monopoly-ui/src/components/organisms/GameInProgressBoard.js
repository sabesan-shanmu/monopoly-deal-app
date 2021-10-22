import React from 'react'
import { CurrentPlayerCardsOnHand } from './CurrentPlayerCardsOnHand'
import { InProgressBoardContainer } from '../atoms/InProgressBoardContainer'
import { GameBoardArea } from './GameBoardArea'

export const GameInProgressBoard = () => {
    return (
        <InProgressBoardContainer>
            <GameBoardArea/>
            <CurrentPlayerCardsOnHand/>
        </InProgressBoardContainer>
    )
}
