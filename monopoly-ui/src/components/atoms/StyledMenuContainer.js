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
`;


