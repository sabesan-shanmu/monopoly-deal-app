import React from "react"
import {NewGameMenu} from '../../components/organisms/NewGameMenu'



export default{ 
    component:NewGameMenu,
    title:'Organisms/ New Game Menu'
}

const Template = (args) => <NewGameMenu {...args} />;


export const Default = Template.bind({})

