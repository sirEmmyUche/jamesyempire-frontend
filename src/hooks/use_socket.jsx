
import { useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';

const useWebSocket = (url, options) => {
  // useRef holds the socket instance without causing re-renders.
  const socketRef = useRef(null);

  // This effect handles the socket connection lifecycle.
  useEffect(() => {
    // Establish the connection.
    socketRef.current = io(url, { ...options });
    const socket = socketRef.current;

    // Internal listeners for debugging.
    socket.on('connect', () => console.log(`Socket connected: ${socket.id}`));
    socket.on('disconnect', (reason) => console.log(`Socket disconnected: ${reason}`));
    socket.on('connect_error', (err) => console.error('Socket connection error:', err.message));

    // Cleanup function to disconnect when the component unmounts.
    return () => {
      socket.disconnect();
    };
    // This effect only re-runs if the connection details change.
  }, [url, JSON.stringify(options)]);

  // `useCallback` with an empty `[]` dependency array memorizes these functions,
  // making them stable across re-renders. THIS IS THE KEY FIX.
  const emit = useCallback((event, data) => {
    socketRef.current?.emit(event, data);
  }, []);

  const on = useCallback((event, callback) => {
    socketRef.current?.on(event, callback);
  }, []);

  const off = useCallback((event, callback) => {
    socketRef.current?.off(event, callback);
  }, []);

  return { emit, on, off };
};

 export default useWebSocket; 

