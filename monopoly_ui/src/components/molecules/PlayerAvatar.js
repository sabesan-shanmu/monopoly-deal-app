import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import {device} from "../../common/devices";
import { CharacterImage } from '../atoms/CharacterImage';


const getBackGroundColour=(imageId)=>{

    const background = {
        1:"#FF2323BF",
        2:"#C4A8FF",
        3:"#D12531",
        4:"#FCE029",
        5:"#E19720",
        6:"#8BC34A",
        7:"#F26F03",
        8:"#4C92CC",
        9:"#F5F5F5",
        10:"#CA47CA",
        11:"#3366CC",
        12:"#B87A1B"
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

