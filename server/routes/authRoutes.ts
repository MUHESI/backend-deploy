import express from "express";
import { validRegister } from "../middleware/valid";
import autCtrl from "../controllers/authCtrl";

const router = express.Router();

router.post("/register", validRegister, autCtrl.register);
router.post("/login", autCtrl.login);
router.get("/logout", autCtrl.logout);
router.get("/refresh_token", autCtrl.refreshToken);
router.get("/verify-auth", autCtrl.verifyTokenUser);

export default router;
