import React from 'react'
import { CurrentPlayerCardsOnHand } from './CurrentPlayerCardsOnHand'
import { InProgressBoardContainer } from '../atoms/InProgressBoardContainer'
import { GameBoardArea } from './GameBoardArea'
import {CurrentPlayerCardsContextProvider} from '../../context/CurrentPlayerCardsOnHandContext'


export const GameInProgressBoard = () => {
    return (
        <InProgressBoardContainer>
            <CurrentPlayerCardsContextProvider>
                <GameBoardArea/>
                <CurrentPlayerCardsOnHand/>
            </CurrentPlayerCardsContextProvider>
            
        </InProgressBoardContainer>
    )
}
