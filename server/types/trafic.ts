import { Document } from "mongoose";

export enum TypeTrafic {
  OUTPUT = "OUTPUT",
  INPUT = "INPUT"
}
export interface ITrafic extends Document {
  entity: string;
  traveler: string;
  card: string;
  typeTrafic: TypeTrafic;
  activities: string[];
  dateCreation: string;
  createdBy: string;
  _doc: object;
}

// export interface ITrafic extends Document {
//   entity: string;
//   typecard: string;
//   validity: string;
//   code: string;
//   dateCreation: string;
//   createdBy: string;
//   _doc: object;
// }
