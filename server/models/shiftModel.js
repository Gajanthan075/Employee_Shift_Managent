import mongoose from "mongoose";

const breakSchema = new mongoose.Schema(
  {
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    reason: {
      type: String,
      enum: ["Lunch", "Coffee", "Personal", "Other"],
      default: "Other",
    },
  },
  { _id: false }
);

const shiftSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startTime: { type: Date },
    endTime: { type: Date },
    startLocation: {
      latitude: Number,
      longitude: Number,
    },
    endLocation: {
      latitude: Number,
      longitude: Number,
    },
    breaks: [breakSchema],
    totalHours: { type: Number },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Paused", "Completed"],
      default: "Not Started",
    },
  },
  { timestamps: true }
);

const Shift = mongoose.model("Shift", shiftSchema);
export default Shift;
