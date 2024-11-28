import React from "react";

interface SummaryCardProps {
  title: string;
  value: number;
  bgColor: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, bgColor }) => {
  return (
    <div className={`p-2 border rounded ${bgColor}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default SummaryCard;
