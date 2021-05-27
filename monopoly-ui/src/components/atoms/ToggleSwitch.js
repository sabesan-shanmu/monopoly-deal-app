import React from 'react'
import styled from 'styled-components'

const StyleToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  >input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  

`;


export const ToggleSwitch = () => {

    return (
        <label class="switch">
            <input type="checkbox"/>
            <span class="slider"></span>
        </label>
    )
}

