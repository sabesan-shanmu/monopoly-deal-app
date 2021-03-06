import React from 'react'
import {MonopolyDealInputField} from '../../components/atoms/MonopolyDealInputField'


export default  {
    component:MonopolyDealInputField,
    title:'Atoms/Input'
}


const Template = (args)=> <MonopolyDealInputField {...args} />


export const Text = Template.bind({});
Text.args = {
    label: 'Text:',
    mode:'text',
    placeholder:'Enter Text'
}

export const Password = Template.bind({});
Password.args = {
    label: 'Password:',
    mode:'password',
    placeholder:'Enter password'
}