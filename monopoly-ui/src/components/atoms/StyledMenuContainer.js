import React from 'react'
import styled from 'styled-components'
import {device} from "../../common/devices"; 
import img from "../../assets/img/backgrounds/modal-background.jpg";


export const StyledMenuContainer = styled.main`
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
    padding: 10px;
    background-image: url(${img});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border:2px solid black;
    border-radius:5px;
    

    @media ${device.desktop}{
        max-width: 600px;
        max-height:350px;
    }
      
    @media ${device.tablet}{ 
        max-width: 450px;
        max-height:250px;
    }
  
    @media ${device.mobile}{ 
        max-width: 300px;
        max-height:200px;
    } 
`;


