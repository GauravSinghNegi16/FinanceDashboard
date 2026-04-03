import React from "react";

const TransactionItem = ({ title, amount, positive }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition">

      {/* Left */}
      <div>
        <p className="text-sm font-medium text-gray-800">{title}</p>
        <p className="text-xs text-gray-400">Transaction</p>
      </div>

      {/* Right */}
      <span
        className={`text-sm font-semibold ${
          positive ? "text-green-500" : "text-red-500"
        }`}
      >
        {amount}
      </span>
    </div>
  );
};

export default TransactionItem;