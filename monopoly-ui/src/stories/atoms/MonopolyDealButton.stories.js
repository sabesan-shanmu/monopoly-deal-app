import React from 'react'
import {MonopolyDealButton} from '../../components/atoms/MonopolyDealButton'


export default {
    component:MonopolyDealButton,
    title:'Atoms/Button'
}

const Template = (args) => <MonopolyDealButton {...args} />;


export const Default = Template.bind({});
Default.args = {
    label: 'Button'
}