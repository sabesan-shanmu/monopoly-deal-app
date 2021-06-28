import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import avatar1 from '../../assets/img/characters/avatar-1.png'
import avatar2 from '../../assets/img/characters/avatar-2.png'
import avatar3 from '../../assets/img/characters/avatar-3.png'
import avatar4 from '../../assets/img/characters/avatar-4.png'
import avatar5 from '../../assets/img/characters/avatar-5.png'
import avatar6 from '../../assets/img/characters/avatar-6.png'
import avatar7 from '../../assets/img/characters/avatar-7.png'
import avatar8 from '../../assets/img/characters/avatar-8.png'
import avatar9 from '../../assets/img/characters/avatar-9.png'
import avatar10 from '../../assets/img/characters/avatar-10.png'
import avatar11 from '../../assets/img/characters/avatar-11.png'
import avatar12 from '../../assets/img/characters/avatar-12.png'
import emptyImage from '../../assets/img/blank.png'
import {getBackgroundColour} from '../../common/ImageHelpers'
import {device} from "../../common/devices";

const StyledCharacterImage = styled.img`
    width:100px;
    height:100px;
    border: 2px solid black;
    border-radius: 5px;
    background-color:${({imageId})=>getBackgroundColour(imageId,"primary")};
    background-size: cover;

    @media ${device.xlarge} { 
        width:80px;
        height:80px;
    }

    @media ${device.large} { 
        width:50px;
        height:50px;
    }

    @media ${device.medium} { 
        width:40px;
        height:40px;
    }

    @media ${device.small} { 
        width:30px;
        height:30px;
    }
`;



export const CharacterImage = ({imageId}) => {
    
    const getImage = (imageId) =>{
        switch(imageId.toString())
        {
            case "1":
                return avatar1;
            case "2":
                return avatar2;
            case "3":
                return avatar3;
            case "4":
                return avatar4;
            case "5":
                return avatar5;
            case "6":
                return avatar6;
            case "7":
                return avatar7;
            case "8":
                return avatar8;
            case "9":
                return avatar9;
            case "10":
                return avatar10;
            case "11":
                return avatar11;
            case "12":
                return avatar12;
            default:
                return emptyImage;
        }
    }

    
    return (
        <StyledCharacterImage imageId={imageId} src={getImage(imageId)}/>
    )
}



  