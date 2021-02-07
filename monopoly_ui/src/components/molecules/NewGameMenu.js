import React from 'react'
import PropTypes from 'prop-types'
import {MonopolyDealButton} from '../atoms/MonopolyDealButton'
import {MonopolyDealInputField} from '../atoms/MonopolyDealInputField'
import './NewGameMenu.css'

export const NewGameMenu = () => {

    const gameinput = {
        mode: "text",
        label: "Game",
        maxLength:30,
        placeholder:"Enter Name..."
    }

    const left = {
        onClick:null,
        label:"Cancel"
    }
    const right = {
        onClick:null,
        label:"Create"
    }
    


    return (
        <main className="new-game-menu-container">
            <div class="new-game-menu-container__header">
                <MonopolyDealInputField {...gameinput} />
            </div>
            <div class="new-game-menu-container__body">
                <MonopolyDealButton  {...left} />
                <MonopolyDealButton  {...right} /> 
            </div>
        </main>
    )
}

