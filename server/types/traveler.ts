import { Document } from "mongoose";

export interface ITraveler extends Document {
  entity: string;
  lName: string;
  fName: string;
  email: string;
  sex: string;
  status: string;
  address: string;
  dateBorn: string;
  nationality: string;
  activities: string[];
  phone: string;
  pictures: string;
  createdBy: string;
  dateCreation: Number;
  _doc: object;
}
