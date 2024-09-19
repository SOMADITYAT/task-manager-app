// src/hooks/useSocket.js
import { useEffect, useState } from "react";
import io from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io("http://localhost:8080"); // Replace with your server URL
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return { socket };
};

export default useSocket;
