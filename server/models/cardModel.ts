import mongoose from "mongoose";
import { Model, model, Schema } from "mongoose";
import { ICard } from "../types/card";

const cardSchema: Schema = new mongoose.Schema(
  {
    entity: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "ACTIVE",
      required: true
    },
    typecard: {
      type: String,
      required: true
    },
    validity: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true,
      unique: true
    },
    traveler: {
      type: mongoose.Types.ObjectId,
      ref: "travelers",
      required: true
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true
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
const Card: Model<ICard> = model<ICard>("cards", cardSchema);

export default Card;
