// import express from "express";
// import cookieParser from "cookie-parser";
// import path from "path";
// import cors from "cors";

// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import { connectDB } from "./lib/db.js";
// import { ENV } from "./lib/env.js";
// import { app, server } from "./lib/socket.js";

// const __dirname = path.resolve();

// const PORT = ENV.PORT || 3000;

// app.use(express.json({ limit: "5mb" })); // req.body
// app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
// app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// // make ready for deployment
// if (ENV.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (_, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

// server.listen(PORT, () => {
//   console.log("Server running on port: " + PORT);
//   connectDB();
// });



// import cookieParser from "cookie-parser";
// import path from "path";
// import cors from "cors";

// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import { connectDB } from "./lib/db.js";
// import { ENV } from "./lib/env.js";
// import { app, server } from "./lib/socket.js";

// const __dirname = path.resolve();

// // ✅ CRITICAL FIX: use process.env.PORT
// const PORT = process.env.PORT || 3000;

// // Middlewares
// app.use(express.json({ limit: "5mb" }));
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: ENV.CLIENT_URL,
//     credentials: true,
//   })
// );

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// // ✅ PRODUCTION: serve frontend (React / Vite)
// if (ENV.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(
//       path.join(__dirname, "../frontend/dist/index.html")
//     );
//   });
// }

// // Start server
// server.listen(PORT, async () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   await connectDB();
// });








// import express from "express"; // ✅ REQUIRED
// import cookieParser from "cookie-parser";
// import path from "path";
// import cors from "cors";

// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import { connectDB } from "./lib/db.js";
// import { ENV } from "./lib/env.js";
// import { app, server } from "./lib/socket.js";

// const __dirname = path.resolve();

// // ✅ Render-safe port
// const PORT = process.env.PORT || 3000;

// // Middlewares
// app.use(express.json({ limit: "5mb" }));
// app.use(cookieParser());
// // app.use(
// //   cors({
// //     origin: ENV.CLIENT_URL,
// //     credentials: true,
// //   })
// // );
// app.use(cors({
//   origin: "https://real-time-chat-50yz.onrender.com",
//   credentials: true,
// }));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// // Serve frontend in production
// if (ENV.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
//   });
// }

// // Start server
// server.listen(PORT, async () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   await connectDB();
// });







// import express from "express";
// import cookieParser from "cookie-parser";
// import path from "path";
// import cors from "cors";

// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import { connectDB } from "./lib/db.js";
// import { ENV } from "./lib/env.js";
// import { app, server } from "./lib/socket.js";

// const __dirname = path.resolve();

// // ✅ FRONTEND URL (MUST MATCH EXACTLY)
// const CLIENT_URL = "https://real-time-chat-50yz.onrender.com";

// // ✅ Render-safe port
// const PORT = process.env.PORT || 3000;

// /* ===================== MIDDLEWARE (ORDER MATTERS) ===================== */

// // Parse JSON
// app.use(express.json({ limit: "5mb" }));

// // Parse cookies
// app.use(cookieParser());

// // ✅ CORS — REQUIRED FOR COOKIES
// app.use(
//   cors({
//     origin: CLIENT_URL,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// /* ===================== ROUTES ===================== */

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// /* ===================== SERVE FRONTEND ===================== */

// if (ENV.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
//   });
// }

// /* ===================== START SERVER ===================== */

// server.listen(PORT, async () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   await connectDB();
// });

// import express from "express";
// import cookieParser from "cookie-parser";
// import path from "path";
// import cors from "cors";

// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import { connectDB } from "./lib/db.js";
// import { ENV } from "./lib/env.js";
// import { app, server } from "./lib/socket.js";

// const __dirname = path.resolve();

// // ✅ Render-safe port
// const PORT = process.env.PORT || 3000;

// /* ===================== MIDDLEWARE ===================== */

// app.use(express.json({ limit: "5mb" }));
// app.use(cookieParser());

// // ✅ CORS (LOCAL + PROD)
// const allowedOrigins = [
//   "https://real-time-chat-50yz.onrender.com",
//   "http://localhost:5173",
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// // ✅ Preflight
// app.options("*", cors());

// /* ===================== ROUTES ===================== */

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// /* ===================== SERVE FRONTEND ===================== */

// if (ENV.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
//   });
// }

// /* ===================== START SERVER ===================== */

// server.listen(PORT, async () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   await connectDB();
// });


// import path from "path";
// import cookieParser from "cookie-parser";

// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import { connectDB } from "./lib/db.js";
// import { ENV } from "./lib/env.js";

// // ✅ IMPORTANT: app & server FROM socket.js
// import { app, server } from "./lib/socket.js";

// const __dirname = path.resolve();

// // =====================
// // CONFIG
// // =====================
// const PORT = process.env.PORT || 3000;

// // =====================
// // MIDDLEWARE
// // =====================
// app.use(cookieParser());
// app.use(express.json({ limit: "5mb" }));

// // =====================
// // ROUTES
// // =====================
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// // =====================
// // SERVE FRONTEND (PROD)
// // =====================
// if (ENV.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(
//       path.join(__dirname, "../frontend/dist/index.html")
//     );
//   });
// }

// // =====================
// // START SERVER
// // =====================
// server.listen(PORT, async () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   await connectDB();
// });


// //server.js
// import path from "path";
// import cookieParser from "cookie-parser";

// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import { connectDB } from "./lib/db.js";
// import { ENV } from "./lib/env.js";
// import { app, server } from "./lib/socket.js";

// const __dirname = path.resolve();
// const PORT = process.env.PORT || 3000;

// /* ===================== MIDDLEWARE ===================== */
// app.use(cookieParser());

// /* ===================== ROUTES ===================== */
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// /* ===================== SERVE FRONTEND ===================== */
// if (ENV.NODE_ENV === "production") {
//   app.get("*", (req, res) => {
//     res.sendFile(
//       path.join(__dirname, "../frontend/dist/index.html")
//     );
//   });
// }

// /* ===================== START SERVER ===================== */
// server.listen(PORT, async () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   await connectDB();
// });

import path from "path";
import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";

const __dirname = path.resolve();
const PORT = ENV.PORT || 3000;

/* =====================
   GLOBAL MIDDLEWARE
===================== */
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

/* =====================
   HEALTH CHECK
===================== */
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    env: ENV.NODE_ENV,
  });
});

/* =====================
   ROUTES
===================== */
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

/* =====================
   SERVE FRONTEND (PROD)
===================== */
if (ENV.NODE_ENV === "production") {
  app.use(
    express.static(
      path.join(__dirname, "../frontend/dist")
    )
  );

  app.get("*", (_req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist/index.html")
    );
  });
}

/* =====================
   START SERVER
===================== */
const startServer = async () => {
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log(
        `🚀 Server running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "❌ Failed to start server:",
      error
    );
    process.exit(1);
  }
};

startServer();
