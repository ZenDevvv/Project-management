import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TeamMemberContributionsProps {
  title: string;
  data: { member: string; contributions: number }[];
  colors: string[];
}

const TeamMemberContributions: React.FC<TeamMemberContributionsProps> = ({
  title,
  data,
  colors,
}) => {
  if (!data || data.length === 0) {
    return <div>No contributions data available</div>;
  }

  return (
    <div className="team-member-contributions bg-white border border-gray-300 rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="member" type="category" />
          <Tooltip />
          <Bar dataKey="contributions" fill={colors[0]} />{" "}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TeamMemberContributions;
