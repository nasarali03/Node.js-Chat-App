import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  res.sendFile("/public/index.html");
});

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});

server.listen(PORT, () => {
  console.log(`Listenting on ${PORT}`);
});
