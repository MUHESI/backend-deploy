import mongoose from "mongoose";
import { Model, model, Schema } from "mongoose";
import { IUser } from "../config/interfaces";

const userSchema: Schema = new mongoose.Schema(
  {
    entity: {
      type: String,
      required: true
    },
    fName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 55
    },
    lName: {
      type: String,
      minlength: 3,
      maxlength: 55,
      required: true
    },
    status: {
      type: String,
      default: "ACTIVE",
      required: true
    },
    role: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: false
    },
    phone: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users"
    },
    dateCreation: {
      type: Number,
      required: true
    }
  },

  {
    timestamps: true
  }
);

const User: Model<IUser> = model<IUser>("users", userSchema);

export default User;
