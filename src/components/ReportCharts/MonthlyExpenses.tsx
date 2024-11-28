import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MonthlyExpensesProps {
  title: string;
  data: { month: string; expenses: number }[];
}

const MonthlyExpenses: React.FC<MonthlyExpensesProps> = ({ title, data }) => {
  return (
    <div className="bg-white border border-gray-300 rounded shadow-md p-4">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="expenses" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyExpenses;
