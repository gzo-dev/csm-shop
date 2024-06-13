// File: SocketContainer.js
import React, { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

// Tạo context để lưu trữ đối tượng socket
export const SocketContext = createContext(null);

// Component chính là container socket
const SocketContainer = ({ serverUrl, children }) => {
  const [socket, setSocket] = useState(null);

  // Khởi tạo kết nối socket khi component được mount
  useEffect(() => {
    // Tạo một đối tượng socket
    const newSocket = io(serverUrl, {transports: ["websocket"]});

    // Lưu trữ đối tượng socket vào state
    setSocket(newSocket);

    // Clean up khi component bị unmount
    return () => {
      newSocket.disconnect();
    };
  }, [serverUrl]);

  // Trả về JSX với SocketContext.Provider để cung cấp socket cho các component con
  return (
    <SocketContext.Provider value={{socket}}>
      {children}
    </SocketContext.Provider>
  );
};


export default SocketContainer;
