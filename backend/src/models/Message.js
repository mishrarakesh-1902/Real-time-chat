// // backend/src/models/Message.js
// import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema(
//   {
//     senderId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     receiverId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     text: {
//       type: String,
//       trim: true,
//       maxlength: 2000,
//     },
//     image: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

// const Message = mongoose.model("Message", messageSchema);

// export default Message;

import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    text: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/* =====================
   VALIDATION
===================== */
// Ensure at least text or image exists
messageSchema.pre("validate", function (next) {
  if (!this.text && !this.image) {
    next(
      new Error(
        "Message must contain either text or image"
      )
    );
  } else {
    next();
  }
});

/* =====================
   INDEXES (PERFORMANCE)
===================== */
// For chat history queries
messageSchema.index({
  senderId: 1,
  receiverId: 1,
  createdAt: 1,
});

// For reverse direction
messageSchema.index({
  receiverId: 1,
  senderId: 1,
  createdAt: 1,
});

/* =====================
   SAFE MODEL EXPORT
===================== */
const Message =
  mongoose.models.Message ||
  mongoose.model("Message", messageSchema);

export default Message;
