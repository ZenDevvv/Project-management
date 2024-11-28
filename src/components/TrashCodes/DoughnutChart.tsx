import { Doughnut } from "react-chartjs-2";

interface DoughnutChartProps {
  data: number[];
  labels: string[];
  backgroundColor: string[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  data,
  labels,
  backgroundColor,
}) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColor,
        hoverBackgroundColor: backgroundColor.map((color) => color + "80"),
      },
    ],
  };

  return <Doughnut data={chartData} />;
};

export default DoughnutChart;
