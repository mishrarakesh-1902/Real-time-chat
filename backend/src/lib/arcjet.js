// //arcjet.js
// import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";

// import { ENV } from "./env.js";

// const aj = arcjet({
//   key: ENV.ARCJET_KEY,
//   rules: [
//     // Shield protects your app from common attacks e.g. SQL injection
//     shield({ mode: "LIVE" }),
//     // Create a bot detection rule
//     detectBot({
//       mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
//       // Block all bots except the following
//       allow: [
//         "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
//         // Uncomment to allow these other common bot categories
//         // See the full list at https://arcjet.com/bot-list
//         //"CATEGORY:MONITOR", // Uptime monitoring services
//         //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
//       ],
//     }),
//     // Create a token bucket rate limit. Other algorithms are supported.
//     slidingWindow({
//       mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
//       max: 100,
//       interval: 60,
//     }),
//   ],
// });

// export default aj;

import arcjet, {
  shield,
  detectBot,
  slidingWindow,
} from "@arcjet/node";
import { ENV } from "./env.js";

/*
  Decide mode based on environment
  - production → LIVE (block)
  - development → DRY_RUN (log only)
*/
const MODE =
  ENV.NODE_ENV === "production" ? "LIVE" : "DRY_RUN";

/*
  If ARCJET_KEY is missing, disable Arcjet gracefully
  (prevents server crash in local/dev)
*/
let aj = null;

if (!ENV.ARCJET_KEY) {
  console.warn(
    "⚠️ ARCJET_KEY missing — Arcjet protection disabled"
  );

  // fallback middleware (does nothing)
  aj = async (_req, _res, next) => next();
} else {
  aj = arcjet({
    key: ENV.ARCJET_KEY,
    rules: [
      // Protect against common attacks (SQLi, XSS, etc.)
      shield({ mode: MODE }),

      // Bot detection
      detectBot({
        mode: MODE,
        allow: [
          "CATEGORY:SEARCH_ENGINE",
          // "CATEGORY:MONITOR",
          // "CATEGORY:PREVIEW",
        ],
      }),

      // Rate limiting
      slidingWindow({
        mode: MODE,
        max: 100,
        interval: 60, // seconds
      }),
    ],
  });
}

export default aj;
