import React,{createContext,useState,useEffect} from 'react'
import {io} from 'socket.io-client'



export const SocketContext = createContext();

export const SocketContextProvider  = ({children}) => {

    // Create the connection once; creating it in the render body opened a new socket on every render
    const [socket] = useState(() => io.connect(process.env.REACT_APP_API_BASE_URL,
        {
            transports: ['websocket']
        }
    ));

    useEffect(() => {
        const onConnectError = (error) => {
            console.log(`connect_error due to ${error.message}`);
        };
        socket.on("connect_error", onConnectError);
        return () => {
            socket.off("connect_error", onConnectError);
            socket.disconnect();
        };
    }, [socket]);

    return (
        <SocketContext.Provider
            value={{socket}}
        >
            {children}
        </SocketContext.Provider>
    )
}
