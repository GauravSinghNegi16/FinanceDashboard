import React from "react";

const WalletCard = ({ title, amount }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">

      {/* Title */}
      <p className="text-sm text-gray-500">{title}</p>

      {/* Amount */}
      <h2 className="text-xl font-semibold text-gray-800 mt-2">
        {amount}
      </h2>

    </div>
  );
};

export default WalletCard;