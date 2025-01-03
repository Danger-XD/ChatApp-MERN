import mongoose, { Schema } from "mongoose";
const dataSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    avatar:{
        type: String, 
        required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const userModel = mongoose.model("User", dataSchema);
