import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface LineChartProps {
  data: { labels: string[]; values: number[] };
  label: string;
  borderColor: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, label, borderColor }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label,
        data: data.values,
        borderColor,
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Cost ($)",
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} height={150} />;
};

export default LineChart;
