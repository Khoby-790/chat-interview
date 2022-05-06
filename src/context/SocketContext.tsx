import React, { useContext } from 'react'
import { Socket } from 'socket.io-client'
import { socket } from '../socket/socket-client'

type SocketProps = {
    socket: Socket
}

const SocketContext = React.createContext<SocketProps>({
    socket: socket
})

export const useSocket = () => useContext(SocketContext);

type Props = {
    children: React.ReactNode
}

const SocketProvider = (props: Props) => {
    return (
        <SocketContext.Provider value={{ socket }}>
            {props.children}
        </SocketContext.Provider>
    )
}

export default SocketProvider