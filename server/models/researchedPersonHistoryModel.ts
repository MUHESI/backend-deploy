import mongoose from "mongoose";
import { Model, model, Schema } from "mongoose";
import { IResearchedPersonHistory } from "../types/researchedPersonHistory";

const researchedPersonHistorySchema: Schema = new mongoose.Schema(
  {
    entity: {
      type: String,
      required: true
    },
    distance: {
      type: String,
      required: true
    },
    researchedPerson: {
      type: mongoose.Types.ObjectId,
      ref: "researchedPersons"
    },
    status: {
      type: String
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
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

const ResearchedPersonHistory: Model<IResearchedPersonHistory> =
  model<IResearchedPersonHistory>(
    "researchedPersonHistories",
    researchedPersonHistorySchema
  );

export default ResearchedPersonHistory;
