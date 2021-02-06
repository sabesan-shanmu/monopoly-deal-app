import React from 'react'
import {MonopolyDealInputField} from '../components/atoms/MonopolyDealInputField'


export default  {
    component:MonopolyDealInputField,
    title:'Atoms/Input'
}


const Template = (args)=> <MonopolyDealInputField {...args} />


export const Input = Template.bind({});
Input.args = {
    label: 'Text:',
    mode:'text'
}

export const Password = Template.bind({});
Password.args = {
    label: 'Password:',
    mode:'password'
}