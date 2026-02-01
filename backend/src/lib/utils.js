// import jwt from "jsonwebtoken";
// import { ENV } from "./env.js";

// export const generateToken = (userId, res) => {
//   const { JWT_SECRET } = ENV;
//   if (!JWT_SECRET) {
//     throw new Error("JWT_SECRET is not configured");
//   }

//   const token = jwt.sign({ userId }, JWT_SECRET, {
//     expiresIn: "7d",
//   });

//   res.cookie("jwt", token, {
//     maxAge: 7 * 24 * 60 * 60 * 1000, // MS
//     httpOnly: true, // prevent XSS attacks: cross-site scripting
//     sameSite: "strict", // CSRF attacks
//     secure: ENV.NODE_ENV === "development" ? false : true,
//   });

//   return token;
// };

// // http://localhost
// // https://dsmakmk.com

// // //frontend/src/lib/utils.js
// import jwt from "jsonwebtoken";
// import { ENV } from "./env.js";

// export const generateToken = (userId, res) => {
//   const { JWT_SECRET } = ENV;
//   if (!JWT_SECRET) {
//     throw new Error("JWT_SECRET is not configured");
//   }

//   const token = jwt.sign({ userId }, JWT_SECRET, {
//     expiresIn: "7d",
//   });

//   res.cookie("jwt", token, {
//     httpOnly: true,
//     secure: true,
//     sameSite: "none",
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//   });

//   return token;
// };


import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

/*
  Generate JWT and set cookie safely
*/
export const generateToken = (userId, res) => {
  const { JWT_SECRET, NODE_ENV } = ENV;

  if (!JWT_SECRET) {
    console.error("❌ JWT_SECRET is not configured");
    throw new Error("Authentication configuration error");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  const isProduction = NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isProduction,              // HTTPS only in prod
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,    // 7 days
  });

  return token;
};
