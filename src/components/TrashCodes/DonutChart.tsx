import React, { useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ChartData, registerables } from "chart.js";

Chart.register(...registerables);

interface DonutChartProps {
  data: { values: number[] };
  label: string;
  backgroundColor: string[];
}

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  label,
  backgroundColor,
}) => {
  const chartRef = useRef<Chart<"doughnut"> | null>(null); // Specific ref type

  const chartData: ChartData<"doughnut", number[], unknown> = {
    labels: ["Total Spent", "Remaining Budget"],
    datasets: [
      {
        label,
        data: data.values,
        backgroundColor,
        hoverOffset: 4,
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

  return <Doughnut ref={chartRef} data={chartData} />;
};

export default DonutChart;
