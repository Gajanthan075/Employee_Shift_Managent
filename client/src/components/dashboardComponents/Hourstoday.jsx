import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContent } from "../../context/AppContext";

const Hourstoday = () => {
  const { backendUrl } = useContext(AppContent);
  const [hours, setHours] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHours = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${backendUrl}/api/shifts/today-hours`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHours(response.data.totalWorkedHoursToday);
      } catch (err) {
        console.error("Failed to fetch hours", err);
        setError("Failed to load worked hours.");
      } finally {
        setLoading(false);
      }
    };

    fetchHours();
  }, []);

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg text-white max-w-sm mx-auto text-center">
      <div className="flex flex-col items-center space-y-3">
        <h2 className="text-2xl font-bold">Today's Worked Hours</h2>

        {loading ? (
          <p className="text-sm text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : (
          <div className="text-4xl font-mono bg-black rounded-full px-6 py-4 border-2 border-yellow-500">
            {hours} hrs
          </div>
        )}
      </div>
    </div>
  );
};

export default Hourstoday;
