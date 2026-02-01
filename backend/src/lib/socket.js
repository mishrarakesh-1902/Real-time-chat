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

// import { Server } from "socket.io";
// import http from "http";
// import express from "express";
// import cors from "cors";
// import { ENV } from "./env.js";
// import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

// // =====================
// // Create Express + HTTP
// // =====================
// const app = express();
// const server = http.createServer(app);

// // =====================
// // CORS CONFIG (CRITICAL)
// // =====================
// const CLIENT_URL = ENV.CLIENT_URL || "https://real-time-chat-50yz.onrender.com";

// // ⚠️ THIS is what allows cookies to be accepted by the browser
// app.use(
//   cors({
//     origin: CLIENT_URL,
//     credentials: true,
//   })
// );

// // =====================
// // Socket.IO Setup
// // =====================
// const io = new Server(server, {
//   cors: {
//     origin: CLIENT_URL,
//     credentials: true,
//   },
// });

// // =====================
// // Socket Auth Middleware
// // =====================
// io.use(socketAuthMiddleware);

// // =====================
// // Online Users Tracking
// // =====================
// const userSocketMap = {}; // { userId: socketId }

// export function getReceiverSocketId(userId) {
//   return userSocketMap[userId];
// }

// // =====================
// // Socket Events
// // =====================
// io.on("connection", (socket) => {
//   console.log("✅ Socket connected:", socket.user.fullName);

//   const userId = socket.userId;
//   userSocketMap[userId] = socket.id;

//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   socket.on("disconnect", () => {
//     console.log("❌ Socket disconnected:", socket.user.fullName);
//     delete userSocketMap[userId];
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });

// export { io, app, server };


// import { Server } from "socket.io";
// import http from "http";
// import express from "express";
// import cors from "cors";
// import { ENV } from "./env.js";
// import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

// // =====================
// // Create Express + HTTP
// // =====================
// const app = express();
// const server = http.createServer(app);

// // =====================
// // CORS CONFIG (CRITICAL)
// // =====================
// const CLIENT_URL = ENV.CLIENT_URL || "https://real-time-chat-50yz.onrender.com";

// app.use(
//   cors({
//     origin: CLIENT_URL,
//     credentials: true,
//   })
// );

// // =====================
// // Socket.IO Setup
// // =====================
// const io = new Server(server, {
//   cors: {
//     origin: CLIENT_URL,
//     credentials: true,
//   },
// });

// // =====================
// // Socket Auth Middleware
// // =====================
// io.use(socketAuthMiddleware);

// // =====================
// // Online Users Tracking
// // =====================
// const userSocketMap = {}; // { userId: socketId }

// export function getReceiverSocketId(userId) {
//   return userSocketMap[userId];
// }

// // =====================
// // Socket Events
// // =====================
// io.on("connection", (socket) => {
//   console.log("✅ Socket connected:", socket.user.fullName);

//   const userId = socket.userId;
//   userSocketMap[userId] = socket.id;

//   // broadcast online users
//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   // =====================
//   // VIDEO CALL SIGNALING
//   // =====================

//   // Caller sends offer
//   socket.on("call-user", ({ toUserId, offer, isGroup = false }) => {
//     const receiverSocketId = userSocketMap[toUserId];
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("incoming-call", {
//         fromUserId: userId,
//         offer,
//         isGroup,
//       });
//     }
//   });

//   // Receiver answers call
//   socket.on("answer-call", ({ toUserId, answer }) => {
//     const receiverSocketId = userSocketMap[toUserId];
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("call-answered", {
//         fromUserId: userId,
//         answer,
//       });
//     }
//   });

//   // ICE candidate exchange
//   socket.on("ice-candidate", ({ toUserId, candidate }) => {
//     const receiverSocketId = userSocketMap[toUserId];
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("ice-candidate", {
//         fromUserId: userId,
//         candidate,
//       });
//     }
//   });

//   // Call ended
//   socket.on("end-call", ({ toUserId }) => {
//     const receiverSocketId = userSocketMap[toUserId];
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("call-ended", {
//         fromUserId: userId,
//       });
//     }
//   });

//   // =====================
//   // DISCONNECT
//   // =====================
//   socket.on("disconnect", () => {
//     console.log("❌ Socket disconnected:", socket.user.fullName);
//     delete userSocketMap[userId];
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });

// export { io, app, server };
// import { Server } from "socket.io";
// import http from "http";
// import express from "express";
// import cors from "cors";
// import { ENV } from "./env.js";
// import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

// // =====================
// // Create Express + HTTP
// // =====================
// const app = express();
// const server = http.createServer(app);

// // =====================
// // Allowed Origins (PROD + LOCAL)
// // =====================
// const allowedOrigins =
//   ENV.NODE_ENV === "production"
//     ? [ENV.CLIENT_URL] // production frontend
//     : ["http://localhost:5173", ENV.CLIENT_URL];

// // =====================
// // HTTP CORS (REST APIs)
// // =====================
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("CORS not allowed"));
//       }
//     },
//     credentials: true,
//   })
// );

// // =====================
// // Socket.IO Setup
// // =====================
// const io = new Server(server, {
//   cors: {
//     origin: (origin, callback) => {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("CORS not allowed"));
//       }
//     },
//     credentials: true,
//   },
// });

// // =====================
// // Socket Auth Middleware
// // =====================
// io.use(socketAuthMiddleware);

// // =====================
// // Online Users Tracking
// // =====================
// const userSocketMap = {}; // { userId: socketId }

// export function getReceiverSocketId(userId) {
//   return userSocketMap[userId];
// }

// // =====================
// // Socket Events
// // =====================
// io.on("connection", (socket) => {
//   console.log("✅ Socket connected:", socket.user.fullName);

//   const userId = socket.userId;
//   userSocketMap[userId] = socket.id;

//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   // =====================
//   // VIDEO CALL SIGNALING
//   // =====================
//   socket.on("call-user", ({ toUserId, offer, isGroup = false }) => {
//     const receiverSocketId = userSocketMap[toUserId];
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("incoming-call", {
//         fromUserId: userId,
//         offer,
//         isGroup,
//       });
//     }
//   });

//   socket.on("answer-call", ({ toUserId, answer }) => {
//     const receiverSocketId = userSocketMap[toUserId];
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("call-answered", {
//         fromUserId: userId,
//         answer,
//       });
//     }
//   });

//   socket.on("ice-candidate", ({ toUserId, candidate }) => {
//     const receiverSocketId = userSocketMap[toUserId];
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("ice-candidate", {
//         fromUserId: userId,
//         candidate,
//       });
//     }
//   });

//   socket.on("end-call", ({ toUserId }) => {
//     const receiverSocketId = userSocketMap[toUserId];
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("call-ended", {
//         fromUserId: userId,
//       });
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("❌ Socket disconnected:", socket.user.fullName);
//     delete userSocketMap[userId];
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });

// export { io, app, server };


// import { Server } from "socket.io";
// import http from "http";
// import express from "express";
// import cors from "cors";
// import { ENV } from "./env.js";
// import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

// // =====================
// // Create Express + HTTP
// // =====================
// const app = express();
// const server = http.createServer(app);

// // =====================
// // Allowed Origins
// // =====================
// const allowedOrigins =
//   ENV.NODE_ENV === "production"
//     ? [ENV.CLIENT_URL]
//     : ["http://localhost:5173", ENV.CLIENT_URL];

// // =====================
// // HTTP CORS (REST APIs)
// // =====================
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) return callback(null, true);
//       return callback(new Error("CORS not allowed"));
//     },
//     credentials: true,
//   })
// );

// // =====================
// // Socket.IO Setup
// // =====================
// const io = new Server(server, {
//   cors: {
//     origin: (origin, callback) => {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) return callback(null, true);
//       return callback(new Error("CORS not allowed"));
//     },
//     credentials: true,
//   },
// });

// // =====================
// // Socket Auth Middleware
// // =====================
// io.use(socketAuthMiddleware);

// // =====================
// // Online Users Map
// // =====================
// const userSocketMap = {}; // { userId: socketId }

// export function getReceiverSocketId(userId) {
//   return userSocketMap[userId];
// }

// // =====================
// // Socket Events
// // =====================
// io.on("connection", (socket) => {
//   const userId = socket.userId;
//   console.log("✅ Socket connected:", socket.user.fullName);

//   userSocketMap[userId] = socket.id;
//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   // =====================
//   // VIDEO CALL SIGNALING
//   // =====================

//   // CALL USER
//   socket.on("call-user", ({ toUserId, offer }) => {
//     const receiverSocketId = userSocketMap[toUserId];
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("incoming-call", {
//         fromUserId: userId,
//         offer,
//       });
//     }
//   });

//   // ANSWER CALL
//   socket.on("answer-call", ({ toUserId, answer }) => {
//     const receiverSocketId = userSocketMap[toUserId];
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("call-answered", { answer });
//     }
//   });

//   // ICE CANDIDATE
//   socket.on("ice-candidate", ({ toUserId, candidate }) => {
//     const receiverSocketId = userSocketMap[toUserId];
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("ice-candidate", { candidate });
//     }
//   });

//   // END CALL
//   socket.on("end-call", ({ toUserId }) => {
//     const receiverSocketId = userSocketMap[toUserId];
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("call-ended");
//     }
//   });

//   // DISCONNECT
//   socket.on("disconnect", () => {
//     console.log("❌ Socket disconnected:", socket.user.fullName);
//     delete userSocketMap[userId];
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });

// export { io, app, server };


// // socket.js

// import { Server } from "socket.io";
// import http from "http";
// import express from "express";
// import cors from "cors";
// import { ENV } from "./env.js";
// import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";


// // =====================
// // Create Express + HTTP
// // =====================
// const app = express();
// const server = http.createServer(app);

// // =====================
// // Allowed Origins
// // =====================
// const allowedOrigins =
//   ENV.NODE_ENV === "production"
//     ? [ENV.CLIENT_URL]
//     : ["http://localhost:5173", ENV.CLIENT_URL];

// // =====================
// // HTTP CORS (REST APIs)
// // =====================
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) return callback(null, true);
//       return callback(new Error("CORS not allowed"));
//     },
//     credentials: true,
//   })
// );

// // =====================
// // Socket.IO Setup
// // =====================
// const io = new Server(server, {
//   cors: {
//     origin: (origin, callback) => {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) return callback(null, true);
//       return callback(new Error("CORS not allowed"));
//     },
//     credentials: true,
//   },
// });

// // =====================
// // Socket Auth Middleware
// // =====================
// io.use(socketAuthMiddleware);

// // =====================
// // Online Users Map
// // =====================
// const userSocketMap = {}; // { userId: socketId }

// export function getReceiverSocketId(userId) {
//   return userSocketMap[userId];
// }

// // =====================
// // Socket Events
// // =====================
// io.on("connection", (socket) => {
//   const userId = socket.userId;
//   const user = socket.user;

//   console.log("✅ Socket connected:", user.fullName);

//   userSocketMap[userId] = socket.id;
//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   // ==================================================
//   // VIDEO CALL SIGNALING (CORRECT FLOW)
//   // ==================================================

//   // 1️⃣ CALL INITIATE (RINGING)
//   socket.on("video-call:initiate", ({ toUserId }) => {
//     const receiverSocketId = userSocketMap[toUserId];
//     if (!receiverSocketId) return;

//     io.to(receiverSocketId).emit("video-call:incoming", {
//       fromUserId: userId,
//       fromUser: {
//         _id: user._id,
//         fullName: user.fullName,
//         avatar: user.avatar,
//       },
//     });
//   });

//   // 2️⃣ CALL ACCEPTED
//   socket.on("video-call:accept", ({ toUserId }) => {
//     const receiverSocketId = userSocketMap[toUserId];
//     if (!receiverSocketId) return;

//     io.to(receiverSocketId).emit("video-call:accepted", {
//       byUserId: userId,
//     });
//   });

//   // 3️⃣ CALL REJECTED
//   socket.on("video-call:reject", ({ toUserId }) => {
//     const receiverSocketId = userSocketMap[toUserId];
//     if (!receiverSocketId) return;

//     io.to(receiverSocketId).emit("video-call:rejected", {
//       byUserId: userId,
//     });
//   });

//   // 4️⃣ WEBRTC OFFER
//   socket.on("webrtc:offer", ({ toUserId, offer }) => {
//     const receiverSocketId = userSocketMap[toUserId];
//     if (!receiverSocketId) return;

//     io.to(receiverSocketId).emit("webrtc:offer", {
//       fromUserId: userId,
//       offer,
//     });
//   });

//   // 5️⃣ WEBRTC ANSWER
//   socket.on("webrtc:answer", ({ toUserId, answer }) => {
//     const receiverSocketId = userSocketMap[toUserId];
//     if (!receiverSocketId) return;

//     io.to(receiverSocketId).emit("webrtc:answer", {
//       fromUserId: userId,
//       answer,
//     });
//   });

//   // 6️⃣ ICE CANDIDATES
//   socket.on("webrtc:ice-candidate", ({ toUserId, candidate }) => {
//     const receiverSocketId = userSocketMap[toUserId];
//     if (!receiverSocketId) return;

//     io.to(receiverSocketId).emit("webrtc:ice-candidate", {
//       fromUserId: userId,
//       candidate,
//     });
//   });

//   // 7️⃣ END CALL
//   socket.on("video-call:end", ({ toUserId }) => {
//     const receiverSocketId = userSocketMap[toUserId];
//     if (!receiverSocketId) return;

//     io.to(receiverSocketId).emit("video-call:ended", {
//       byUserId: userId,
//     });
//   });

//   // =====================
//   // DISCONNECT
//   // =====================
//   socket.on("disconnect", () => {
//     console.log("❌ Socket disconnected:", user.fullName);
//     delete userSocketMap[userId];
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });

// export { io, app, server };


import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

/* =====================
   APP + SERVER
===================== */
const app = express();
const server = http.createServer(app);

/* =====================
   BODY PARSER (CRITICAL)
===================== */
app.use(express.json({ limit: "5mb" }));

/* =====================
   ALLOWED ORIGINS
===================== */
const allowedOrigins =
  ENV.NODE_ENV === "production"
    ? [ENV.CLIENT_URL]
    : ["http://localhost:5173", ENV.CLIENT_URL];

/* =====================
   CORS CHECK HELPER
===================== */
const corsOriginCheck = (origin, callback) => {
  if (!origin) return callback(null, true);
  if (allowedOrigins.includes(origin)) return callback(null, true);
  return callback(new Error("CORS not allowed"));
};

/* =====================
   HTTP CORS
===================== */
app.use(
  cors({
    origin: corsOriginCheck,
    credentials: true,
  })
);

/* =====================
   SOCKET.IO
===================== */
const io = new Server(server, {
  cors: {
    origin: corsOriginCheck,
    credentials: true,
  },
});

/* =====================
   SOCKET AUTH
===================== */
io.use(socketAuthMiddleware);

/* =====================
   ONLINE USERS (SAFE MAP)
===================== */
const userSocketMap = new Map(); // userId -> socketId

export function getReceiverSocketId(userId) {
  return userSocketMap.get(userId);
}

/* =====================
   SOCKET EVENTS
===================== */
io.on("connection", (socket) => {
  const userId = socket.userId;
  const user = socket.user;

  if (!userId || !user) {
    console.warn("⚠️ Socket connected without user");
    socket.disconnect();
    return;
  }

  console.log("✅ Socket connected:", user.fullName);

  // Track online user
  userSocketMap.set(userId, socket.id);
  io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

  /* ==================================================
     VIDEO CALL SIGNALING
  ================================================== */

  // 1️⃣ CALL INITIATE
  socket.on("video-call:initiate", ({ toUserId }) => {
    if (!toUserId) return;

    const receiverSocketId = userSocketMap.get(toUserId);
    if (!receiverSocketId) return;

    io.to(receiverSocketId).emit("video-call:incoming", {
      fromUserId: userId,
      fromUser: {
        _id: user._id,
        fullName: user.fullName,
        avatar: user.profilePic,
      },
    });
  });

  // 2️⃣ CALL ACCEPT
  socket.on("video-call:accept", ({ toUserId }) => {
    if (!toUserId) return;

    const receiverSocketId = userSocketMap.get(toUserId);
    if (!receiverSocketId) return;

    io.to(receiverSocketId).emit("video-call:accepted", {
      byUserId: userId,
    });
  });

  // 3️⃣ CALL REJECT
  socket.on("video-call:reject", ({ toUserId }) => {
    if (!toUserId) return;

    const receiverSocketId = userSocketMap.get(toUserId);
    if (!receiverSocketId) return;

    io.to(receiverSocketId).emit("video-call:rejected", {
      byUserId: userId,
    });
  });

  // 4️⃣ WEBRTC OFFER
  socket.on("webrtc:offer", ({ toUserId, offer }) => {
    if (!toUserId || !offer) return;

    const receiverSocketId = userSocketMap.get(toUserId);
    if (!receiverSocketId) return;

    io.to(receiverSocketId).emit("webrtc:offer", {
      fromUserId: userId,
      offer,
    });
  });

  // 5️⃣ WEBRTC ANSWER
  socket.on("webrtc:answer", ({ toUserId, answer }) => {
    if (!toUserId || !answer) return;

    const receiverSocketId = userSocketMap.get(toUserId);
    if (!receiverSocketId) return;

    io.to(receiverSocketId).emit("webrtc:answer", {
      fromUserId: userId,
      answer,
    });
  });

  // 6️⃣ ICE CANDIDATES
  socket.on("webrtc:ice-candidate", ({ toUserId, candidate }) => {
    if (!toUserId || !candidate) return;

    const receiverSocketId = userSocketMap.get(toUserId);
    if (!receiverSocketId) return;

    io.to(receiverSocketId).emit("webrtc:ice-candidate", {
      fromUserId: userId,
      candidate,
    });
  });

  // 7️⃣ END CALL
  socket.on("video-call:end", ({ toUserId }) => {
    if (!toUserId) return;

    const receiverSocketId = userSocketMap.get(toUserId);
    if (!receiverSocketId) return;

    io.to(receiverSocketId).emit("video-call:ended", {
      byUserId: userId,
    });
  });

  /* =====================
     DISCONNECT
  ===================== */
  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", user.fullName);

    // Remove only if same socket
    if (userSocketMap.get(userId) === socket.id) {
      userSocketMap.delete(userId);
    }

    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
  });
});

export { io, app, server };
