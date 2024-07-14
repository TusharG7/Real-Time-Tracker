const express = require("express");
const http = require("http");
const path = require("path");

const app = express();
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", function (socket) {
  socket.on("send-location", (data) => {
    io.emit("receive-location", { id: socket.id, ...data });
  });
  socket.on("disconnect", function () {
    io.emit("user-disconnect", socket.id);
  });
});

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "public"));

// app.set("view engine", "ejs");
// app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(3000);
