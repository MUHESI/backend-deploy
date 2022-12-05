import express from "express";
import TraficCtrl from "../controllers/traficCtrl";

const router = express.Router();

router.post("/create", TraficCtrl.createTrafic);
router.get("/all-items/:status", TraficCtrl.getAllTraficsByStatus);
router.get("/info-item/:id", TraficCtrl.getInfoTrafic);
router.get("/all-items-traveler/:id", TraficCtrl.getAllTraficsByTraveler);
router.get("/items-paginated/:status", TraficCtrl.getTraficsPaginated);

export default router;
