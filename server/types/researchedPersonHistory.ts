import { Document } from "mongoose";

export interface IResultsFound {
  traveler: string;
  simularity: number;
}
interface IAge {
  age: number;
  estimation: number;
}
interface IEmotion {
  emotion: number;
  estimation: number;
}
export interface IResearchedPersonHistory extends Document {
  researchedPerson: string;
  entity: string;
  distance: number | string;
  dateCreation: number;
  createdBy: string;
  status: string;
  _doc: object;
}
