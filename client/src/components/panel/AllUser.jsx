// File: src/pages/LastActivity.jsx
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContent } from "../../context/AppContext";

const AllUser = () => {
  const { backendUrl } = useContext(AppContent);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${backendUrl}/api/user/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="lg:col-span-1 bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md mx-auto text-gray-300 text-sm text-center">
      <h2 className="text-xl font-bold mb-4">Last Activity</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user._id}
            className="p-3 border rounded shadow-sm flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <img
                src={user.profileImage || "default-avatar.png"}
                alt={user.name[0]}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <span className="font-semibold">{user.name}</span>
                <p className="text-sm text-gray-400">
                  Last Activity: {user.lastActivity || "Not Available"}
                </p>
              </div>
            </div>

            <span
              className={`text-sm ${
                user.status === "Working" ? "text-green-500" : "text-red-500"
              }`}
            >
              {user.status || "Not Working"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllUser;
