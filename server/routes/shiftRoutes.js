import express from "express";
import {
  startShift,
  pauseShift,
  resumeShift,
  endShift,
  getMyShiftHistory,
  getAllShifts,
  getMonthlyReport,
  shiftStatus,
  getShiftStatus,
  getTodayWorkedHours,
} from "../controllers/shiftController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/start", userAuth, startShift);
router.post("/pause/:shiftId", userAuth, pauseShift);
router.post("/resume/:shiftId", userAuth, resumeShift);
router.post("/end/:shiftId", userAuth, endShift);

router.get("/status", userAuth, shiftStatus);

router.get("/today-hours", userAuth, getTodayWorkedHours);

router.get("/my-history", userAuth, getMyShiftHistory);

router.get("/all", userAuth, getAllShifts);

router.get("/monthly-report", userAuth, getMonthlyReport);

export default router;
