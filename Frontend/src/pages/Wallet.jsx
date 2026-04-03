import React from "react";
import WalletCard from "../components/WalletCard";
import TransactionItem from "../components/TransactionItem";
import { useRole } from "../context/RoleContext";
import { useTransactions } from "../context/TransactionsContext";

const Wallet = () => {
  const { role } = useRole();
  const { transactions } = useTransactions();

  const totals = transactions.reduce(
    (acc, item) => {
      if (item.type === "income") acc.income += item.amount;
      else acc.expense += item.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const totalBalance = totals.income - totals.expense;

  const cash = Math.round(totalBalance * 0.2);
  const bank = Math.round(totalBalance * 0.6);
  const savings = totalBalance - cash - bank;

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-5 md:p-6 rounded-xl shadow-sm">
        <p className="text-sm opacity-80">Total Balance</p>
        <h1 className="text-2xl md:text-3xl font-semibold mt-2">
          ₹{totalBalance}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <WalletCard title="Cash" amount={`₹${cash}`} />
        <WalletCard title="Bank" amount={`₹${bank}`} />
        <WalletCard title="Savings" amount={`₹${savings}`} />
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-3">
        {role === "admin" && (
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto">
            Add Money
          </button>
        )}

        {role === "admin" && (
          <button className="border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 w-full sm:w-auto">
            Withdraw
          </button>
        )}
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-sm font-medium text-gray-600 mb-3">
          Recent Activity
        </h2>

        <div className="flex flex-col gap-3">
          {recentTransactions.map((item) => (
            <TransactionItem
              key={item.id}
              title={item.category}
              amount={`${item.type === "income" ? "+" : "-"}₹${item.amount}`}
              positive={item.type === "income"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallet;