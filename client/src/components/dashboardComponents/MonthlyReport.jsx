import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContent } from "../../context/AppContext";
import AllUsers from "../panel/AllUser";

const MonthlyReport = () => {
  const { backendUrl } = useContext(AppContent);
  const [report, setReport] = useState({ totalHours: 0, shifts: [] });
  const [coworkers, setCoworkers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // or your auth logic

        const reportRes = await axios.get(
          backendUrl + "/api/shifts/monthly-report",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setReport(reportRes.data);

        const coworkerRes = await axios.get(
          backendUrl + "/api/shifts/monthly-report",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCoworkers(coworkerRes.data.coworkers);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, []);

  // Avg hours calculation
  const avgMinutes =
    report.shifts.length > 0
      ? (report.totalHours * 60) / report.shifts.length
      : 0;
  const avgHours = Math.floor(avgMinutes / 60);
  const avgMins = Math.floor(avgMinutes % 60);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Monthly Report */}
      <div className="bg-gray-800 p-4 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-2">Monthly Report</h2>
        <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-300">
          {Array.from({ length: 31 }, (_, i) => {
            const day = i + 1;
            const hasShift = report.shifts.some(
              (shift) => new Date(shift.startTime).getDate() === day
            );
            return (
              <span
                key={i}
                className={`p-1 rounded ${
                  hasShift ? "bg-green-600 text-white" : ""
                }`}
              >
                {day}
              </span>
            );
          })}
        </div>
        <div className="mt-4 flex justify-between text-sm text-gray-400">
          <div>
            Total Hours: <span className="text-white">{report.totalHours}</span>
          </div>
          <div>
            Avg:{" "}
            <span className="text-white">
              {avgHours}h {avgMins.toString().padStart(2, "0")}m
            </span>
          </div>
          <div>
            Break:{" "}
            <span className="text-white">
              {/* Optional: You can compute total break time here if added to backend */}
              -
            </span>
          </div>
        </div>
      </div>

      {/* Coworkers */}
      <AllUsers />
    </div>
  );
};

export default MonthlyReport;
