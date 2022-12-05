import { Request, Response } from "express";
import { CtraficHttpStatusCode } from "../shared/constants/HTTPStatus";
import { ServerResponse } from "../shared/interceptors/serverResponse";
import ResearchedPersonHistory from "../models/researchedPersonHistoryModel";
import { IResearchedPersonHistory } from "../types/researchedPersonHistory";

const ResearchedPersonHistoryCtrl = {
  creatResearchedPersonHistory: async (req: Request, res: Response) => {
    const {
      entity,
      researchedPerson,
      distance,
      dateCreation,
      createdBy
    }: IResearchedPersonHistory = req.body;
    try {
      const researchedPersonHistory = await ResearchedPersonHistory.create({
        entity,
        distance,
        dateCreation,
        researchedPerson,
        createdBy
      });

      return new ServerResponse(
        CtraficHttpStatusCode.CREATED,
        "successfully",
        {
          success: true,
          results: { researchedPersonHistory }
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
  }
};

export default ResearchedPersonHistoryCtrl;
