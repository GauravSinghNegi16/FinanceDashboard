import React from "react";
import { useTransactions } from "../context/TransactionsContext";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#7C3AED", "#F87171"];

const Analytics = () => {
  const { transactions } = useTransactions();

  // 🔥 Monthly Trend
  const monthlyData = transactions.reduce((acc, item) => {
    const month = new Date(item.date).toLocaleString("default", {
      month: "short",
    });

    const existing = acc.find((d) => d.month === month);

    if (existing) {
      if (item.type === "income") existing.income += item.amount;
      else existing.expense += item.amount;
    } else {
      acc.push({
        month,
        income: item.type === "income" ? item.amount : 0,
        expense: item.type === "expense" ? item.amount : 0,
      });
    }

    return acc;
  }, []);

  // 🔥 Category Breakdown
  const categoryData = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, item) => {
      const existing = acc.find((d) => d.category === item.category);

      if (existing) {
        existing.amount += item.amount;
      } else {
        acc.push({ category: item.category, amount: item.amount });
      }

      return acc;
    }, []);

  // 🔥 Totals
  const totals = transactions.reduce(
    (acc, item) => {
      if (item.type === "income") acc.income += item.amount;
      else acc.expense += item.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const pieData = [
    { name: "Income", value: totals.income },
    { name: "Expense", value: totals.expense },
  ];

  const savings = totals.income - totals.expense;

  const highestCategory =
    categoryData.sort((a, b) => b.amount - a.amount)[0]?.category || "N/A";

  const savingsRate = totals.income
    ? Math.round((savings / totals.income) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Financial Analytics
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Track your financial performance and insights
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Income
          </p>
          <h2 className="text-xl font-semibold text-green-600 mt-2">
            ₹{totals.income}
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Expense
          </p>
          <h2 className="text-xl font-semibold text-red-500 mt-2">
            ₹{totals.expense}
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Net Savings
          </p>
          <h2 className="text-xl font-semibold text-purple-600 mt-2">
            ₹{savings}
          </h2>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">
            Monthly Trend
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <Tooltip />
              <Legend />

              <Line type="monotone" dataKey="income" stroke="#7C3AED" strokeWidth={3} />
              <Line type="monotone" dataKey="expense" stroke="#F87171" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">
            Spending by Category
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="category" stroke="#9CA3AF" />
              <Tooltip />

              <Bar dataKey="amount" fill="#7C3AED" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">
            Income vs Expense
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={60} outerRadius={90}>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
            Insights
          </h2>

          <div className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
            <p>
              Highest spending category: <strong>{highestCategory}</strong>
            </p>
            <p>
              Savings rate: <span className="text-green-500">{savingsRate}%</span>
            </p>
            <p>
              Monthly growth: <span className="text-purple-500">Based on trends</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;