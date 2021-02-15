import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import {device} from "../../common/devices";
import { CharacterImage } from '../atoms/CharacterImage';


const getBackGroundColour=(imageId)=>{

    const background = {
        1:"#bf1818",
        2:"#171616ad",
        3:"#5f1818",
        4:"#f3da05",
        5:"#ffc107",
        6:"#8bc34a",
        7:"#ff9800",
        8:"#99d5f1",
        9:"#f5f5f5",
        10:"#ca47ca",
        11:"#5e93d6",
        12:"#735757c9"
    };
    return background[imageId];
}



const StyledPlayerAvatar = styled.section`
    display:grid;
    grid-template-columns: 2fr 1fr;
    background-color:${({imageId})=>getBackGroundColour(imageId)};
    background-size: cover;
`;

export const PlayerAvatar = ({playerName,imageId,numberOfCardsOnHand,playerGameOrder,...props}) => { 

    return (
        <StyledPlayerAvatar imageId={imageId}>
            <CharacterImage imageId={imageId}/>
            <div>
                <div>Player Name:{playerName}</div>
                <div>Game Order:{playerGameOrder}</div>
                <div>{/** add {numberOfCardsOnHand} of Cards  */}</div>
            </div>   
        </StyledPlayerAvatar>
    )
}


PlayerAvatar.propTypes = {
    playerName:PropTypes.string,
    playerGameOrder:PropTypes.oneOf(["1","2","3","4","5","6","7","8","9","10","11","12"]),
    imageId:PropTypes.oneOf(["1","2","3","4","5","6","7","8","9","10","11","12"])
};

