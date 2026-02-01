// // middleware/socket.auth.middleware.js
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import { ENV } from "../lib/env.js";

// export const socketAuthMiddleware = async (socket, next) => {
//   try {
//     // extract token from http-only cookies
//     const token = socket.handshake.headers.cookie
//       ?.split("; ")
//       .find((row) => row.startsWith("jwt="))
//       ?.split("=")[1];

//     if (!token) {
//       console.log("Socket connection rejected: No token provided");
//       return next(new Error("Unauthorized - No Token Provided"));
//     }

//     // verify the token
//     const decoded = jwt.verify(token, ENV.JWT_SECRET);
//     if (!decoded) {
//       console.log("Socket connection rejected: Invalid token");
//       return next(new Error("Unauthorized - Invalid Token"));
//     }

//     // find the user fromdb
//     const user = await User.findById(decoded.userId).select("-password");
//     if (!user) {
//       console.log("Socket connection rejected: User not found");
//       return next(new Error("User not found"));
//     }

//     // attach user info to socket
//     socket.user = user;
//     socket.userId = user._id.toString();

//     console.log(`Socket authenticated for user: ${user.fullName} (${user._id})`);

//     next();
//   } catch (error) {
//     console.log("Error in socket authentication:", error.message);
//     next(new Error("Unauthorized - Authentication failed"));
//   }
// };

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

/*
  Helper to safely extract cookie value
*/
const getCookie = (cookieHeader, name) => {
  if (!cookieHeader) return null;

  return cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`))
    ?.split("=")[1];
};

export const socketAuthMiddleware = async (socket, next) => {
  try {
    // 🔐 Ensure JWT secret exists
    if (!ENV.JWT_SECRET) {
      console.error("❌ JWT_SECRET is not configured");
      return next(
        new Error("Authentication configuration error")
      );
    }

    // 🍪 Extract JWT from cookies
    const cookieHeader =
      socket.handshake.headers?.cookie;

    const token = getCookie(cookieHeader, "jwt");

    if (!token) {
      return next(
        new Error("Unauthorized - No token provided")
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, ENV.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return next(
          new Error("Unauthorized - Token expired")
        );
      }
      return next(
        new Error("Unauthorized - Invalid token")
      );
    }

    // 👤 Fetch user
    const user = await User.findById(
      decoded.userId
    ).select("_id fullName profilePic");

    if (!user) {
      return next(new Error("Unauthorized - User not found"));
    }

    // ✅ Attach user info to socket
    socket.user = user;
    socket.userId = user._id.toString();

    if (ENV.NODE_ENV !== "production") {
      console.log(
        `🔌 Socket authenticated: ${user.fullName} (${user._id})`
      );
    }

    return next();
  } catch (error) {
    console.error(
      "Socket authentication error:",
      error
    );
    return next(
      new Error("Unauthorized - Authentication failed")
    );
  }
};
