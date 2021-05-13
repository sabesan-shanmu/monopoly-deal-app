import React from "react"
import {PlayerCharacter} from '../../components/molecules/PlayerCharacter'


export default{ 
    component:PlayerCharacter,
    title:'Molecules/PlayerCharacter'
}

const Template = (args) => <PlayerCharacter {...args} />;


export const Default = Template.bind({})
Default.args = {
    playerName: 'Test',
    playerGameOrder:'1',
    imageId:'1'
}
