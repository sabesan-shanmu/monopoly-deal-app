import React,{useState} from 'react'
import styled,{keyframes,css} from 'styled-components'
import PropTypes from 'prop-types';
import { device } from '../../common/devices';
import { CardTypeEnum } from '../../common/constants';
import faceDownCardImg from '../../assets/img/face-down-card.jpg' 



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
    width:127px;
    opactiy:0.5;
    background: rgba(0,0,0,0.3);
    @media ${device.xlarge} {
        height:200px;
    }

    @media ${device.large} { 
        height:200px;
    }
    @media ${device.medium} { 
        height:200px;

    }
    @media ${device.small} { 
        height:150px;  
    }
`;

const StyledCard = styled.img`
    ${props => props.isPlayerDrawingCard ? css`
        animation: ${bounce} 1.3s linear infinite;  
    `:
    css`
        &:hover {
            animation: ${bounce} 1.3s linear infinite; 
        }
    `
    }
    
    cursor:pointer;
    border:3px solid black;
    @media ${device.xlarge} {
        height:200px;
    }

    @media ${device.large} { 
        height:200px;
    }
    @media ${device.medium} { 
        height:200px;

    }
    @media ${device.small} { 
        height:150px;  
    }
`;



export const MonopolyCard = ({gameCard,onClick,cardType,isPlayerDrawingCard}) => {
    const [isLoaded, setIsLoaded] = useState(false);
   
    return (
        <React.Fragment>
                    {cardType == CardTypeEnum.FaceUpCard && 
                        <StyledCard src={gameCard.card.cardImageUrl}
                            style={{ visibility: isLoaded ? "visible" : "hidden" }}
                            onLoad={() => {
                                setIsLoaded(true);
                            }}
                        />
                    }
                    {cardType ==CardTypeEnum.MiniFaceDownCard &&
                        <StyledMiniCard src={faceDownCardImg} />
                    }
                    {cardType ==CardTypeEnum.FaceDownCard &&
                        <StyledCard src={faceDownCardImg} isPlayerDrawingCard={isPlayerDrawingCard} />
                    }
                    {cardType ==CardTypeEnum.PlaceholderCard &&
                        <StyledNoCard />
                    }
        </React.Fragment>
    )
}

  
MonopolyCard.defaultProps = {
    isPlayerDrawingCard:false
};

