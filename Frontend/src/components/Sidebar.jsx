import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbArrowsExchange2, TbLogout } from "react-icons/tb";
import { BiWallet } from "react-icons/bi";
import { IoHelpOutline } from "react-icons/io5";
import { FaChartColumn } from "react-icons/fa6";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const optionData = [
    { text: "Dashboard", path: "/", icon: <LuLayoutDashboard /> },
    { text: "Transactions", path: "/transactions", icon: <TbArrowsExchange2 /> },
    { text: "Wallet", path: "/wallet", icon: <BiWallet /> },
    { text: "Analytics", path: "/analytics", icon: <FaChartColumn /> },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 z-20 lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 z-30 h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between py-6 px-4 overflow-y-auto transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          <div
            className="flex items-center gap-3 mb-10 px-2 cursor-pointer"
            onClick={() => {
              navigate("/");
              setIsOpen(false);
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold shadow-sm">
              F
            </div>
            <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
              Finset
            </h1>
          </div>

          <div className="flex flex-col gap-1">
            {optionData.map((elem, index) => {
              const isActive = location.pathname === elem.path;

              return (
                <div
                  key={index}
                  onClick={() => {
                    navigate(elem.path);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                    isActive
                      ? "bg-purple-50 text-purple-600 border border-purple-100 shadow-sm"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  }`}
                >
                  <span
                    className={`text-lg ${
                      isActive ? "text-purple-600" : "text-gray-400"
                    }`}
                  >
                    {elem.icon}
                  </span>

                  <span className="text-sm font-medium">
                    {elem.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-px bg-gray-200 mb-2" />

          <div className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg cursor-pointer transition">
            <IoHelpOutline className="text-lg" />
            <span className="text-sm">Help</span>
          </div>

          <div className="flex items-center gap-3 px-4 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer transition">
            <TbLogout className="text-lg" />
            <span className="text-sm">Log out</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;