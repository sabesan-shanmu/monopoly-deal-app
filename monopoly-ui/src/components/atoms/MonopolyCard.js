import React,{useState} from 'react'
import styled,{keyframes,css} from 'styled-components'
import PropTypes from 'prop-types';
import { device } from '../../common/devices';
import { CardTypeEnum } from '../../common/constants';
import faceDownCardImg from '../../assets/img/face-down-card.jpg' 
import { Popover } from 'react-tiny-popover'
import {CardPopoverContent} from '../atoms/CardPopoverContent'


const bounce = keyframes`
    20% { transform:translateY(-7%); }
    40% { transform:translateY(0%); }
    40% { transform:translateY(-7%); }
    60% { transform:translateY(0%); }
    80% { transform:translateY(-7%); }
    100% { transform:translateY(0%); }
`;
const StyledMiniCard = styled.img`
    &:hover {
        animation: ${bounce} 1.3s linear infinite;
    }
    cursor:pointer;
    border:1px solid black;
    height:30px;  
    margin:2px;
`;



const StyledNoCard = styled.div`
    width:114px;
    opactiy:0.5;
    background: rgba(0,0,0,0.3);
    @media ${device.xlarge} {
        height:180px;
    }

    @media ${device.large} { 
        height:180px;
    }
    @media ${device.medium} { 
        height:180px;

    }
    @media ${device.small} { 
        height:180px;  
    }
`;

const StyledCard = styled.img`

    &:hover {
        animation: ${bounce} 1.3s linear infinite; 
    }
   
    opacity:${(props) => props.isCardSelectable? '1':'0.4'};
    cursor:${(props) =>props.isCardSelectable? 'pointer':'not-allowed' };
    border:3px solid black;
    @media ${device.xlarge} {
        height:180px;
    }

    @media ${device.large} { 
        height:180px;
    }
    @media ${device.medium} { 
        height:180px;

    }
    @media ${device.small} { 
        height:180px;  
    }
`;



export const MonopolyCard = ({gameCard,onClick,cardType,isCardSelectable=false,listOfPossibleMoves}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPopoverOpen,setIsPopoverOpen] = useState(false);
    console.log("fired");
    return (
        <React.Fragment>
                    {cardType == CardTypeEnum.FaceUpCard && 
                        <Popover
                            isOpen={isPopoverOpen}
                            positions={['top']} 
                            padding={10} 
                            reposition={false} 
                            onClickOutside={() => setIsPopoverOpen(false)} 
                            content={({ position, nudgedLeft, nudgedTop }) => ( 
                                <CardPopoverContent listOfPossibleMoves={listOfPossibleMoves} />
                            )}
                        >
                            <StyledCard src={gameCard.card.cardImageUrl}
                                style={{ visibility: isLoaded ? "visible" : "hidden" }}
                                isCardSelectable={isCardSelectable}
                                onLoad={() => {
                                    setIsLoaded(true);
                                }}
                                onClick={()=>{isCardSelectable &&  setIsPopoverOpen(true)}}
                            />
                        </Popover>
                    }
                    {cardType ==CardTypeEnum.MiniFaceDownCard &&
                        <StyledMiniCard src={faceDownCardImg} />
                    }
                    {cardType ==CardTypeEnum.FaceDownCard &&
                        <StyledCard src={faceDownCardImg} isCardSelectable={isCardSelectable} onClick={onClick}/>
                    }
                    {cardType ==CardTypeEnum.PlaceholderCard &&
                        <StyledNoCard />
                    }
        </React.Fragment>
    )
}

  


