import mongoose from "mongoose";
import { Model, model, Schema } from "mongoose";
import { IResearchedPerson } from "../types/researchedPerson";

const researchedPersonSchema: Schema = new mongoose.Schema(
  {
    entity: {
      type: String,
      required: true
    },
    fName: {
      type: String,
      // required: true,
      trim: true
    },
    lName: {
      type: String,
      trim: true
      // required: true
    },
    status: {
      type: String,
      default: "ON_PENDING",
      required: true
    },
    addInfo: {
      type: String
    },
    pictures: {
      type: [],
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

const ResearchedPerson: Model<IResearchedPerson> = model<IResearchedPerson>(
  "researchedPersons",
  researchedPersonSchema
);

export default ResearchedPerson;
