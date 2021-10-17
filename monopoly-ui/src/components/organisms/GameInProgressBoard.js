import React from 'react'
import { CurrentPlayerCardsOnHand } from './CurrentPlayerCardsOnHand'
import { InProgressBoardContainer } from '../atoms/InProgressBoardContainer'

export const GameInProgressBoard = () => {
    return (
        <InProgressBoardContainer>
            <CurrentPlayerCardsOnHand/>
        </InProgressBoardContainer>
    )
}
