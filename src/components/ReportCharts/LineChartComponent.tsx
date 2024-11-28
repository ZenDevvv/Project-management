import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface LineChartComponentProps {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  dataKey: string;
  color: string;
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({
  title,
  data,
  dataKey,
  color,
}) => {
  return (
    <div className="bg-white border border-gray-300 rounded shadow-md p-4">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke={color} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
