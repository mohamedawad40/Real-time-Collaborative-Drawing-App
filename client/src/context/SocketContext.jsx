import { createContext, useEffect, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
    const { user } = useSelector(state => state.auth);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!user) return;
        const sock = io('http://localhost:3000', {
            auth: { token: localStorage.getItem('token') }
        });
        setSocket(sock);
        return () => sock.disconnect();
    }, [user]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => useContext(SocketContext);
