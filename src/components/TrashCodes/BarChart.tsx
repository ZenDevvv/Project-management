import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface BarChartProps {
  labels: string[]; // Labels for the x-axis
  data: number[][]; // Array of data arrays for each dataset
  labelsDataset: string[]; // Labels for each dataset
  colors: string[]; // Colors for each dataset
}

const BarChart: React.FC<BarChartProps> = ({
  labels,
  data,
  labelsDataset,
  colors,
}) => {
  const chartRef = useRef<Chart<"bar"> | null>(null); // Specify Chart<"bar"> type

  const datasets = labelsDataset.map((label, index) => ({
    label,
    data: data[index],
    backgroundColor: colors[index],
  }));

  const chartData = {
    labels,
    datasets,
  };

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return <Bar ref={chartRef} data={chartData} />;
};

export default BarChart;
