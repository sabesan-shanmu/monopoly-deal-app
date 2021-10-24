import React,{useContext,createContext,useReducer,useEffect} from 'react'
import { SocketContext } from './SocketContext';
import { GameContext } from './GameContext';


export const GameMoveContext = createContext();

const gameMoveInitState = {
    gameMove:null,
    errors:null
  };
  


const gameMoveReducer =  ()  =>{

}


export const GameMoveContextProvider = ({children}) => {

    const [gameMoveState,gameMoveDispatch] = useReducer(gameMoveReducer,gameMoveInitState)
    const {socket} = useContext(SocketContext); 
    const {gameState,gameDispatch}  = useContext(GameContext);

    console.log("game Move context")


    useEffect(() => {
        let isMounted=true;
        
        return () => {
            isMounted=false
        }
    }, [])


    return (
        <GameMoveContext.Provider
            value={{gameMoveState,gameMoveDispatch}}>
            {children}
        </GameMoveContext.Provider>
    )
}
