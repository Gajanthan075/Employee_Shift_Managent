import LocationLog from "../models/locationLog.js";

export const checkIn = async (req, res) => {
  try {
    const userId = req.user.id;
    const { latitude, longitude } = req.body;

    const location = new LocationLog({
      userId,
      type: "Check-In",
      latitude,
      longitude,
    });

    await location.save();
    res.status(201).json({ message: "Check-in location saved", location });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const checkOut = async (req, res) => {
  try {
    const userId = req.user.id;
    const { latitude, longitude } = req.body;

    const location = new LocationLog({
      userId,
      type: "Check-Out",
      latitude,
      longitude,
    });

    await location.save();
    res.status(201).json({ message: "Check-out location saved", location });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllLocations = async (req, res) => {
  try {
    const userId = req.params.userId;
    const locations = await LocationLog.find({ userId });
    res.status(200).json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
