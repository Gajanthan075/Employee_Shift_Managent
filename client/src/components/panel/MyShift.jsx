import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ShiftDetails from "./ShiftDetails";
import { AppContent } from "../../context/AppContext";

const MyShift = () => {
  const { backendUrl } = useContext(AppContent);
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShiftHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${backendUrl}/api/shifts/my-history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setShifts(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch shift history.");
      } finally {
        setLoading(false);
      }
    };

    fetchShiftHistory();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-100 to-gray-600">
      <h1 className="text-3xl font-bold mb-4">My Shift Management</h1>
      <div className="">
        <ShiftDetails />
      </div>
      <h2 className="text-2xl font-bold mb-4">My Shift History</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && shifts.length === 0 && (
        <p>No shift history found.</p>
      )}

      {!loading && shifts.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Start Time</th>
                <th className="p-3 border">End Time</th>
                <th className="p-3 border">Total Hours</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift) => (
                <tr key={shift._id} className="text-center border-t">
                  <td className="p-2 border">
                    {new Date(shift.startTime).toLocaleString()}
                  </td>
                  <td className="p-2 border">
                    {shift.endTime
                      ? new Date(shift.endTime).toLocaleString()
                      : "Ongoing"}
                  </td>
                  <td className="p-2 border">{shift.totalHours || "0.00"}</td>
                  <td className="p-2 border">{shift.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyShift;
