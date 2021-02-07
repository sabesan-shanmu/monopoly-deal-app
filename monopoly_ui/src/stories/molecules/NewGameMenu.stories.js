import React from "react"
import {NewGameMenu} from '../../components/molecules/NewGameMenu'



export default{ 
    component:NewGameMenu,
    title:'Molecules/ New Game Menu'
}

const Template = (args) => <NewGameMenu {...args} />;


export const Default = Template.bind({})

