import React from 'react'
import styled from 'styled-components'


const StyledGameBoardArea = styled.div`
    display:grid;
    grid-template-columns:repeat(3,1fr);
    grid-template-rows:repeat(4,1fr);
    &>div{
        background-color:red;
        border:1px solid black;
        color:white;
        min-width:500px;
        min-height:400px;
    }
`;



export const GameBoardArea = () => {
    return (
        <StyledGameBoardArea>
            <div>block1</div>
            <div>block2</div>
            <div>block3</div>
            <div>block4</div>
            <div>block5</div>
            <div>block6</div>
            <div>block7</div>
            <div>block8</div>
            <div>block9</div>
            <div>block10</div>
            <div>block11</div>
            <div>block12</div>
            
        </StyledGameBoardArea>
    )
}
