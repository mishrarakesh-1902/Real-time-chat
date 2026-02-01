
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
