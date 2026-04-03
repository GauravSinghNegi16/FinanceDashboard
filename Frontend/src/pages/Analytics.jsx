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

  const totalIncome = totals.income;
  const totalExpense = totals.expense;
  const savings = totalIncome - totalExpense;

  const highestCategory =
    categoryData.sort((a, b) => b.amount - a.amount)[0]?.category || "N/A";

  const savingsRate = totalIncome
    ? Math.round((savings / totalIncome) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          Financial Analytics
        </h1>
        <p className="text-sm text-gray-500">
          Track your financial performance and insights
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 md:p-5 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Total Income</p>
          <h2 className="text-lg md:text-xl font-semibold text-green-600 mt-2">
            ₹{totalIncome}
          </h2>
        </div>

        <div className="bg-white p-4 md:p-5 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Total Expense</p>
          <h2 className="text-lg md:text-xl font-semibold text-red-500 mt-2">
            ₹{totalExpense}
          </h2>
        </div>

        <div className="bg-white p-4 md:p-5 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Net Savings</p>
          <h2 className="text-lg md:text-xl font-semibold text-purple-600 mt-2">
            ₹{savings}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="bg-white p-4 md:p-5 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-sm font-medium text-gray-600 mb-4">
            Monthly Trend
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#7C3AED"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#F87171"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 md:p-5 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-sm font-medium text-gray-600 mb-4">
            Spending by Category
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="category" stroke="#9CA3AF" />
              <Tooltip cursor={{ fill: "rgba(124, 58, 237, 0.05)" }} />
              <Bar dataKey="amount" fill="#7C3AED" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="bg-white p-4 md:p-5 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-sm font-medium text-gray-600 mb-4">
            Income vs Expense
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 md:p-5 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-sm font-medium text-gray-600 mb-3">
            Insights
          </h2>

          <div className="text-sm space-y-2">
            <p>
              Highest spending category:{" "}
              <span className="font-medium text-gray-800">
                {highestCategory}
              </span>
            </p>

            <p>
              Savings rate:{" "}
              <span className="text-green-500 font-medium">
                {savingsRate}%
              </span>
            </p>

            <p>
              Monthly growth:{" "}
              <span className="text-purple-500 font-medium">
                Based on trends
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;