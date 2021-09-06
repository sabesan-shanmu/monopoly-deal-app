import React from 'react'
import styled from 'styled-components'
import cancelImg from '../../assets/img/cancel.png'
import undecidedImg from '../../assets/img/undecided.png'
import checkedImg from '../../assets/img/checked.png' 
import {VoteStatusEnum} from '../../common/constants'
import { v4 as uuidv4 } from 'uuid';


const voteStatusList = [
    {
        name:"Not Ready",
        image:cancelImg,
        value:VoteStatusEnum.Declined,
        backgroundColour:"#ff6150"
    },
    {
        name:"Undecided",
        image:undecidedImg,
        value:VoteStatusEnum.Undecided,
        backgroundColour:"#fda450"
    },
    {
        name:"Ready",
        image:checkedImg,
        value:VoteStatusEnum.Accepted,
        backgroundColour:"#6ee6b2"
    }

]

const getBackgroundColour = ({voteStatusId}) =>{
    return voteStatusList.find(vote=>vote.value == voteStatusId).backgroundColour;
}

const getOpacity = ({selectedVoteStatusId,voteStatusId}) =>{
    return selectedVoteStatusId == voteStatusId?"1":"0.5";
}



const StyledContent = styled.fieldset`
    display:flex;
    flex-direction: ${({flexDirection}) => flexDirection};
    border:none;
`

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    word-break: normal;
    >input~ label {
        opacity:${(props) => getOpacity(props)};
    }
   
    >input:not([disabled]) ~ label {
        opacity:${(props) => getOpacity(props)};
        margin:5px;
        background-color: ${(props) => getBackgroundColour(props)};
        border:1px solid black;
        border-radius: 0.5em;
        padding:2px;
        cursor:pointer;
    }
   
     
    
`;
const StyledRadio = styled.input`
    position: absolute;
    opacity: 0;
`;

const StyledLabel = styled.label`
    display:flex;
    flex-direction:row;
    align-items:center;
`;


export const PlayerVoteStatus = ({voteStatusId,onChange,flexDirection,disabled}) => {
    const uuid = uuidv4();

    return (
        <StyledContent flexDirection={flexDirection}>
            {voteStatusList.map((vote,key)=>
                <StyledDiv  key={key}  voteStatusId={vote.value}  selectedVoteStatusId={voteStatusId} >
                    {!disabled &&         
                        <StyledRadio type="radio" name={uuid}  id={uuid+key} value={vote.value} onChange={onChange} defaultChecked={vote.value == voteStatusId?"checked":null} />
                    }
                    {disabled &&
                        <StyledRadio type="radio" name={uuid}  id={uuid+key} value={vote.value} defaultChecked={vote.value == voteStatusId?"checked":null} disabled/>
                    }
                    <StyledLabel htmlFor={uuid+key} >{vote.name} <img src={vote.image}/></StyledLabel>
                </StyledDiv>
            )} 
        </StyledContent>
    )
}


PlayerVoteStatus.defaultProps ={
    flexDirection : "column"
} 
