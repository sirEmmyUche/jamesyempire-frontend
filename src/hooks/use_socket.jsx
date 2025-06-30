// useWebSocket.js
import { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

const useWebSocket = (url, options) => {
    const socketRef = useRef(null);
    const [connected, setConnected] = useState('');

    useEffect(() => {
        socketRef.current = io(url, {
            ...options,
            // reconnectionAttempts: 3, // prevent infinite loop
            // reconnectionDelay: 3000, // delay between attempts
        });

        socketRef.current.on('connect', async () => {
            setConnected('connected');
        });

        socketRef.current.on('join-room', async () => {
            socketRef.current.join('default-room')
            setConnected('joined room');
        });

        socketRef.current.on('connect_error', (err) => {
            console.error('Connection failed:', err?.message || err);
             setConnected('connection error');

            // Check for auth-related error
            // const message = err?.message || '';
            // if (message.includes('token') || message.includes('auth')) {
            //     setConnected(message);
            //     // socketRef.current.disconnect(); // prevent loop
            // } else {
            //     setConnected('connection error');
            // }
        });

        socketRef.current.on('disconnect', () => {
            setConnected('disconnected');
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [url, JSON.stringify(options)]);

    const emit = async (event, data) => {
        try{
            if (socketRef.current) {
                socketRef.current.emit(event, data);
            }
        }catch(error){
            console.error('socket-emit-event-error',error)
        }
    };

    const on = async(event, callback) => {
        try{
             if (socketRef.current) {
                 socketRef.current.on(event, callback);
            }
        }catch(error){
            console.error('socket-on-event-error:',error)
        }
    };

    return {connected, emit, on };
};

export default useWebSocket;