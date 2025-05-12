import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContent } from "../../context/AppContext";

const ShiftOperation = () => {
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);
  const [status, setStatus] = useState("Not Started");
  const [shiftId, setShiftId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showStartModal, setShowStartModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    fetchShiftStatus();
    const user = getUserData();
    setUserId(user?._id);
  }, []);

  const fetchShiftStatus = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(`${backendUrl}/api/shifts/status`);
      if (response.data.success) {
        const shiftStatus =
          response.data.shiftStatus === "Ended"
            ? "Not Started"
            : response.data.shiftStatus;
        setStatus(shiftStatus);
        setShiftId(response.data.shiftId);
      } else {
        toast.error("Failed to retrieve shift status");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported by your browser.");
      }
      setIsLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLoadingLocation(false);
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setIsLoadingLocation(false);
          reject("Location error: " + error.message);
        }
      );
    });
  };

  const startShift = async () => {
    try {
      const location = await getCurrentLocation();
      const payload = {
        latitude: location.latitude,
        longitude: location.longitude,
      };

      const response = await axios.post(
        `${backendUrl}/api/shifts/start`,
        payload,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message);
        setShiftId(response.data.shiftId);
        getUserData();
        setIsLoggedin(true);
        fetchShiftStatus();
      } else {
        toast.error(response.data.message || "Failed to start shift");
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const pauseShift = async () => {
    if (!shiftId) return toast.error("Shift ID not found.");
    try {
      const location = await getCurrentLocation();
      const payload = {
        latitude: location.latitude,
        longitude: location.longitude,
      };

      const response = await axios.post(
        `${backendUrl}/api/shifts/pause/${shiftId}`,
        payload,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message);
        fetchShiftStatus();
      } else {
        toast.error(response.data.message || "Failed to pause shift");
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const resumeShift = async () => {
    if (!shiftId) return toast.error("Shift ID not found.");
    try {
      const location = await getCurrentLocation();
      const payload = {
        latitude: location.latitude,
        longitude: location.longitude,
      };

      const response = await axios.post(
        `${backendUrl}/api/shifts/resume/${shiftId}`,
        payload,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message);
        fetchShiftStatus();
      } else {
        toast.error(response.data.message || "Failed to resume shift");
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const endShift = async () => {
    if (!shiftId) return toast.error("Shift ID not found.");
    try {
      const location = await getCurrentLocation();
      const payload = {
        latitude: location.latitude,
        longitude: location.longitude,
      };

      const response = await axios.post(
        `${backendUrl}/api/shifts/end/${shiftId}`,
        payload,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message);
        fetchShiftStatus();
      } else {
        toast.error(response.data.message || "Failed to end shift");
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md mx-auto text-gray-300 text-sm text-center relative">
      <h2 className="text-2xl font-semibold text-white mb-4">Shift Manager</h2>

      <p className="text-lg text-white mb-4">
        Current Status:{" "}
        <span className="text-green-400 font-medium">{status}</span>
      </p>

      {isLoadingLocation && (
        <p className="text-yellow-300 mb-4">Fetching location...</p>
      )}

      <div className="flex flex-col gap-3">
        <button
          onClick={() => setShowStartModal(true)}
          className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-md text-sm font-semibold"
          disabled={
            !(status === "Not Started" || status === "Completed") ||
            isLoadingLocation
          }
        >
          Start Shift
        </button>

        <button
          onClick={pauseShift}
          className="bg-yellow-600 hover:bg-yellow-500 text-white py-2 px-4 rounded-md text-sm font-semibold"
          disabled={status !== "In Progress" || isLoadingLocation}
        >
          Pause Shift
        </button>

        <button
          onClick={resumeShift}
          className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md text-sm font-semibold"
          disabled={status !== "Paused" || isLoadingLocation}
        >
          Resume Shift
        </button>

        <button
          onClick={() => setShowEndModal(true)}
          className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md text-sm font-semibold"
          disabled={
            status === "Not Started" || status === "Ended" || isLoadingLocation
          }
        >
          End Shift
        </button>
      </div>

      {/* End Modal */}
      {showEndModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-black">
            <h3 className="text-xl font-semibold mb-4">Confirm End Shift</h3>
            <p className="mb-4 text-sm">
              This will automatically capture your current location to end the
              shift.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEndModal(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await endShift();
                  setShowEndModal(false);
                }}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Confirm End
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Start Modal */}
      {showStartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-black">
            <h3 className="text-xl font-semibold mb-4">Start New Shift</h3>
            <p className="mb-4 text-sm">
              This will start a new shift and capture your current location.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowStartModal(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await startShift();
                  setShowStartModal(false);
                }}
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Confirm Start
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShiftOperation;
