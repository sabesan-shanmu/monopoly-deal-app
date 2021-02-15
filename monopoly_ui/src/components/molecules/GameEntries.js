import React from 'react'
import PropTypes from 'prop-types'
import {MonopolyDealButton} from '../atoms/MonopolyDealButton'
import styled from 'styled-components'
import {device} from "../../common/devices";


const StyledGameEntries = styled.div`
{
    display:grid;
    grid-template-columns: 2fr 2fr 2fr 1fr;
    cursor: pointer;
    overflow-y: scroll;
    

    @media ${device.desktop} {
        font-size:20px;
        max-width: 600px;
    }
      
    @media ${device.tablet} { 
        font-size:18px;
        max-width: 450px;
    }
  
    @media ${device.mobile} { 
        font-size:12px;
        max-width: 250px;
    } 
}`;

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

export const GameEntries = ({games,onClick,...props}) => {


    const select = {
        onClick:null,
        label:"Join"
    }
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
                
            </StyledGameEntryColHeader>
            
            {games && games.map((game,key)=>
                <React.Fragment>
                    <StyledGameEntryCell>
                        {game.title}
                    </StyledGameEntryCell>
                    <StyledGameEntryCell>
                        {game.gameStatus}
                    </StyledGameEntryCell>
                    <StyledGameEntryCell>
                        {game.numberOfPlayers}
                    </StyledGameEntryCell>    
                    <StyledGameEntryCell>
                        <MonopolyDealButton {...select} />
                    </StyledGameEntryCell>    
                </React.Fragment>
            )} 
            
        </StyledGameEntries>
    )
}

GameEntries.propTypes = {
    games:PropTypes.array,
};
  
