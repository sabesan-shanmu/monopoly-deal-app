import React from 'react'
import {AudioPlayer} from '../../components/atoms/AudioPlayer'


export default {
    component:AudioPlayer,
    title:'Atoms/AudioPlayer',
}

const Template = (args) => <AudioPlayer {...args} />;

export const Default = Template.bind({})