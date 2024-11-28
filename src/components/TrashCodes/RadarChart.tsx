import { Radar } from "react-chartjs-2";

interface MemberData {
  label: string;
  value: number;
  total: number;
}

interface RadarChartProps {
  data: MemberData[];
}

const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((member) => member.label),
    datasets: [
      {
        label: "Completed Tasks",
        data: data.map((member) => member.value),
        backgroundColor: "rgba(15, 119, 190, 0.5)",
        borderColor: "#0f77be",
        borderWidth: 2,
      },
      {
        label: "Total Tasks",
        data: data.map((member) => member.total),
        backgroundColor: "rgba(209, 209, 209, 0.5)",
        borderColor: "#d1d1d1",
        borderWidth: 2,
      },
    ],
  };

  return <Radar data={chartData} />;
};

export default RadarChart;
