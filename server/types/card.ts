import { Document } from "mongoose";

export interface ICard extends Document {
  entity: string;
  typecard: string;
  validity: string;
  code: string;
  dateCreation: string;
  createdBy: string;
  traveler: string;
  _doc: object;
}
