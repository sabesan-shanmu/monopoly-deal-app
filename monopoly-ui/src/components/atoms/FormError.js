import React from 'react'
import styled from 'styled-components'
import errorIcon from '../../assets/img/error_icon.png'

const StyledError = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    background-color:#f8b2b2;
    font-weight:bold;
    font-size:1.35em;
    line-height: 1.35em;
    color:#5b1313;
    border: 1px solid #5b1313;
    padding:2px;
    width:100%;
    &>img {
        margin-right:2px;
    }
`;

const constructMessage = (errors) =>{
    console.log(errors);
    switch(errors.name){
        case "ValidationError":
            return typeof errors.message === 'object' && errors.message !== null? 
            Object.keys(errors.message).map(error=>error+":"+errors.message[error].join(",") ).join(" ")
            :errors.message;
        case "DBIntegrityError":
            return "Already exists, please try a different name";
        default:
            return errors.message;
    }
}


export const FormError = ({errors}) => {
     
    return (
        <StyledError>
            <img src={errorIcon} />
            <div>
                {constructMessage(errors)}
            </div>
        </StyledError>
    )
}
