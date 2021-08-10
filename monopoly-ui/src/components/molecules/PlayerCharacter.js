import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import {device} from "../../common/devices";
import { CharacterImage } from '../atoms/CharacterImage';
import {getBackgroundColour} from '../../common/ImageHelpers'





const StyledPlayerCharacter = styled.section`
    display:grid;
    grid-template-columns: 1fr 2fr;
    background-color:${({imageId})=>getBackgroundColour(imageId,"secondary")};
    color:${({imageId})=>getBackgroundColour(imageId,"text")};
    background-size: cover;
    border: 2px solid black;
    border-radius: 5px;
    max-width: 270px;
    
    font-size:0.95em;
    line-height:1.35em;
    &>img{
        margin:2px;
    }
`;

export const PlayerCharacter = ({playerName,imageId,numberOfCardsOnHand,playerGameOrder,...props}) => { 

    return (
        <StyledPlayerCharacter imageId={imageId}>
            <CharacterImage imageId={imageId}/>
            <div>
                <div>Player Name:{playerName}</div>
                <div>Game Order:{playerGameOrder}</div>
            </div>   
        </StyledPlayerCharacter>
    )
}


PlayerCharacter.propTypes = {
    playerName:PropTypes.string,
    playerGameOrder:PropTypes.oneOf([1,2,3,4,5,6,7,8,9,10,11,12]),
    imageId:PropTypes.oneOf([1,2,3,4,5,6,7,8,9,10,11,12]),
};

