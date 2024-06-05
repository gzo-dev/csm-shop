import "dotenv/config";
import { db } from "./models";
import { restRouter } from "./api";
import config from "./config";
import appManager from "./app";
// import kue from './kue';
import "./errors";
import scheduler from "./scheduler";
import path from "path";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
global.appRoot = path.resolve(__dirname);

const PORT = config.app.port;
const app = appManager.setup(config);
const server = http.createServer(app);
// Khởi tạo Socket.IO server và chạy trên cùng một HTTP server
const io = new Server(server);
/*cors handling*/
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.options("*", cors());

/* Route handling */
app.use("/api", restRouter);
// app.use('/', webRouter);

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Xử lý khi nhận được tin nhắn từ client
  socket.on("message", (data) => {
    console.log(`Received message from client ${socket.id}: ${data}`);

    // Gửi tin nhắn trả lại cho client
    socket.emit("response", "Message received!");
  });
  socket.on("join_room", async (data)=> {
	const {roomId }= data
	socket.join(roomId)
	// const sockets = await io.in(roomId).fetchSockets();
	// console.log(sockets)
  })
  socket.on("back_to_web", async (data)=> {
	const {roomId, to}= data
	io.to(roomId).emit('to_website', data);
  })

  // Xử lý khi client ngắt kết nối
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

app.use((error, req, res, next) => {
  if (!(error instanceof RequestError)) {
    error = new RequestError("Some Error Occurred", 500, error.message);
  }
  error.status = error.status || 500;
  res.status(error.status);
  let contype = req.headers["content-type"];
  var json = !(!contype || contype.indexOf("application/json") !== 0);
  if (json) {
    return res.json({ errors: error.errorList });
  } else {
    res.render(error.status.toString(), { layout: null });
  }
});

// kue.init();
/* Database Connection */
db.sequelize
  .authenticate()
  .then(function () {
    console.log("Nice! Database looks fine");
    scheduler.init();
  })
  .catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!");
  });

/* Start Listening service */
server.listen(4001, () => {
  console.log(`Server is running at PORT http://localhost:${PORT}`);
});
