import express from "express";
import ResearchedPersonHistoryCtrl from "../controllers/researchedPersonHistoryCtrl";

const router = express.Router();

router.post(
  "/create",
  ResearchedPersonHistoryCtrl.creatResearchedPersonHistory
);

export default router;
