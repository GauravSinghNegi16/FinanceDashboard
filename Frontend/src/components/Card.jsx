import React from "react";

const Card = ({ title, amount, change }) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-200">
      {/* Title */}
      <p className="text-sm text-gray-500">{title}</p>

      {/* Amount */}
      <h2 className="text-2xl font-semibold mt-2 text-gray-800">{amount}</h2>

      {/* Change */}
      <div className="mt-2 flex items-center gap-1">
        <span
          className={`text-sm font-medium ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? "+" : ""}
          {change}%
        </span>

        <span className="text-xs text-gray-400">vs last month</span>
      </div>
    </div>
  );
};

export default Card;
