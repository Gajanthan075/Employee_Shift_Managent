import React, { useState, useContext, useEffect } from "react";
import { AppContent } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Hourstoday from "./Hourstoday";
import Loader from "./loader/Loader";

const ShiftStatus = () => {
  const { backendUrl } = useContext(AppContent);
  const [status, setStatus] = useState("Not Started");
  const [shiftId, setShiftId] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchShiftStatus = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${backendUrl}/api/shifts/status`);
        if (response.data.success) {
          setStatus(response.data.shiftStatus);
          setShiftId(response.data.shiftId);
        } else {
          toast.error("Failed to retrieve shift status");
        }
      } catch (error) {
        console.error("Error fetching shift status:", error);
        toast.error(error.response?.data?.message || "Server error");
      }
    };

    fetchShiftStatus();
  }, [backendUrl]);

  const isWorking = ["In Progress", "Paused", "Resumed"].includes(status);
  const liveStatus = isWorking ? "Working" : "Not Working";

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", { hour12: true });

  return (
    <div className="grid grid-cols-1 ">
      <div className="lg:col-span-1 bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md mx-auto text-gray-300 text-sm text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Current Shift Status
        </h2>

        <p className="text-lg text-white mb-2">
          <p className={isWorking ? "text-green-500" : "text-red-500"}>
            {liveStatus}
          </p>
        </p>

        <div className="text-lg text-white mb-2">
          <p>Clock in Time</p>
          <p>
            <span className="text-blue-400">{formatTime(currentTime)}</span>
          </p>
        </div>
        <Hourstoday />
        <Loader isWorking={isWorking} />
      </div>
    </div>
  );
};

export default ShiftStatus;
