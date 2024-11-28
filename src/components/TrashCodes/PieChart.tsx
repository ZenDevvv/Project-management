import React, { useEffect, useRef } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ChartData, registerables } from "chart.js";

Chart.register(...registerables);

interface PieChartProps {
  data: { labels: string[]; values: number[] };
  label: string;
  backgroundColor: string[];
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  label,
  backgroundColor,
}) => {
  const chartRef = useRef<Chart<"pie"> | null>(null); // Specific ref type for pie chart

  const chartData: ChartData<"pie", number[], unknown> = {
    labels: data.labels,
    datasets: [
      {
        label,
        data: data.values,
        backgroundColor,
      },
    ],
  };

  useEffect(() => {
    const chartInstance = chartRef.current;
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return <Pie ref={chartRef} data={chartData} />;
};

export default PieChart;
