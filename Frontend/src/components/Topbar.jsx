import React from "react";
import { FiSearch, FiBell, FiMenu } from "react-icons/fi";
import { useRole } from "../context/RoleContext";
import { useLocation } from "react-router-dom";

const Topbar = ({ setIsOpen }) => {
  const { role, setRole } = useRole();
  const location = useLocation();

  const titles = {
    "/": "Dashboard",
    "/transactions": "Transactions",
    "/wallet": "Wallet",
    "/analytics": "Analytics",
    "/settings": "Settings",
  };

  return (
    <header className="w-full max-w-full bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden text-gray-600"
        >
          <FiMenu className="text-xl" />
        </button>

        <h1 className="text-lg md:text-xl font-semibold text-gray-800 tracking-tight">
          {titles[location.pathname] || "Dashboard"}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 hover:bg-gray-200 transition px-3 py-2 rounded-lg">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm placeholder:text-gray-400 w-32 lg:w-48"
          />
        </div>

        {/* Role */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="text-xs md:text-sm border border-gray-200 rounded-lg px-2 md:px-3 py-1.5 md:py-2 bg-white hover:border-gray-300 transition outline-none"
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>

        {/* Notification */}
        <div className="relative cursor-pointer group">
          <FiBell className="text-lg md:text-xl text-gray-600 group-hover:text-gray-800 transition" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white flex items-center justify-center text-sm font-semibold shadow-sm">
            G
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;