const express = require("express");
const http = require("http");

const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const socketIo = require("socket.io");

dotenv.config();

connectDB();

console.log("hello ", connectDB);

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  req.io = io;
  next();
});

require("./sockets/taskSockets")(io);

app.use("/api", taskRoutes);

const PORT = process.env.PORT || 8080;
app.listen(8080, () => {
  console.log(
    `Server running ${process.env.DEV_MODE} on port 8080 ${PORT}`.bgCyan.white
  );
});
