import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BarChartComponentProps {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  dataKey: string;
  color: string;
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({
  title,
  data,
  dataKey,
  color,
}) => {
  return (
    <div className="bg-white border border-gray-300 rounded shadow-md p-4">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
