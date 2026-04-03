import React from "react";
import Card from "../components/Card";
import { useTransactions } from "../context/TransactionsContext";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

const COLORS = ["#7C3AED", "#A78BFA", "#C4B5FD"];

const Dashboard = () => {
  const { transactions } = useTransactions();

  const monthlyData = transactions.reduce((acc, item) => {
    const month = new Date(item.date).toLocaleString("default", {
      month: "short",
    });

    const existing = acc.find((d) => d.month === month);

    if (existing) {
      existing.balance += item.type === "income" ? item.amount : -item.amount;
    } else {
      acc.push({
        month,
        balance: item.type === "income" ? item.amount : -item.amount,
      });
    }

    return acc;
  }, []);

  const categoryData = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, item) => {
      const existing = acc.find((d) => d.name === item.category);

      if (existing) {
        existing.value += item.amount;
      } else {
        acc.push({ name: item.category, value: item.amount });
      }

      return acc;
    }, []);

  const totals = transactions.reduce(
    (acc, item) => {
      if (item.type === "income") acc.income += item.amount;
      else acc.expense += item.amount;
      return acc;
    },
    { income: 0, expense: 0 },
  );

  const totalBalance = totals.income - totals.expense;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          Welcome back, Gaurav
        </h1>
        <p className="text-sm text-gray-500">
          Track your finances, spending, and growth in one place
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="Total Balance" amount={`₹${totalBalance}`} change={5} />
        <Card title="Income" amount={`₹${totals.income}`} change={8} />
        <Card title="Expense" amount={`₹${totals.expense}`} change={-3} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 xl:col-span-2">
          <h2 className="text-sm font-medium text-gray-600 mb-4">
            Balance Trend
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{ fill: "rgba(124, 58, 237, 0.05)" }}
                contentStyle={{
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                }}
              />

              <Bar
                dataKey="balance"
                fill="url(#barGradient)"
                radius={[8, 8, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-sm font-medium text-gray-600 mb-4">
            Spending Breakdown
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="flex flex-wrap justify-center gap-3 mt-2 text-xs text-gray-500">
            {categoryData.map((item, i) => (
              <div key={i} className="flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: COLORS[i % COLORS.length] }}
                />
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-sm font-medium text-gray-600 mb-3">Insights</h2>

        <div className="flex flex-col gap-2 text-sm">
          <p>
            Highest spending:{" "}
            <span className="font-medium text-gray-800">
              {categoryData.sort((a, b) => b.value - a.value)[0]?.name}
            </span>
          </p>

          <p>
            Total Savings:{" "}
            <span className="text-green-500 font-medium">₹{totalBalance}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
