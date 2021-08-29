import React from 'react'
import styled from 'styled-components'
import cancelImg from '../../assets/img/cancel.png'
import undecidedImg from '../../assets/img/undecided.png'
import checkedImg from '../../assets/img/checked.png' 
import {VoteStatusEnum} from '../../common/constants'





const StyledDiv = styled.div`
display: flex;
align-items: center;
word-break: normal;
`;


export const PlayerVoteStatus = ({voteStatusId}) => {
    console.log(voteStatusId);
    return (
        <React.Fragment>
            {voteStatusId == VoteStatusEnum.Declined &&
                <StyledDiv>
                    Not Ready <img src={cancelImg} />
                </StyledDiv>
            }
            {voteStatusId == VoteStatusEnum.Undecided &&
                <StyledDiv>
                    Undecided <img src={undecidedImg} />
                </StyledDiv>
            }
            {voteStatusId == VoteStatusEnum.Accepted &&
                <StyledDiv>
                    Ready <img src={checkedImg} />
                </StyledDiv>
            }
        </React.Fragment>
    )
}

