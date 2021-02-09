import React from 'react'

export const GameEntries = ({games,onClick,...props}) => {

    return (
        <React.Fragment>
            <div class="game-entries__header">
                <span class="game-entries--header__name">
                    Game Name`
                </span>
                <span class="game-entries--header_status">
                    Game Status
                </span>
                <span class="game-entries--header_players">
                    Number of Players
                </span>
            </div>
            {games && games.map((game,key)=>
                <div class="game-entry__row" onClick={onClick}>
                    <span class="game-entry--row__name">
                        {game.title}
                    </span>
                    <span class="game-entry--row__status">
                        {game.gameStatus}
                    </span>
                    <span class="game-entry--row__players">
                        {game.numberOfPlayers}
                    </span>
                </div>
            )}     
        </React.Fragment>
    )
}
