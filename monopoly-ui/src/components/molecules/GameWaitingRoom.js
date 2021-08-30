import React,{useContext} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {GameContext} from '../../context/GameContext'
import {ActionTypes} from "../../common/constants"
import {PlayerCharacter} from './PlayerCharacter'
import {PlayerVoteStatus} from '../atoms/PlayerVoteStatus'

const StyledPlayerEntries = styled.div`
{
    display:grid;
    grid-template-columns: 2fr 1fr;
    overflow-y: scroll;
}`;


const StyledPlayerEntryColHeader = styled.div`
    background-color:#C70000;
    color:white;
    border:1px solid white;
    padding: 4px;
    font-size:1.35em;
    word-break: break-word;
    position: sticky;
    top: 0;
    z-index:1;
`;


const StyledPlayerEntryCell = styled.div`
    border:1px solid black;
    background-color: white;
    color:black;
    padding: 4px;
    font-size:1.35em;
    word-break: break-word;
   
`;  



export const GameWaitingRoom = ({players,...props}) => {


    return (
        <StyledPlayerEntries>
            
                <StyledPlayerEntryColHeader>
                    Players
                </StyledPlayerEntryColHeader>
                <StyledPlayerEntryColHeader>
                    Vote Status
                </StyledPlayerEntryColHeader>
                       
                {players && players.map((player,key)=>
                    <React.Fragment  key={key}>  
                        <StyledPlayerEntryCell>
                            <PlayerCharacter {...player}/>
                        </StyledPlayerEntryCell>
                        <StyledPlayerEntryCell>
                            <PlayerVoteStatus voteStatusId={player.voteStatusId} />
                        </StyledPlayerEntryCell>
                    </React.Fragment>
                )}   
        </StyledPlayerEntries>
    )
}

GameWaitingRoom.propTypes = {
    players:PropTypes.array,
};
  
