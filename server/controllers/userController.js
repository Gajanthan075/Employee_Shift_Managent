import userModel from "../models/userModel.js";
import shiftModel from "../models/shiftModel.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }
    res.json({
      success: true,
      userData: {
        _id: user._id,
        name: user.name,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find(
      {},
      "name email isAccountVerified profileImage"
    );

    const usersWithStatus = await Promise.all(
      users.map(async (user) => {
        const latestShift = await shiftModel
          .findOne({ userId: user._id })
          .sort({ createdAt: -1 });

        const isWorking =
          latestShift &&
          ["In Progress", "Paused", "Resumed"].includes(latestShift.status);
        const status = isWorking ? "Working" : "Not Working";

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAccountVerified: user.isAccountVerified,
          profileImage: user.profileImage || null,
          status,
          lastActivity: latestShift?.updatedAt || null,
        };
      })
    );

    res.json({ success: true, users: usersWithStatus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
