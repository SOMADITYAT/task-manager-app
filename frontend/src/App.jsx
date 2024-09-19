// src/App.js
import React, { useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { SocketProvider } from "./context/SocketContext"; // Import SocketProvider
import { generateToken } from "./firebase";

function App() {
  useEffect(() => {
    generateToken();
  }, []);
  return (
    <SocketProvider>
      <div>
        {/* <TaskForm /> */}
        <TaskList />
      </div>
    </SocketProvider>
  );
}

export default App;
