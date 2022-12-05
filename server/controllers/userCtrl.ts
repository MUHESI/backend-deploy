import { Request, Response } from "express";
import { CtraficHttpStatusCode } from "../shared/constants/HTTPStatus";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateActiveToken,
  generateAccessToken,
  generateRefreshToken
} from "../config/generateToken";
import { validateEmail, validPhone, validRegister } from "../middleware/valid";
import { IToken, IUser } from "../config/interfaces";
import { ServerResponse } from "../shared/interceptors/serverResponse";

const userCtrl = {
  getAllUsersByStatus: async (req: Request, res: Response) => {
    try {
      const users = await Users.find({ status: req.params.status })
        .populate(["createdBy"])
        .sort({ createdAt: -1 });

      return new ServerResponse(CtraficHttpStatusCode.OK, "successfully", {
        success: true,
        results: { users }
      }).sendResponse(res);
    } catch (err: any) {
      return new ServerResponse(
        CtraficHttpStatusCode.BAD_REQUEST,
        `Something went wrong`,
        null,
        err.message
      ).sendResponse(res);
    }
  }
};

export default userCtrl;
