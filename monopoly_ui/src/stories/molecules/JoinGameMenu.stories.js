import React from "react"
import {JoinGameMenu} from '../../components/molecules/JoinGameMenu'



export default{ 
    component:JoinGameMenu,
    title:'Molecules/ Join Game Menu'
}


const Template = (args) => <JoinGameMenu {...args} />;

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
