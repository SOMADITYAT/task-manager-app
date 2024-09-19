// sockets/taskSockets.js

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("createTask", (task) => {
      io.emit("taskCreated", task);
    });

    socket.on("updateTask", (task) => {
      io.emit("taskUpdated", task);
    });

    socket.on("deleteTask", (taskId) => {
      io.emit("taskDeleted", taskId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
