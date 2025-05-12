import Shift from "../models/shiftModel.js";
import mongoose from "mongoose";

export const startShift = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const shift = new Shift({
      userId: req.user.id,
      startTime: new Date(),
      startLocation: { latitude, longitude },
      status: "In Progress",
    });

    await shift.save();
    res.status(201).json({
      success: true,
      message: "Shift started successfully",
      shiftId: shift._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const pauseShift = async (req, res) => {
  try {
    const { shiftId } = req.params;
    const shift = await Shift.findById(shiftId);
    if (!shift) return res.status(404).json({ message: "Shift not found" });

    shift.breaks.push({ startTime: new Date() });
    shift.status = "Paused";
    await shift.save();

    res.status(200).json({ message: "Shift paused", shift });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const resumeShift = async (req, res) => {
  try {
    const { shiftId } = req.params;
    const shift = await Shift.findById(shiftId);
    if (!shift) return res.status(404).json({ message: "Shift not found" });

    const lastBreak = shift.breaks[shift.breaks.length - 1];
    if (!lastBreak || lastBreak.endTime) {
      return res.status(400).json({ message: "No paused break to resume" });
    }

    lastBreak.endTime = new Date();
    shift.status = "In Progress";
    await shift.save();

    res.status(200).json({ message: "Shift resumed", shift });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const endShift = async (req, res) => {
  try {
    const { shiftId } = req.params;
    const { latitude, longitude } = req.body;

    const shift = await Shift.findById(shiftId);
    if (!shift) return res.status(404).json({ message: "Shift not found" });

    shift.endTime = new Date();
    shift.endLocation = { latitude, longitude };
    shift.status = "Completed";

    const breakMinutes = shift.breaks.reduce((total, br) => {
      if (br.endTime) {
        const diff =
          (new Date(br.endTime) - new Date(br.startTime)) / (1000 * 60);
        return total + diff;
      }
      return total;
    }, 0);

    const totalMinutes =
      (new Date(shift.endTime) - new Date(shift.startTime)) / (1000 * 60);
    shift.totalHours = ((totalMinutes - breakMinutes) / 60).toFixed(2);

    await shift.save();

    res.status(200).json({ message: "Shift ended", shift });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const shiftStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    const latestShift = await Shift.findOne({ userId }).sort({ startTime: -1 });

    if (!latestShift) {
      return res.json({ success: true, shiftStatus: "Not Started" });
    }

    let shiftStatus = "Not Started";

    if (latestShift.endTime) {
      shiftStatus = "Completed";
    } else if (latestShift.breaks && latestShift.breaks.some((b) => !b.end)) {
      shiftStatus = "Paused";
    } else {
      shiftStatus = "In Progress";
    }

    return res.json({
      success: true,
      shiftStatus: latestShift.status,
      shiftId: latestShift._id,
    });
  } catch (error) {
    console.error("Shift status error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getShiftStatus = async (req, res) => {
  try {
    const shift = await Shift.findOne({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    if (!shift) {
      return res
        .status(200)
        .json({ success: true, shiftStatus: "Not Started" });
    }

    return res.status(200).json({
      success: true,
      shiftStatus: shift.status,
      shiftId: shift._id,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMyShiftHistory = async (req, res) => {
  try {
    const shifts = await Shift.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(shifts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTodayWorkedHours = async (req, res) => {
  try {
    const userId = req.user.id;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const shifts = await Shift.find({
      userId,
      startTime: { $gte: startOfDay, $lte: endOfDay },
      endTime: { $ne: null },
    });

    let totalMilliseconds = 0;

    shifts.forEach((shift) => {
      const start = new Date(shift.startTime);
      const end = new Date(shift.endTime);
      totalMilliseconds += end - start;
    });

    const totalHours = totalMilliseconds / (1000 * 60 * 60);

    res.status(200).json({
      totalWorkedHoursToday: totalHours.toFixed(2),
    });
  } catch (err) {
    console.error("Error getting worked hours:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getAllShifts = async (req, res) => {
  try {
    const shifts = await Shift.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(shifts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMonthlyReport = async (req, res) => {
  try {
    const { month, year } = req.query;
    const start = new Date(`${year}-${month}-01`);
    const end = new Date(start);
    end.setMonth(start.getMonth() + 1);

    const shifts = await Shift.find({
      userId: req.user.id,
      endTime: { $gte: start, $lt: end },
    });

    const totalHours = shifts.reduce(
      (sum, shift) => sum + parseFloat(shift.totalHours || 0),
      0
    );

    res.status(200).json({
      month,
      year,
      totalShifts: shifts.length,
      totalHours: totalHours.toFixed(2),
      shifts,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
