// //env.js
// import "dotenv/config";

// export const ENV = {
//   PORT: process.env.PORT,
//   MONGO_URI: process.env.MONGO_URI,
//   JWT_SECRET: process.env.JWT_SECRET,
//   NODE_ENV: process.env.NODE_ENV,
//   CLIENT_URL: process.env.CLIENT_URL,
//   RESEND_API_KEY: process.env.RESEND_API_KEY,
//   EMAIL_FROM: process.env.EMAIL_FROM,
//   EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
//   CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
//   CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
//   CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
//   ARCJET_KEY: process.env.ARCJET_KEY,
//   ARCJET_ENV: process.env.ARCJET_ENV,
// };


import "dotenv/config";

/*
  Helper to read env vars safely
*/
const getEnv = (key, fallback = undefined) => {
  const value = process.env[key];
  if (value === undefined || value === "") {
    return fallback;
  }
  return value;
};

/*
  Define ENV with safe defaults
*/
export const ENV = {
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "3000"),

  // REQUIRED
  MONGO_URI: getEnv("MONGO_URI"),
  JWT_SECRET: getEnv("JWT_SECRET"),
  CLIENT_URL: getEnv("CLIENT_URL"),

  // EMAIL
  RESEND_API_KEY: getEnv("RESEND_API_KEY"),
  EMAIL_FROM: getEnv("EMAIL_FROM"),
  EMAIL_FROM_NAME: getEnv("EMAIL_FROM_NAME"),

  // CLOUDINARY
  CLOUDINARY_CLOUD_NAME: getEnv("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_API_KEY: getEnv("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: getEnv("CLOUDINARY_API_SECRET"),

  // ARCJET
  ARCJET_KEY: getEnv("ARCJET_KEY"),
};

/*
  Validate required environment variables
*/
const REQUIRED_VARS = [
  "MONGO_URI",
  "JWT_SECRET",
  "CLIENT_URL",
];

const missingVars = REQUIRED_VARS.filter(
  (key) => !ENV[key]
);

if (missingVars.length > 0) {
  console.error(
    "❌ Missing required environment variables:",
    missingVars.join(", ")
  );

  if (ENV.NODE_ENV === "production") {
    // Fail fast in production
    throw new Error(
      "Missing required environment variables"
    );
  } else {
    console.warn(
      "⚠️ App is running with missing env vars (development mode)"
    );
  }
}
