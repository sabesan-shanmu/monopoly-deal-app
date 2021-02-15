import React from 'react'
import {GameEntries} from '../../components/molecules/GameEntries'


export default {
    component:GameEntries,
    title:'Molecules/GameEntries',
}

const Template = (args) => <GameEntries {...args} />;

export const Default = Template.bind({})
const test = []
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
