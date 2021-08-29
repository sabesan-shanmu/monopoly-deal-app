import React from 'react'
import styled from 'styled-components'
import cancelImg from '../../assets/img/cancel.png'
import undecidedImg from '../../assets/img/undecided.png'
import checkedImg from '../../assets/img/checked.png' 
import {VoteStatusEnum} from '../../common/constants'



const voteStatusList = [
    {
        name:"Not Ready",
        image:cancelImg,
        value:VoteStatusEnum.Declined
    },
    {
        name:"Undecided",
        image:undecidedImg,
        value:VoteStatusEnum.Undecided
    },
    {
        name:"Ready",
        image:checkedImg,
        value:VoteStatusEnum.Accepted
    }

]

const isSelected = ({selectedVoteStatusId,voteStatusId}) =>{
    return selectedVoteStatusId == voteStatusId ?"1":"0.4"
}

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    word-break: normal;
    opacity:${(props) => isSelected(props)};

`;


export const PlayerVoteStatus = ({voteStatusId}) => {
    console.log(voteStatusId);
    return (
        <React.Fragment>
            {voteStatusList.map((vote,key)=>
                <StyledDiv selectedVoteStatusId={voteStatusId} voteStatusId={vote.value}>
                    {vote.name} <img src={vote.image} />
                </StyledDiv>            
            )} 
        </React.Fragment>
    )
}
