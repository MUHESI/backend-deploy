import { Document } from "mongoose";

export interface IPagination {
  nbOfPages: number | any;
  next?: number;
  previous?: number;
  nbOfDocs: number;
  limit: number;
  page?: number | string;
}

export interface IUser extends Document {
  fName: string;
  lName: string;
  email: string;
  password: string;
  status: string;
  role: string;
  active: boolean;
  phone: string;
  cover: string;
  onholyday: boolean;
  createdBy: string;
  _doc: object;
}

export interface INewUser {
  lName: string;
  fName: string;
  email: string;
  password: string;
  role: string;
  status: string;
  user: any;
}

export interface IToken extends INewUser {
  id?: string;
  newUser: INewUser;
  iat: number;
  exp: number;
}
