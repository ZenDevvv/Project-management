import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ScatterChartComponentProps {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}

const ScatterChartComponent: React.FC<ScatterChartComponentProps> = ({
  title,
  data,
}) => {
  return (
    <div className="bg-white border border-gray-300 rounded shadow-md p-4">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <XAxis dataKey="label" name="Task" />
          <YAxis dataKey="value" name="Status" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={data} fill="#0f77be" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScatterChartComponent;
