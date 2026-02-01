// // backend/src/lib/db.js
// import mongoose from "mongoose";
// import { ENV } from "./env.js";

// export const connectDB = async () => {
//   try {
//     const { MONGO_URI } = ENV;
//     if (!MONGO_URI) throw new Error("MONGO_URI is not set");

//     const conn = await mongoose.connect(ENV.MONGO_URI);
//     console.log("MONGODB CONNECTED:", conn.connection.host);
//   } catch (error) {
//     console.error("Error connection to MONGODB:", error);
//     process.exit(1); // 1 status code means fail, 0 means success
//   }
// };

import mongoose from "mongoose";
import { ENV } from "./env.js";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const { MONGO_URI } = ENV;

    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not set");
    }

    const conn = await mongoose.connect(MONGO_URI, {
      autoIndex: ENV.NODE_ENV !== "production",
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
    console.log(
      `🗄️ MongoDB connected: ${conn.connection.host}`
    );
  } catch (error) {
    console.error(
      "❌ MongoDB connection failed:",
      error.message
    );

    // Let the process manager (Render / PM2) handle restarts
    throw error;
  }
};
