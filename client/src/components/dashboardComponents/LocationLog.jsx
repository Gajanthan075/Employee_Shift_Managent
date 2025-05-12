import React, { useContext, useEffect, useState } from "react";
import { AppContent } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const LocationLog = () => {
  const { userData, backendUrl } = useContext(AppContent);
  const [locations, setLocations] = useState([]);
  const [locationNames, setLocationNames] = useState({});

  const fetchLocationLogs = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/location/${userData._id}`);
      setLocations(res.data);
      fetchLocationNames(res.data);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to fetch location logs");
    }
  };

  const fetchLocationNames = async (logs) => {
    const locationPromises = logs.map(async (log) => {
      const { latitude, longitude } = log;
      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        return { id: log._id, name: res.data.display_name };
      } catch (err) {
        return { id: log._id, name: "Location not found" };
      }
    });

    // Resolve all location name promises and store them
    const names = await Promise.all(locationPromises);
    const nameMap = names.reduce((acc, { id, name }) => {
      acc[id] = name;
      return acc;
    }, {});
    setLocationNames(nameMap);
  };

  useEffect(() => {
    if (userData && userData._id) {
      fetchLocationLogs();
    }
  }, [userData]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Location Logs</h2>
      {userData ? (
        <div>
          {locations.length > 0 ? (
            <ul className="space-y-4">
              {locations.map((log) => (
                <li
                  key={log._id}
                  className="p-4 border rounded-lg shadow-lg bg-white"
                >
                  <div className="flex flex-col">
                    <p className="text-gray-600">
                      <strong>Type:</strong> {log.type}
                    </p>
                    <p className="text-gray-600">
                      <strong>Latitude:</strong> {log.latitude}
                    </p>
                    <p className="text-gray-600">
                      <strong>Longitude:</strong> {log.longitude}
                    </p>
                    <p className="text-gray-600">
                      <strong>Location:</strong>{" "}
                      {locationNames[log._id] || "Loading..."}
                    </p>
                    <p className="text-gray-600">
                      <strong>Time:</strong>{" "}
                      {new Date(log.timestamp).toLocaleString() ||
                        "Invalid Date"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No location logs found.</p>
          )}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default LocationLog;
