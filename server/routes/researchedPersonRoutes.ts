import express from "express";
import ResearchedPersonCtrl from "../controllers/researchedPersonCtrl";

const router = express.Router();

router.post("/create", ResearchedPersonCtrl.creatResearchedPerson);
router.get("/info-item/:id", ResearchedPersonCtrl.getInfoResearchedPerson);

router.get(
  "/items-paginated/:status",
  ResearchedPersonCtrl.getResearchedPersonsPaginated
);

export default router;
