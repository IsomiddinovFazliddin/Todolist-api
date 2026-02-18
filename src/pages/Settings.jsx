// pages/Settings.jsx
import React, { useState } from "react";
import { FiUser, FiBell, FiSettings } from "react-icons/fi";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FiSettings /> Sozlamalar
      </h1>

      {/* Profil Sozlamalari */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6 transition-all duration-300">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FiUser /> Profil
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Ism</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-300 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-300 text-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Umumiy Sozlamalar */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6 transition-all duration-300">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FiBell /> Umumiy Sozlamalar
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Bildirishnomalar</span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="h-5 w-5 accent-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Task Sozlamalari */}
      <div className="bg-white shadow-md rounded-xl p-6 transition-all duration-300">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FiSettings /> Task Sozlamalari
        </h2>
        <p className="text-gray-600">
          Default filter va sorting opsiyalarini bu yerda sozlashingiz mumkin.
        </p>
      </div>
    </div>
  );
}

export default Settings;
