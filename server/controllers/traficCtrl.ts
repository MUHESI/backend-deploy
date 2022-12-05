import { Request, Response } from "express";
import { CtraficHttpStatusCode } from "../shared/constants/HTTPStatus";
import { ServerResponse } from "../shared/interceptors/serverResponse";
import { ITrafic } from "../types/trafic";
import Trafic from "../models/traficModel";
import { paginationModel } from "../utils/constantes";
import { logicPagination as helpPagination } from "../middleware/help.pagination";

const TraficCtrl = {
  createTrafic: async (req: Request, res: Response) => {
    const {
      entity,
      traveler,
      card,
      typeTrafic,
      createdBy,
      activities
    }: ITrafic = req.body;

    try {
      const trafic = await Trafic.create({
        dateCreation: new Date().getTime(),
        entity,
        traveler,
        card,
        typeTrafic,
        createdBy,
        activities
      });

      return new ServerResponse(
        CtraficHttpStatusCode.CREATED,
        "successfully",
        {
          success: true,
          results: { trafic }
        },
        null
      ).sendResponse(res);
    } catch (error: any) {
      return new ServerResponse(
        CtraficHttpStatusCode.BAD_REQUEST,
        "Oops, something went wrong",
        null,
        error.message
      ).sendResponse(res);
    }
  },
  getAllTraficsByStatus: async (req: Request, res: Response) => {
    try {
      const trafics = await Trafic.find({ status: req.params.status })
        .populate(["createdBy", "traveler", "card"])
        .sort({ createdAt: -1 });
      return new ServerResponse(CtraficHttpStatusCode.OK, "successfully", {
        success: true,
        results: { trafics }
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
  getInfoTrafic: async (req: Request, res: Response) => {
    try {
      const trafic = await Trafic.findOne({
        _id: req.params.id
      })
        .populate(["createdBy"])
        .sort({ createdAt: -1 });
      return new ServerResponse(CtraficHttpStatusCode.OK, "successfully", {
        success: true,
        results: { trafic }
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
  getAllTraficsByTraveler: async (req: Request, res: Response) => {
    try {
      const trafics = await Trafic.find({ traveler: req.params.id })
        .populate(["createdBy", "traveler", "card"])
        .sort({ createdAt: -1 });
      return new ServerResponse(CtraficHttpStatusCode.OK, "successfully", {
        success: true,
        results: { trafics }
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
  getTraficsPaginated: async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string);
      const limitPage = parseInt(req.query.limit as string);
      const results: any = { trafics: [], pagination: paginationModel };
      const status = req.params.status;
      const lengthResults = await Trafic.countDocuments({ status }).exec();
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
      const trafics = await Trafic.find({ status })
        .limit(limitPage)
        .skip(startIndex)
        .populate(["createdBy", "traveler"])

        .sort({ createdAt: -1 });
      results.trafics = trafics;
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
  }
};

export default TraficCtrl;
