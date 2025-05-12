import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/dashboardComponents/DashboardHeader";
import Shiftstatus from "../components/dashboardComponents/Shiftstatus";
import MapSection from "../components/dashboardComponents/MapSection";
import MonthlyReport from "../components/dashboardComponents/MonthlyReport";

export default function Dashboard() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 space-y-6 overflow-y-auto">
        <DashboardHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Shiftstatus />
          <MapSection />
        </div>

        <MonthlyReport />
      </main>
    </div>
  );
}
