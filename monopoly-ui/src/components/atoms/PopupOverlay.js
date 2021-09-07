import React from 'react'
import styled from 'styled-components'


const StyledPopupOverlay = styled.div`
    position:absolute;
    width: 100%; 
    height: 100%; 
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color:#0f09099e; 
    z-index: 2;
    cursor: pointer;
`;

export const PopupOverlay = () => {
    return (
        <StyledPopupOverlay/>
    )
}

