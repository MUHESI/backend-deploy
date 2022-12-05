import mongoose from "mongoose";
import { Model, model, Schema } from "mongoose";
import { ITraveler } from "../types/traveler";

const travelSchema: Schema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 55,
      trim: true
    },
    lName: {
      type: String,
      minlength: 3,
      maxlength: 55,
      trim: true,
      required: true
    },
    sex: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "ACTIVE",
      required: true
    },
    address: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: false,
      unique: true
    },
    dateBorn: {
      type: String,
      required: false
    },
    nationality: {
      type: String,
      required: true
    },
    activities: {
      type: [],
      required: false
    },
    phone: {
      type: String
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users"
    },
    dateCreation: {
      type: Number,
      required: true
    },
    pictures: {
      type: []
      // required: true
    }
  },
  {
    timestamps: true
  }
);

const User: Model<ITraveler> = model<ITraveler>("travelers", travelSchema);

export default User;
