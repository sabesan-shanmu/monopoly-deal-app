import React from "react"
import {GameTitleMenu} from '../../components/organisms/GameTitleMenu'



export default{ 
    component:GameTitleMenu,
    title:'Organisms/Game Title Menu'
}

const Template = (args) => <GameTitleMenu {...args} />;


export const Default = Template.bind({})

