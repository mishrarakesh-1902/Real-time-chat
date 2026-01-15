// import { Server } from "socket.io";
// import http from "http";
// import express from "express";
// import { ENV } from "./env.js";
// import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: [ENV.CLIENT_URL],
//     credentials: true,
//   },
// });

// // apply authentication middleware to all socket connections
// io.use(socketAuthMiddleware);

// // we will use this function to check if the user is online or not
// export function getReceiverSocketId(userId) {
//   return userSocketMap[userId];
// }

// // this is for storig online users
// const userSocketMap = {}; // {userId:socketId}

// io.on("connection", (socket) => {
//   console.log("A user connected", socket.user.fullName);

//   const userId = socket.userId;
//   userSocketMap[userId] = socket.id;

//   // io.emit() is used to send events to all connected clients
//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   // with socket.on we listen for events from clients
//   socket.on("disconnect", () => {
//     console.log("A user disconnected", socket.user.fullName);
//     delete userSocketMap[userId];
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });

// export { io, app, server };

import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

// =====================
// Create Express + HTTP
// =====================
const app = express();
const server = http.createServer(app);

// =====================
// CORS CONFIG (CRITICAL)
// =====================
const CLIENT_URL = ENV.CLIENT_URL || "https://real-time-chat-50yz.onrender.com";

// ⚠️ THIS is what allows cookies to be accepted by the browser
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// =====================
// Socket.IO Setup
// =====================
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    credentials: true,
  },
});

// =====================
// Socket Auth Middleware
// =====================
io.use(socketAuthMiddleware);

// =====================
// Online Users Tracking
// =====================
const userSocketMap = {}; // { userId: socketId }

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// =====================
// Socket Events
// =====================
io.on("connection", (socket) => {
  console.log("✅ Socket connected:", socket.user.fullName);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.user.fullName);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
