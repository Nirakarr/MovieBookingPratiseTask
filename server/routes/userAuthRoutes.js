import express from "express";
import { userLogin, userRegister } from "../controller/userAuthController.js";
import {
  validateLogin,
  validateRegistration,
} from "../middleware/validation.js";

const router = express.Router();
router.post("/register", validateRegistration(), userRegister);
router.post("/login", validateLogin, userLogin);

export default router;
