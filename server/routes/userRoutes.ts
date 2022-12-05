import express from "express";
import { validRegister } from "../middleware/valid";
import userCtrl from "../controllers/userCtrl";

const router = express.Router();

// router.post("/register", validRegister, autCtrl.register);
// router.post("/login", autCtrl.login);
router.get("/all-items/:status", userCtrl.getAllUsersByStatus);

export default router;
