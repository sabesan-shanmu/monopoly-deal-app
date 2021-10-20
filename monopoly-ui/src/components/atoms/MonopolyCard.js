import React,{useState} from 'react'
import styled from 'styled-components'
import { device } from '../../common/devices';

const StyledCard = styled.img`

    @media ${device.xlarge} {
        height:250px;
    }

    @media ${device.large} { 
        height:250px;
    }
    @media ${device.medium} { 
        height:200px;

    }
    @media ${device.small} { 
        height:150px;  
    }
`;



export const MonopolyCard = ({gameCard,onSelect}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    console.log(isLoaded);
    return (
        <React.Fragment>
                <StyledCard src={gameCard.card.cardImageUrl}
                    style={{ visibility: isLoaded ? "visible" : "hidden" }}
                    onLoad={() => {
                        setIsLoaded(true);
                    }}
                />
        </React.Fragment>
    )
}

