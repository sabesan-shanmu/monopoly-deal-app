import React from 'react'
import styled from 'styled-components'
import img from "../../assets/img/backgrounds/modal-background.jpg";


export const InProgressBoardFooter = styled.footer`
    position: ${props => props.isFooterVisible ? "absolute" : "sticky"};
    bottom: 0;
    width:90%;
    padding: 5px;
    background-image: url(${img});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border:5px solid black;
    border-radius:10px;
    display:inline-flex;
    flex-direction:column;
    
`;

