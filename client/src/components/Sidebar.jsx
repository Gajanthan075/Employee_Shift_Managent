import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Users, Settings, LogOut } from "lucide-react";
import { Menu } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden p-4 text-white bg-gray-800 fixed top-4 left-4 z-50 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu />
      </button>

      <aside
        className={`fixed z-40 top-0 left-0 h-full w-64 bg-gray-800 text-white p-6 space-y-6 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:h-auto`}
      >
        <div className="text-2xl font-extrabold text-center text-gray-200 mb-8">
          Employee Shift Tracker
        </div>

        <nav className="space-y-4">
          <Link
            to="/dashboard"
            className="flex items-center space-x-4 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-lg"
          >
            <span className="text-lg">🏠</span>
            <span className="text-lg">Dashboard</span>
          </Link>

          <Link
            to="/my-shifts"
            className="flex items-center space-x-4 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-lg"
          >
            <span className="text-lg">📄</span>
            <span className="text-lg">My Shifts</span>
          </Link>

          <Link
            to="/monthly-report"
            className="flex items-center space-x-4 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-lg"
          >
            <CalendarDays className="w-5 h-5 text-gray-400" />
            <span className="text-lg">Monthly Report</span>
          </Link>

          <Link
            to="/co-workers"
            className="flex items-center space-x-4 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-lg"
          >
            <Users className="w-5 h-5 text-gray-400" />
            <span className="text-lg">Co-workers</span>
          </Link>

          <Link
            to="/location"
            className="flex items-center space-x-4 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-lg"
          >
            <Settings className="w-5 h-5 text-gray-400" />
            <span className="text-lg">LocationLog</span>
          </Link>
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
