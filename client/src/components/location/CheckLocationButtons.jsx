import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContent } from "../../context/AppContext";
import MapDisplay from "../dashboardComponents/MapDisplay";

const CheckLocationButtons = ({ setLocation }) => {
  const { backendUrl } = useContext(AppContent);
  const [status, setStatus] = useState("");
  const [location] = useState(null);
  const [error, setError] = useState("");

  const handleLocation = async (type) => {
    setStatus("");
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to perform this action.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        try {
          const endpoint =
            type === "Check-In"
              ? `${backendUrl}/api/location/checkin`
              : `${backendUrl}/api/location/checkout`;

          const response = await axios.post(
            endpoint,
            { latitude, longitude },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 201) {
            setStatus(
              `${type} successful at (${latitude.toFixed(
                4
              )}, ${longitude.toFixed(4)})`
            );
          } else {
            setError(response.data.message || "Unexpected error occurred.");
          }
        } catch (err) {
          console.error(err);
          setError(
            "Error sending location: " +
              (err.response?.data?.error || err.message)
          );
        }
      },
      (error) => {
        console.error(error);
        setError("Failed to get location: " + error.message);
      }
    );
  };

  return (
    <div className="p-5 bg-gradient-to-r from-green-300 via-blue-100 to-purple-200 rounded-lg shadow-xl max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center text-white">
        🌍 Location Tracker
      </h2>

      {error && (
        <p className="text-red-500 mb-4 text-center" role="alert">
          {error}
        </p>
      )}

      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={() => handleLocation("Check-In")}
          className="px-6 py-3 bg-green-600 text-white rounded-full shadow-lg transform hover:scale-105 transition duration-200"
        >
          Check-In
        </button>

        <button
          onClick={() => handleLocation("Check-Out")}
          className="px-6 py-3 bg-red-600 text-white rounded-full shadow-lg transform hover:scale-105 transition duration-200"
        >
          Check-Out
        </button>
      </div>

      {status && (
        <p className="text-sm text-white text-center mb-2" role="status">
          {status}
        </p>
      )}

      {location && (
        <div className="mt-6">
          <MapDisplay
            latitude={location.latitude}
            longitude={location.longitude}
          />
        </div>
      )}
    </div>
  );
};

export default CheckLocationButtons;
