import React from 'react'
import PropTypes from 'prop-types'
import {MonopolyDealButton} from '../atoms/MonopolyDealButton'
import {GameStatus} from '../atoms/GameStatus'
import styled from 'styled-components'
import {device} from "../../common/devices";
import {useHistory} from 'react-router-dom'

const StyledGameEntries = styled.div`
{
    display:grid;
    grid-template-columns: 2fr 2fr 2fr 1fr;
    cursor: pointer;
    overflow-y: scroll;
    

    @media ${device.xlarge} {
        font-size:20px;
        max-width: 600px;
    }
      
    @media ${device.medium} { 
        font-size:18px;
        max-width: 450px;
    }
    
    @media ${device.small} { 
        font-size:8px;
        max-width: 250px;
    } 
}`;
/*TODO: Fixing header to the top */
const StyledGameEntryColHeader = styled.div`
    background-color:#C70000;
    color:white;
    border:1px solid white;
    padding: 4px;
`;

const StyledGameEntryCell = styled.div`
    border:1px solid black;
    background-color: white;
    color:black;
    padding: 4px;
`;

const StyledNoGameRow = styled.div`
    border:1px solid black;
    background-color: white;
    color:black;
    padding: 4px;
    grid-column: 1 / span 4;
    display:grid;
    justify-content:center;
`;

export const GameEntries = ({games,...props}) => {

    const history = useHistory();

    return (
        <StyledGameEntries>
            <StyledGameEntryColHeader>
                Game Name
            </StyledGameEntryColHeader>
            <StyledGameEntryColHeader>
                Game Status
            </StyledGameEntryColHeader>
            <StyledGameEntryColHeader>
                Number of Players
            </StyledGameEntryColHeader>
            <StyledGameEntryColHeader>
                {/* empty column header for button */}
            </StyledGameEntryColHeader>
            
            {games && games.map((game,key)=>
                <React.Fragment  key={key}>
                    <StyledGameEntryCell>
                        {game.name}
                    </StyledGameEntryCell>
                    <StyledGameEntryCell>
                        <GameStatus gameStatus={game.gameStatus} />   
                    </StyledGameEntryCell>
                    <StyledGameEntryCell>
                        {game.numberOfPlayers}
                    </StyledGameEntryCell>    
                    <StyledGameEntryCell>
                        <MonopolyDealButton label="Select" onClick={()=>{history.push(`${game.gamePassCode}/join-game`)}} />
                    </StyledGameEntryCell>    
                </React.Fragment>
            )} 
            {games && games.length == 0 &&
                <React.Fragment>
                    <StyledNoGameRow>
                        No Games
                    </StyledNoGameRow>
                </React.Fragment>
            }
            
        </StyledGameEntries>
    )
}

GameEntries.propTypes = {
    games:PropTypes.array,
};
  
