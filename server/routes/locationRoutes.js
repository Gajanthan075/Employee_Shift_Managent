import express from "express";
import {
  checkIn,
  checkOut,
  getAllLocations,
} from "../controllers/locationController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/checkin", userAuth, checkIn);
router.post("/checkout", userAuth, checkOut);
router.get("/:userId", userAuth, getAllLocations);

export default router;
