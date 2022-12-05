import express from "express";
import TravelerCtrl, { CardCtrl } from "../controllers/travelerCtrl";

const router = express.Router();

router.post("/create", TravelerCtrl.createTraveler);
router.get("/all-items/:status", TravelerCtrl.getAllTravelersByStatus);
router.get("/items-paginated/:status", TravelerCtrl.getTravelersPaginated);
router.get("/all-items-ref", TravelerCtrl.getAllTravelersRef);
router.get("/info-item/:id", TravelerCtrl.getInfoTraveler);
router.put("/:id", TravelerCtrl.updateTraveler);

//
router.get("/card/info-item/:code", CardCtrl.getInfoCardByCode);

export default router;
