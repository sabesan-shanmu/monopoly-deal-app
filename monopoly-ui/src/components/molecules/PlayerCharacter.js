import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import {device} from "../../common/devices";
import { CharacterImage } from '../atoms/CharacterImage';
import {getBackgroundColour} from '../../common/ImageHelpers'
import { MonopolyCard } from '../atoms/MonopolyCard';
import { CardTypeEnum } from '../../common/constants';

const StyledCardCounter = styled.div`
    display:flex;
    overflow-x:auto;
    align-self: center;
    max-width: 170px;
    &>img{
        margin:2px;
    }
`;


const StyledPlayerCharacter = styled.section`
    display:grid;
    grid-template-columns: 1fr 2fr;
    background-color:${({imageId})=>getBackgroundColour(imageId,"secondary")};
    color:${({imageId})=>getBackgroundColour(imageId,"text")};
    background-size: cover;
    word-break: break-word;
    border: 2px solid black;
    border-radius: 5px;
    max-width: 280px;
    align-items: center;
    font-size:0.95em;
    line-height:1.35em;
`;

export const PlayerCharacter = ({playerName,imageId,numberOfCardsOnHand,playerGameOrder,isGameBoard=false,...props}) => { 


    const cards = [...Array(numberOfCardsOnHand).keys()]

    return (
        <StyledPlayerCharacter imageId={imageId}>
            <CharacterImage imageId={imageId}/>
            <div>
                <div>Player Name:{playerName}</div>
                <div>Game Order:{playerGameOrder}</div>
                {isGameBoard &&
                    <div>Cards on Hand:</div>
                } 
                <StyledCardCounter>
                    {isGameBoard &&
                        cards.map((card,key)=>
                            <MonopolyCard cardType={CardTypeEnum.MiniFaceDownCard}   key={key} />
                        )
                    }
                </StyledCardCounter>
            </div>   
        </StyledPlayerCharacter>
    )
}


PlayerCharacter.propTypes = {
    playerName:PropTypes.string,
    playerGameOrder:PropTypes.oneOf([1,2,3,4,5,6,7,8,9,10,11,12]),
    imageId:PropTypes.oneOf([1,2,3,4,5,6,7,8,9,10,11,12]),
};

