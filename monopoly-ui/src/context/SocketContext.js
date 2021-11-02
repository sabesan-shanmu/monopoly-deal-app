import React,{createContext} from 'react'
import {io} from 'socket.io-client'



export const SocketContext = createContext();
 
export const SocketContextProvider  = ({children}) => {

    
    const socket = io.connect(process.env.REACT_APP_API_BASE_URL,
        {
           
        }
    );
    
    socket.on("connect_error", (error) => {
        console.log(`connect_error due to ${error.message}`);
    });

 
    
    return (
        <SocketContext.Provider
            value={{socket}}
        >
            {children}
        </SocketContext.Provider>
    )
}
