// import express from "express";
// import { signup, login, logout, updateProfile } from "../controllers/auth.controller.js";
// import { protectRoute } from "../middleware/auth.middleware.js";
// import { arcjetProtection } from "../middleware/arcjet.middleware.js";

// const router = express.Router();

// router.use(arcjetProtection);

// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/logout", logout);

// router.put("/update-profile", protectRoute, updateProfile);

// router.get("/check", protectRoute, (req, res) => res.status(200).json(req.user));

// export default router;

// // backend/src/routes/auth.route.js
// import express from "express";
// import jwt from "jsonwebtoken";
// import { signup, login, logout, updateProfile } from "../controllers/auth.controller.js";
// import { protectRoute } from "../middleware/auth.middleware.js";
// import { arcjetProtection } from "../middleware/arcjet.middleware.js";
// import User from "../models/User.js";
// import { ENV } from "../lib/env.js";

// const router = express.Router();

// // rate limiting / security
// router.use(arcjetProtection);

// // public auth routes
// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/logout", logout);

// // protected routes
// router.put("/update-profile", protectRoute, updateProfile);

// /**
//  * AUTH CHECK (IMPORTANT)
//  * - NEVER throws 401
//  * - Returns user if logged in
//  * - Returns null if not logged in
//  */
// router.get("/check", async (req, res) => {
//   try {
//     const token = req.cookies?.jwt;

//     if (!token) {
//       return res.status(200).json(null);
//     }

//     const decoded = jwt.verify(token, ENV.JWT_SECRET);
//     const user = await User.findById(decoded.userId).select("-password");

//     return res.status(200).json(user || null);
//   } catch (error) {
//     // token expired / invalid
//     return res.status(200).json(null);
//   }
// });

// export default router;


import express from "express";
import jwt from "jsonwebtoken";
import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

const router = express.Router();

/* =====================
   SECURITY / RATE LIMIT
===================== */
router.use(arcjetProtection);

/* =====================
   PUBLIC ROUTES
===================== */
router.post("/signup", signup);
router.post("/login", login);

/* =====================
   PROTECTED ROUTES
===================== */
router.post("/logout", protectRoute, logout);
router.put("/update-profile", protectRoute, updateProfile);

/* =====================
   AUTH CHECK (SAFE)
   - NEVER returns 401
   - Returns user or null
===================== */
router.get("/check", async (req, res) => {
  try {
    if (!ENV.JWT_SECRET) {
      console.error("❌ JWT_SECRET missing");
      return res.status(200).json(null);
    }

    const token = req.cookies?.jwt;
    if (!token) {
      return res.status(200).json(null);
    }

    let decoded;
    try {
      decoded = jwt.verify(token, ENV.JWT_SECRET);
    } catch {
      return res.status(200).json(null);
    }

    const user = await User.findById(
      decoded.userId
    ).select("_id fullName email profilePic");

    return res.status(200).json(user || null);
  } catch (error) {
    console.error("Auth check error:", error);
    return res.status(200).json(null);
  }
});

export default router;
