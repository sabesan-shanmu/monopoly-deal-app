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
        5:"#B87A1B",
        6:"#8BC34A",
        7:"#F97E3A",
        8:"#4C92CC",
        9:"#ECE3E3",
        10:"#CA47CA",
        11:"#A9A9A9",
        12:"#FAD61D"
    };
    return background[imageId];
}



const StyledPlayerCharacter = styled.section`
    display:grid;
    grid-template-columns: 2fr 1fr;
    background-color:${({imageId})=>getBackGroundColour(imageId)};
    background-size: cover;
    border: 2px solid black;
    border-radius: 5px;
`;

export const PlayerCharacter = ({playerName,imageId,numberOfCardsOnHand,playerGameOrder,...props}) => { 

    return (
        <StyledPlayerCharacter imageId={imageId}>
            <CharacterImage imageId={imageId}/>
            <div>
                <div>Player Name:{playerName}</div>
                <div>Game Order:{playerGameOrder}</div>
                <div>{/** add {numberOfCardsOnHand} of Cards  */}</div>
            </div>   
        </StyledPlayerCharacter>
    )
}


PlayerCharacter.propTypes = {
    playerName:PropTypes.string,
    playerGameOrder:PropTypes.oneOf(["1","2","3","4","5","6","7","8","9","10","11","12"]),
    imageId:PropTypes.oneOf(["1","2","3","4","5","6","7","8","9","10","11","12"])
};

