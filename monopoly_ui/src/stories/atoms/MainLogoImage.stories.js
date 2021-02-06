import React from 'react'
import {MainLogoImage} from '../../components/atoms/MainLogoImage'


export default {
    component:MainLogoImage,
    title:'Atoms/Main logo',
}

const Template = (args) => <MainLogoImage {...args} />;

export const Default = Template.bind({});
Default.args = {
    size: 'large'
}






