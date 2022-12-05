import { Request, Response } from "express";
import { CtraficHttpStatusCode } from "../shared/constants/HTTPStatus";
import { ServerResponse } from "../shared/interceptors/serverResponse";
import Traveler from "../models/travelerModel";
import Card from "../models/cardModel";
import { ICard } from "../types/card";
import { ITraveler } from "../types/traveler";
import { paginationModel } from "../utils/constantes";
import { logicPagination as helpPagination } from "../middleware/help.pagination";
const ObjectID = require("mongoose").Types.ObjectId;

const TravelerCtrl = {
  createTraveler: async (req: Request, res: Response) => {
    const { infoCard, infoTraveler } = req.body;
    const {
      entity,
      createdBy,
      fName,
      lName,
      email,
      sex,
      address,
      dateBorn,
      nationality,
      activities,
      pictures,
      phone
    }: ITraveler = infoTraveler;

    try {
      const traveler = await Traveler.create({
        dateCreation: new Date().getTime(),
        createdBy,
        fName,
        lName,
        email,
        sex,
        address,
        dateBorn,
        nationality,
        activities,
        pictures,
        phone
      });

      const lastCard = await Card.findOne({ entity }).sort({ createdAt: -1 });
      let codeCard = `${entity}-${infoCard.typecard}`;

      if (lastCard) {
        const lastCode = lastCard.code;
        const codeTab = lastCode.split("-");
        codeCard = `${codeCard}-${Number(codeTab[codeTab.length - 1]) + 1} `;
      } else {
        codeCard = `${codeCard}-1`;
      }
      const card: ICard = await Card.create({
        dateCreation: new Date().getTime(),
        entity,
        traveler: traveler._id,
        typecard: infoCard.typecard,
        validity: infoCard.validity,
        code: codeCard.trim(),
        createdBy
      });
      return new ServerResponse(
        CtraficHttpStatusCode.CREATED,
        "successfully",
        {
          success: true,
          results: { traveler, card }
        },
        null
      ).sendResponse(res);
    } catch (error: any) {
      console.clear();
      console.log("error :>> ", error);
      return new ServerResponse(
        CtraficHttpStatusCode.BAD_REQUEST,
        "Oops, something went wrong",
        null,
        error.message
      ).sendResponse(res);
    }
  },
  getAllTravelersByStatus: async (req: Request, res: Response) => {
    try {
      const travelers = await Traveler.find({ status: req.params.status })
        .populate(["createdBy"])
        .sort({ createdAt: -1 });
      return new ServerResponse(CtraficHttpStatusCode.OK, "successfully", {
        success: true,
        results: { travelers }
      }).sendResponse(res);
    } catch (err: any) {
      return new ServerResponse(
        CtraficHttpStatusCode.BAD_REQUEST,
        `Something went wrong`,
        null,
        err.message
      ).sendResponse(res);
    }
  },
  getAllTravelersRef: async (req: Request, res: Response) => {
    try {
      // db.collection.find({"field_name":{$ne:null}})
      const results: any = { travelers: [], pagination: paginationModel };

      const travelers = await Traveler.find({ pictures: { $ne: [] } }).sort({
        createdAt: -1
      });
      results.travelers = travelers;
      return new ServerResponse(CtraficHttpStatusCode.OK, "successfully", {
        results,
        success: true
      }).sendResponse(res);
    } catch (err: any) {
      return new ServerResponse(
        CtraficHttpStatusCode.BAD_REQUEST,
        `Something went wrong`,
        null,
        err.message
      ).sendResponse(res);
    }
  },

  getTravelersPaginated: async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string);
      const limitPage = parseInt(req.query.limit as string);
      const results: any = { travelers: [], pagination: paginationModel };
      const status = req.params.status;
      const lengthResults = await Traveler.countDocuments({ status }).exec();
      if (lengthResults === 0)
        return new ServerResponse(CtraficHttpStatusCode.OK, "successfully", {
          results,
          success: true
        }).sendResponse(res);
      const { pagination, startIndex } = helpPagination(
        page,
        limitPage,
        lengthResults
      );
      const travelers = await Traveler.find({ status })
        .limit(limitPage)
        .skip(startIndex)
        .populate(["createdBy"])

        .sort({ createdAt: -1 });
      results.travelers = travelers;
      results.pagination = pagination;
      return new ServerResponse(CtraficHttpStatusCode.OK, "successfully", {
        results,
        success: true
      }).sendResponse(res);
    } catch (err: any) {
      return new ServerResponse(
        CtraficHttpStatusCode.BAD_REQUEST,
        `Something went wrong`,
        null,
        err.message
      ).sendResponse(res);
    }
  },
  getInfoTraveler: async (req: Request, res: Response) => {
    try {
      const traveler = await Traveler.findOne({
        _id: req.params.id
      })
        .populate(["createdBy"])
        .sort({ createdAt: -1 });

      return new ServerResponse(CtraficHttpStatusCode.OK, "successfully", {
        success: true,
        results: { traveler }
      }).sendResponse(res);
    } catch (err: any) {
      return new ServerResponse(
        CtraficHttpStatusCode.BAD_REQUEST,
        `Something went wrong`,
        null,
        err.message
      ).sendResponse(res);
    }
  },
  updateTraveler: async (req: Request, res: Response) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unkown : " + req.params.id);
    try {
      const traveler = await Traveler.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      return new ServerResponse(
        CtraficHttpStatusCode.OK,
        "successfully",
        { results: { traveler }, success: true },
        null
      ).sendResponse(res);
    } catch (err: any) {
      return new ServerResponse(
        CtraficHttpStatusCode.BAD_REQUEST,
        "something went wrong.",
        null,
        err.message
      ).sendResponse(res);
    }
  }
};

export default TravelerCtrl;

export const CardCtrl = {
  getInfoCardByCode: async (req: Request, res: Response) => {
    try {
      const card = await Card.findOne({
        code: req.params.code
      })
        .populate(["createdBy", "traveler"])
        .sort({ createdAt: -1 });
      console.clear();
      console.log("card", card);
      return new ServerResponse(
        CtraficHttpStatusCode.OK,
        "successfully",
        {
          success: !card ? false : true,
          results: { card }
        },
        null
      ).sendResponse(res);
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
