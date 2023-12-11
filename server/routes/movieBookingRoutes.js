import express from "express";
import { movieBookingController } from "../controller/bookingController.js";

const router = express.Router();

router.post("/movieBooking/:movieId/:userId", movieBookingController);

export default router;
