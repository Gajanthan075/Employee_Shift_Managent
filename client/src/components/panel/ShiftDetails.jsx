import React, { useState, useContext, useEffect } from "react";
import { Clock, MapPin, Pause, Play, StopCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContent } from "../../context/AppContext";

const ShiftDetails = () => {
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);
  const [shiftId, setShiftId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [shiftState, setShiftState] = useState("Not Started");

  const [location, setLocation] = useState({
    address: "",
    notes: "",
    latitude: null,
    longitude: null,
  });
  const [showLocationForm, setShowLocationForm] = useState(false);

  useEffect(() => {
    fetchShiftStatus();
    const user = getUserData();
    setUserId(user?._id);
  }, []);

  useEffect(() => {
    let timer;
    if (shiftState === "In Progress") {
      timer = setInterval(() => {
        setCurrentDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [shiftState]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getLocation = async () => {
    try {
      const loc = await getCurrentLocation();
      setLocation((prev) => ({
        ...prev,
        latitude: loc.latitude,
        longitude: loc.longitude,
      }));
    } catch (error) {
      toast.error(error);
    }
  };
  const reverseGeocode = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      return response.data.display_name || "Unknown location";
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
      return "Unknown location";
    }
  };

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported by your browser.");
      }
      setIsLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const address = await reverseGeocode(latitude, longitude);
          setIsLoadingLocation(false);
          resolve({ latitude, longitude, address });
        },
        (error) => {
          setIsLoadingLocation(false);
          reject("Location error: " + error.message);
        }
      );
    });
  };

  const fetchShiftStatus = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(`${backendUrl}/api/shifts/status`);
      if (response.data.success) {
        const shiftStatus =
          response.data.shiftStatus === "Ended"
            ? "Not Started"
            : response.data.shiftStatus;
        setShiftState(shiftStatus);
        setShiftId(response.data.shiftId);
        updateShiftState(shiftStatus);
      } else {
        toast.error("Failed to retrieve shift status");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  const updateShiftState = (status) => {
    switch (status) {
      case "Not Started":
        setShiftState("Not Started");
        break;
      case "In Progress":
        setShiftState("In Progress");
        break;
      case "Paused":
        setShiftState("Paused");
        break;
      case "Ended":
        setShiftState("Ended");
        break;
      default:
        setShiftState("Not Started");
    }
  };

  const startShift = async () => {
    try {
      const location = await getCurrentLocation();
      setLocation(location);
      const payload = {
        latitude: location.latitude,
        longitude: location.longitude,
        address: location.address,
      };

      const response = await axios.post(
        `${backendUrl}/api/shifts/start`,
        payload,
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message);
        setShiftId(response.data.shiftId);
        getUserData();
        setIsLoggedin(true);
        fetchShiftStatus();
        setCurrentDuration(0);
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
      const response = await axios.post(
        `${backendUrl}/api/shifts/pause/${shiftId}`,
        location,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      fetchShiftStatus();
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const resumeShift = async () => {
    if (!shiftId) return toast.error("Shift ID not found.");
    try {
      const location = await getCurrentLocation();
      const response = await axios.post(
        `${backendUrl}/api/shifts/resume/${shiftId}`,
        location,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      fetchShiftStatus();
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const endShift = async () => {
    if (!shiftId) return toast.error("Shift ID not found.");
    try {
      const location = await getCurrentLocation();
      const response = await axios.post(
        `${backendUrl}/api/shifts/end/${shiftId}`,
        location,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      fetchShiftStatus();
      setCurrentDuration(0);
    } catch (error) {
      toast.error(error.toString());
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">My Shift Manager</h2>
          <div className="flex items-center gap-2 mt-1 text-sm">
            <span
              className={`w-3 h-3 rounded-full ${
                shiftState === "Not Started"
                  ? "bg-gray-400"
                  : shiftState === "In Progress"
                  ? "bg-green-500"
                  : shiftState === "Paused"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            />
            {shiftState === "Not Started" && "Ready to start your shift"}
            {shiftState === "In Progress" && "Shift in progress"}
            {shiftState === "Paused" && "Shift paused"}
            {shiftState === "completed" && "Shift completed"}
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-lg font-medium">
            <Clock className="w-5 h-5" />
            {formatTime(currentDuration)}
          </div>

          <div className="flex gap-2">
            {shiftState === "Not Started" && (
              <button
                onClick={startShift}
                className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
              >
                <Play className="w-4 h-4" /> Start
              </button>
            )}
            {shiftState === "In Progress" && (
              <>
                <button
                  onClick={pauseShift}
                  className="border px-3 py-1 rounded flex items-center gap-1"
                >
                  <Pause className="w-4 h-4" /> Pause
                </button>
                <button
                  onClick={endShift}
                  className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                >
                  <StopCircle className="w-4 h-4" /> End
                </button>
              </>
            )}
            {shiftState === "Paused" && (
              <>
                <button
                  onClick={resumeShift}
                  className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
                >
                  <Play className="w-4 h-4" /> Resume
                </button>
                <button
                  onClick={endShift}
                  className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                >
                  <StopCircle className="w-4 h-4" /> End
                </button>
              </>
            )}
            {shiftState === "completed" && (
              <button
                onClick={startShift}
                className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
              >
                <Play className="w-4 h-4" /> New Shift
              </button>
            )}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="flex items-center font-medium text-lg">
              <MapPin className="h-4 w-4 mr-2" /> Location
            </h3>
            {(shiftState === "In Progress" || shiftState === "paused") && (
              <button
                className="text-blue-600 text-sm"
                onClick={() => setShowLocationForm(!showLocationForm)}
              >
                {showLocationForm ? "Hide" : "Edit"}
              </button>
            )}
          </div>

          {showLocationForm ? (
            <div className="bg-gray-100 p-4 rounded-md space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  name="address"
                  value={location.address}
                  onChange={handleLocationChange}
                  placeholder="Enter address"
                  className="w-full p-2 rounded border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <input
                  name="notes"
                  value={location.notes}
                  onChange={handleLocationChange}
                  placeholder="Location notes"
                  className="w-full p-2 rounded border"
                />
              </div>
              <div className="text-right">
                <button
                  onClick={() => {
                    setShowLocationForm(false);
                    getLocation();
                  }}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 p-3 rounded-md text-sm">
              <p>
                {location.address ? location.address : "No address specified"}
              </p>
              {location.notes && (
                <p className="text-gray-600">Notes: {location.notes}</p>
              )}
              {location.latitude && location.longitude && (
                <p className="text-gray-500">
                  Lat: {location.latitude}, Lng: {location.longitude}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShiftDetails;
