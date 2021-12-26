import React,{useState} from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { Popover } from 'react-tiny-popover'
import { CharacterImage } from '../atoms/CharacterImage';
import {getBackgroundColour} from '../../common/ImageHelpers'
import { MonopolyCard } from '../atoms/MonopolyCard';
import { CardTypeEnum } from '../../common/constants';
import {SelectionMovePlayerPopoverContent} from '../atoms/SelectionMovePlayerPopoverContent';

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
    margin:3px;
    ${({isGameBoard})=>isGameBoard?'&:hover {border: 3px solid #5DE23C;}':''}
    cursor:${(props) =>!props.isGameBoard?'':props.isSelectable==true? 'pointer':'not-allowed' };
`;

export const PlayerCharacter = ({playerId,playerName,imageId,numberOfCardsOnHand,playerGameOrder,isGameBoard=false,isSelectable=false,listOfPossibleMoves=[],...props}) => { 

    const [isPopoverOpen,setIsPopoverOpen] = useState(false);
    const cards = [...Array(numberOfCardsOnHand).keys()]
  
    return (
        <Popover
            isOpen={isPopoverOpen}
            positions={['top']} 
            padding={10} 
            reposition={false} 
            onClickOutside={() => setIsPopoverOpen(false)} 
            content={({ position, nudgedLeft, nudgedTop }) => {
                
                return <SelectionMovePlayerPopoverContent selectedPlayerId={playerId} setIsPopoverOpen={setIsPopoverOpen} listOfPossibleMoves={listOfPossibleMoves} />
    
            }}
        >
            <StyledPlayerCharacter imageId={imageId} isGameBoard={isGameBoard} isSelectable={isSelectable}  onClick={()=>{isSelectable &&  setIsPopoverOpen(true)}}>
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
        </Popover>
    )
}


PlayerCharacter.propTypes = {
    playerName:PropTypes.string,
    playerGameOrder:PropTypes.oneOf([1,2,3,4,5,6,7,8,9,10,11,12]),
    imageId:PropTypes.oneOf([1,2,3,4,5,6,7,8,9,10,11,12]),
};

