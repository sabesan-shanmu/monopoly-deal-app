import React from "react"
import {SelectGameMenu} from '../../components/organisms/SelectGameMenu'



export default{ 
    component:SelectGameMenu,
    title:'Organisms/ Select Game Menu'
}


const Template = (args) => <SelectGameMenu {...args} />;

export const Default = Template.bind({})

const games = [
    {title:"hello",gameStatus:"completed",numberOfPlayers:3},
    {title:"hello",gameStatus:"completed",numberOfPlayers:3},
    {title:"hello",gameStatus:"completed",numberOfPlayers:3},
    {title:"hello",gameStatus:"completed",numberOfPlayers:3},
    {title:"hello",gameStatus:"completed",numberOfPlayers:3},
    {title:"hello",gameStatus:"completed",numberOfPlayers:3},
    {title:"hello",gameStatus:"completed",numberOfPlayers:3},
    {title:"hello",gameStatus:"completed",numberOfPlayers:3},
    {title:"hello",gameStatus:"completed",numberOfPlayers:3},
    {title:"hello",gameStatus:"completed",numberOfPlayers:3},
    {title:"hello",gameStatus:"completed",numberOfPlayers:3},
    {title:"hello",gameStatus:"completed",numberOfPlayers:3}
];
Default.args = {
    games:games
}
