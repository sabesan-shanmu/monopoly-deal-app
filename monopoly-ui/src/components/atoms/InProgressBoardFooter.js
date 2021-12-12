import React from 'react'
import styled from 'styled-components'
import modalBackgroundImg from "../../assets/img/backgrounds/modal-background.jpg";


export const InProgressBoardFooter = styled.footer`
    position: ${props => props.isFooterVisible ? "sticky" : "sticky"};
    bottom: 0;
    width:95%;
    padding: 5px;
    //background-image: url(${modalBackgroundImg});
    background:#422713;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border:5px solid black;
    border-radius:10px;
    flex-direction:column;
    display: inline-grid;
`;

