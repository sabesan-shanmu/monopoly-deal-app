import React from 'react'
import styled from 'styled-components'
import {device} from "../../common/devices"; 
import img from "../../assets/img/backgrounds/modal-background.jpg";


export const StyledMenuContainer = styled.div`
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
    height:60%;

    @media ${device.xlarge}{
        max-width: 600px;
        max-height:350px;
        min-height:300px;
    }
      
    @media ${device.large}{ 
        max-width: 450px;
        max-height:250px;
        min-height:250px;
    }
  
    @media ${device.medium}{ 
        max-width: 450px;
        max-height:250px;
        min-height:200px;
    }

    @media ${device.small}{ 
        max-width: 300px;
        max-height:200px;
        min-height:150px;
    } 
`;


