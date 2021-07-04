import React,{useContext} from 'react'
import PropTypes from 'prop-types'
import {MonopolyDealButton} from '../atoms/MonopolyDealButton'
import {GameStatus} from '../atoms/GameStatus'
import styled from 'styled-components'
import {device} from "../../common/devices";
import {useHistory} from 'react-router-dom'
import {getTotalNumberofExpectedPlayers} from '../../common/GameHelpers'
import {GameContext} from '../../context/GameContext'
import {ActionTypes} from "../../common/constants"

const StyledGameEntries = styled.div`
{
    display:grid;
    grid-template-columns: 1fr;
    cursor: pointer;
    grid-template-areas: 
    'header'
    'content';
    overflow-y: scroll;
}`;
/*HEADER*/
const StyledHeader = styled.div`
    grid-area: header;
    display:grid;
    grid-template-columns: 2fr 2fr 2fr 1fr;
    position: sticky;
    top: 0;
`;

const StyledGameEntryColHeader = styled.div`
    background-color:#C70000;
    color:white;
    border:1px solid white;
    padding: 4px;
    font-size:1.35em;
    word-break: break-word;
`;
/*Content*/
const StyledContent = styled.div`
    grid-area: content;
    display:grid;
    grid-template-columns: 2fr 2fr 2fr 1fr;
    max-height:300px;
`;

const StyledGameEntryCell = styled.div`
    border:1px solid black;
    background-color: white;
    color:black;
    padding: 4px;
    font-size:1.35em;
    word-break: break-word;
`;  
const StyledGameSelectionCell = styled.div`
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
    const {gameState,gameDispatch} = useContext(GameContext);

    return (
        <StyledGameEntries>
            <StyledHeader>
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
            </StyledHeader>
            <StyledContent>
                {games && games.map((game,key)=>
                    <React.Fragment  key={key}>  
                        <StyledGameEntryCell>
                            {game.name}
                        </StyledGameEntryCell>
                        <StyledGameEntryCell>
                            <GameStatus gameStatus={game.gameStatus} />   
                        </StyledGameEntryCell>
                        <StyledGameEntryCell>
                            {game.numberOfPlayers}/{getTotalNumberofExpectedPlayers(game.gameMode)}
                        </StyledGameEntryCell>    
                        <StyledGameSelectionCell>
                            <MonopolyDealButton label="Select" 
                                onClick={()=>{
                                    gameDispatch({type:ActionTypes.CreateResource,game:game,errors:null});
                                    history.push(`/${game.gamePassCode}/join-game`);
                                }} 
                                />
                        </StyledGameSelectionCell>  
                    </React.Fragment>
                )} 
                {games && games.length == 0 &&
                    <StyledNoGameRow>
                        No Games
                    </StyledNoGameRow>
                }   
            </StyledContent>          
        </StyledGameEntries>
    )
}

GameEntries.propTypes = {
    games:PropTypes.array,
};
  
