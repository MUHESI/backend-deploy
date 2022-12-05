import { Request, Response } from "express";
import { CtraficHttpStatusCode } from "../shared/constants/HTTPStatus";
import { ServerResponse } from "../shared/interceptors/serverResponse";
import ResearchedPerson from "../models/researchedPersonModel";
import { IResearchedPerson } from "../types/researchedPerson";
import { paginationModel } from "../utils/constantes";
import { logicPagination as helpPagination } from "../middleware/help.pagination";

const ResearchedPersonCtrl = {
  creatResearchedPerson: async (req: Request, res: Response) => {
    const {
      entity,
      fName,
      lName,
      addInfo,
      pictures,
      createdBy
    }: IResearchedPerson = req.body;

    try {
      const researchedPerson = await ResearchedPerson.create({
        dateCreation: new Date().getTime(),
        entity,
        fName,
        lName,
        addInfo,
        pictures,
        createdBy
      });

      return new ServerResponse(
        CtraficHttpStatusCode.CREATED,
        "successfully",
        {
          success: true,
          results: { researchedPerson }
        },
        null
      ).sendResponse(res);
    } catch (error: any) {
      console.clear();
      console.log("error", error);
      return new ServerResponse(
        CtraficHttpStatusCode.BAD_REQUEST,
        "Oops, something went wrong",
        null,
        error.message
      ).sendResponse(res);
    }
  },
  getResearchedPersonsPaginated: async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string);
      const limitPage = parseInt(req.query.limit as string);
      const results: any = {
        researchedPersons: [],
        pagination: paginationModel
      };
      const status = req.params.status;
      const lengthResults = await ResearchedPerson.countDocuments({
        status
      }).exec();
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
      const researchedPersons = await ResearchedPerson.find({ status })
        .limit(limitPage)
        .skip(startIndex)
        .populate(["createdBy"])

        .sort({ createdAt: -1 });
      results.researchedPersons = researchedPersons;
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
  getInfoResearchedPerson: async (req: Request, res: Response) => {
    try {
      const researchedPerson = await ResearchedPerson.findOne({
        _id: req.params.id
      })
        .populate(["createdBy"])
        .sort({ createdAt: -1 });
      return new ServerResponse(CtraficHttpStatusCode.OK, "successfully", {
        success: true,
        results: { researchedPerson }
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

export default ResearchedPersonCtrl;
