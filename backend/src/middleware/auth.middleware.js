// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import { ENV } from "../lib/env.js";

// export const protectRoute = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwt;
//     if (!token) return res.status(401).json({ message: "Unauthorized - No token provided" });

//     const decoded = jwt.verify(token, ENV.JWT_SECRET);
//     if (!decoded) return res.status(401).json({ message: "Unauthorized - Invalid token" });

//     const user = await User.findById(decoded.userId).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });

//     req.user = user;
//     next();
//   } catch (error) {
//     console.log("Error in protectRoute middleware:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // backend/src/middleware/auth.middleware.js
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import { ENV } from "../lib/env.js";

// export const protectRoute = async (req, res, next) => {
//   try {
//     // ✅ Read JWT from cookies
//     const token = req.cookies?.jwt;

//     if (!token) {
//       return res.status(401).json({
//         message: "Unauthorized - No token provided",
//       });
//     }

//     // ✅ Verify token
//     const decoded = jwt.verify(token, ENV.JWT_SECRET);

//     // ✅ Fetch user
//     const user = await User.findById(decoded.userId).select("-password");

//     if (!user) {
//       return res.status(401).json({
//         message: "Unauthorized - User not found",
//       });
//     }

//     // ✅ Attach user to request
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Auth middleware error:", error.message);

//     // ✅ JWT errors must return 401, NOT 500
//     return res.status(401).json({
//       message: "Unauthorized - Invalid or expired token",
//     });
//   }
// };


import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async (req, res, next) => {
  try {
    // 🔐 Ensure JWT secret exists
    if (!ENV.JWT_SECRET) {
      console.error("❌ JWT_SECRET is not configured");
      return res.status(500).json({
        message: "Authentication configuration error",
      });
    }

    // 🍪 Read JWT from cookies
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No token provided",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, ENV.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Unauthorized - Token expired",
        });
      }

      return res.status(401).json({
        message: "Unauthorized - Invalid token",
      });
    }

    // 👤 Fetch user
    const user = await User.findById(decoded.userId).select(
      "-password"
    );

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized - User not found",
      });
    }

    // ✅ Attach user to request
    req.user = user;
    return next();
  } catch (error) {
    console.error(
      "Auth middleware unexpected error:",
      error
    );

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
