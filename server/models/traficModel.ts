import mongoose from "mongoose";
import { Model, model, Schema } from "mongoose";
import { ITrafic } from "../types/trafic";

const traficSchema: Schema = new mongoose.Schema(
  {
    // AD VOYAGEUR
    entity: {
      type: String,
      required: true
    },
    traveler: {
      type: mongoose.Types.ObjectId,
      ref: "travelers"
    },
    card: {
      type: mongoose.Types.ObjectId,
      ref: "cards"
    },
    typeTrafic: {
      type: String,
      required: true
    },
    activities: {
      type: []
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

const Trafic: Model<ITrafic> = model<ITrafic>("trafics", traficSchema);
export default Trafic;
