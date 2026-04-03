import React, { useState } from "react";
import { useTransactions } from "../context/TransactionsContext";
import { useRole } from "../context/RoleContext";

const Transactions = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [order, setOrder] = useState("desc");

  const { transactions } = useTransactions();
  const { role } = useRole();

  const sortedData = transactions
    .filter((item) =>
      item.category.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) => (filter === "all" ? true : item.type === filter))
    .sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (sortBy === "amount") {
        return order === "asc" ? valA - valB : valB - valA;
      }

      if (sortBy === "date") {
        return order === "asc"
          ? new Date(valA) - new Date(valB)
          : new Date(valB) - new Date(valA);
      }

      return order === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        <input
          type="text"
          placeholder="Search by category..."
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full lg:w-64 focus:outline-none focus:ring-2 focus:ring-purple-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 w-full sm:w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 w-full sm:w-auto"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            <option value="category">Category</option>
          </select>

          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 w-full sm:w-auto"
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-max text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
              <tr>
                <th className="p-3 font-medium whitespace-nowrap">Date</th>
                <th className="p-3 font-medium whitespace-nowrap hidden sm:table-cell">
                  Category
                </th>
                <th className="p-3 font-medium whitespace-nowrap">Amount</th>
                <th className="p-3 font-medium whitespace-nowrap hidden sm:table-cell">
                  Type
                </th>
                <th className="p-3 font-medium whitespace-nowrap">Action</th>
              </tr>
            </thead>

            <tbody>
              {sortedData.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-100 hover:bg-purple-50/30 transition"
                >
                  <td className="p-3 text-gray-700 whitespace-nowrap">
                    {item.date}
                  </td>

                  <td className="p-3 text-gray-700 whitespace-nowrap hidden sm:table-cell">
                    {item.category}
                  </td>

                  <td
                    className={`p-3 font-medium whitespace-nowrap ${
                      item.type === "income"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    ₹{item.amount}
                  </td>

                  <td className="p-3 whitespace-nowrap hidden sm:table-cell">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.type === "income"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>

                  <td className="p-3 whitespace-nowrap">
                    {role === "admin" && (
                      <button className="text-purple-600 text-sm hover:text-purple-700 hover:underline transition">
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {sortedData.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;