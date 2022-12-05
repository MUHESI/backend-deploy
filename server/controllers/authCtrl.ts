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

const CLIENT_URL = `${process.env.BASE_URL}`;
/**
 * auth user
 */
const autCtrl = {
  /**
   * register user
   */
  register: async (req: Request, res: Response) => {
    try {
      const { lName, email, password, fName, role, entity, createdBy } =
        req.body;
      const user = await Users.findOne({ email });
      //
      if (user) {
        return new ServerResponse(
          CtraficHttpStatusCode.BAD_REQUEST,
          `Something went wrong`,
          { user: user },
          "email or phone number is already exists."
        ).sendResponse(res);
      }
      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = {
        entity,
        lName,
        email,
        role,
        createdBy,
        password: passwordHash,
        fName,
        dateCreation: new Date().getTime()
      };

      const activeToken = generateActiveToken({ newUser });
      const url = `${CLIENT_URL}/active/${activeToken}`;

      if (validateEmail(email)) {
        try {
          const user = new Users(newUser);
          await user.save();
          if (user._id) {
            return new ServerResponse(
              CtraficHttpStatusCode.CREATED,
              "successfully ",
              {
                success: true,
                NewUser: user,
                resMail: null
              }
            ).sendResponse(res);
          }
        } catch (err: any) {
          return res.status(500).json({ err });
        }
      }
      return res.status(500).json({ err: "email no valid" });
    } catch (err: any) {
      console.clear();
      console.log("err", err);
      return res.status(400).json({ msg: err.message });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      // const User = await Users.deleteMany();
      /*    const card = await CardModel.deleteMany();
      const Resear = await ResearchedPersonHistoryModel.deleteMany();
      const research = await researchedPersonModel.deleteMany(); */
      // const trvcModel = await TrvcModel.deleteMany();

      const { email, password } = req.body;

      const user = await Users.findOne({ email });

      if (!user)
        return new ServerResponse(
          CtraficHttpStatusCode.BAD_REQUEST,
          "Password or email is incorrect"
        ).sendResponse(res);
      // if user exists
      loginUser(user, password, res);
    } catch (err: any) {
      return new ServerResponse(
        CtraficHttpStatusCode.BAD_REQUEST,
        "Password or email is incorrect.",
        null,
        err.message
      ).sendResponse(res);
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie("refreshToken", { path: `/api/auth/refresh_token` });
      return new ServerResponse(CtraficHttpStatusCode.OK, "Logged out.", {
        success: true
      }).sendResponse(res);
    } catch (err: any) {
      console.log(err.message);
    }
  },
  verifyTokenUser: async (req: Request, res: Response) => {
    try {
      const autHeader: any | [] | string = req.headers["authorization"];
      const token = autHeader && autHeader.split(" ")[1];
      console.clear();
      // console.log("token", token);
      console.log("autHeader", autHeader);

      if (!token)
        return new ServerResponse(
          CtraficHttpStatusCode.NOT_FOUND,
          "token Not found"
        ).sendResponse(res);

      const pre = `${process.env.ACCESS_TOKEN_SECRET}`;

      /*   const decoded = <IToken>(
        jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
      ); */
      console.log("pre", pre);
      // console.log("decoded :>> ", decoded);
      // console.log("token :>> ", token);

      /*      if (!decoded.user) {
        return new ServerResponse(
          CtraficHttpStatusCode.NOT_FOUND,
          "token Not found,  Please login Now",
          { decoded }
        ).sendResponse(res);
      } */

      return new ServerResponse(CtraficHttpStatusCode.OK, "successfully ", {
        success: true,
        // user: decoded.user,
        accessToken: token
      }).sendResponse(res);
    } catch (err: any) {
      console.log(err.message);
    }
  },

  refreshToken: async (req: Request, res: Response) => {
    try {
      const r_token = req.cookies.refreshToken;

      if (!r_token)
        return res.status(400).json({ msg: "No token, Please login Now !" });
      const decoded = <IToken>(
        jwt.verify(r_token, `${process.env.REFRRESH_TOKEN_SECRET}`)
      );
      if (!decoded.id)
        return res.status(400).json({ msg: " Please login Now." });
      const user = await Users.findById(decoded.id).select("-password");
      if (!user)
        return res.status(400).json({ msg: " This account does not exist! " });
      const access_token = generateAccessToken({ id: user._id });
      return res.json({ access_token, user });
    } catch (err: any) {
      console.log(err.message);
    }
  }
};
const loginUser = async (user: IUser, password: string, res: Response) => {
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return new ServerResponse(
      CtraficHttpStatusCode.BAD_REQUEST,
      "Password or email is incorrect."
    ).sendResponse(res);

  const userToken = { ...user._doc, password: "" };

  const accessToken = generateAccessToken({ user: userToken });
  const refreshToken = generateRefreshToken({ user: userToken });
  res.cookie("refreshToken", accessToken, {
    httpOnly: true,
    path: `/api/auth/refresh_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
  });
  return new ServerResponse(CtraficHttpStatusCode.OK, "Login success.", {
    success: true,
    accessToken,
    user: { ...user._doc, accessToken, password: "" }
  }).sendResponse(res);
};

export default autCtrl;
