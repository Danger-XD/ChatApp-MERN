import mongoose, { Schema } from "mongoose";
const dataSchema = new Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const conversationModel = mongoose.model("Conversation", dataSchema);
