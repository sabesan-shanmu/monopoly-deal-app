import React from "react"
import {PlayerAvatar} from '../../components/molecules/PlayerAvatar'
import {NewGameMenu} from '../../components/molecules/NewGameMenu'


export default{ 
    component:PlayerAvatar,
    title:'Molecules/PlayerAvatar'
}

const Template = (args) => <PlayerAvatar {...args} />;


export const Default = Template.bind({})
Default.args = {
    playerName: 'Test',
    playerGameOrder:'1',
    imageId:'1'
}
