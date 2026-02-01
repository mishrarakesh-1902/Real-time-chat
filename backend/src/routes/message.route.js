// import express from "express";
// import {
//   getAllContacts,
//   getChatPartners,
//   getMessagesByUserId,
//   sendMessage,
// } from "../controllers/message.controller.js";
// import { protectRoute } from "../middleware/auth.middleware.js";
// import { arcjetProtection } from "../middleware/arcjet.middleware.js";

// const router = express.Router();

// // the middlewares execute in order - so requests get rate-limited first, then authenticated.
// // this is actually more efficient since unauthenticated requests get blocked by rate limiting before hitting the auth middleware.
// router.use(arcjetProtection, protectRoute);

// router.get("/contacts", getAllContacts);
// router.get("/chats", getChatPartners);
// router.get("/:id", getMessagesByUserId);
// router.post("/send/:id", sendMessage);

// export default router;

// //message.route.js
// import express from "express";
// import {
//   getAllContacts,
//   getChatPartners,
//   getMessagesByUserId,
//   sendMessage,
// } from "../controllers/message.controller.js";
// import { protectRoute } from "../middleware/auth.middleware.js";
// import { arcjetProtection } from "../middleware/arcjet.middleware.js";

// const router = express.Router();

// /*
//   Order of middlewares:
//   1. arcjetProtection  → rate limiting / bot protection
//   2. protectRoute     → attach req.user
// */

// // Apply protection + auth to all message routes
// router.use(arcjetProtection);
// router.use(protectRoute);

// /* ===================== CONTACTS & CHATS ===================== */
// router.get("/contacts", getAllContacts);
// router.get("/chats", getChatPartners);

// /* ===================== MESSAGES ===================== */
// router.get("/:id", getMessagesByUserId);

// // SEND MESSAGE (TEXT / IMAGE)
// router.post("/send/:id", sendMessage);

// export default router;

import express from "express";
import mongoose from "mongoose";
import {
  getAllContacts,
  getChatPartners,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

/*
  Middleware order:
  1. arcjetProtection → rate limit / bot protection
  2. protectRoute    → attach req.user
*/
router.use(arcjetProtection);
router.use(protectRoute);

/* =====================
   CONTACTS & CHATS
===================== */
router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);

/* =====================
   ID VALIDATION MIDDLEWARE
===================== */
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid user id",
    });
  }
  next();
};

/* =====================
   MESSAGES
===================== */
router.get("/:id", validateObjectId, getMessagesByUserId);

// SEND MESSAGE (TEXT / IMAGE)
router.post("/send/:id", validateObjectId, sendMessage);

export default router;
