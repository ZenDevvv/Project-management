import React from "react";
import { mockReportData, ReportData } from "../mocks/reportMockData";
import BarChartComponent from "../components/ReportCharts/BarChartComponent";
import LineChartComponent from "../components/ReportCharts/LineChartComponent";
import PieChartComponent from "../components/ReportCharts/PieChartComponent";
import RadarChartComponent from "../components/ReportCharts/RadarChartComponent";
import ScatterChartComponent from "../components/ReportCharts/ScatterChartComponent";
import TeamMemberContributions from "../components/ReportCharts/TeamMemberContributions";
import MonthlyExpenses from "../components/ReportCharts/MonthlyExpenses";

const ReportPage: React.FC = () => {
  const reportData: ReportData = mockReportData;

  const getRandomVariation = (baseValue: number, variation: number = 5) => {
    return baseValue + Math.floor(Math.random() * variation);
  };

  const extendedData = reportData.trendLabels.map((label, index) => ({
    name: label,
    spend: getRandomVariation(reportData.trendValues[index]),
    taskValues: reportData.taskValues[index % reportData.taskValues.length],
  }));

  return (
    <div className="report-page p-5" style={{ backgroundColor: "#fafafa" }}>
      <h1 className="text-3xl font-bold mb-6 text-[#0f77be]">Project Report</h1>

      <div className="grid grid-cols-2 gap-10">
        <BarChartComponent
          title="Task Distribution by Category"
          data={reportData.taskCategories}
          dataKey="value"
          color="#0f77be"
        />

        <ScatterChartComponent
          title="Task Status Overview"
          data={extendedData.map((data, index) => ({
            label: `Task ${index + 1}`,
            value: data.taskValues,
          }))}
        />

        <PieChartComponent
          title="Budget Comparison"
          data={reportData.budgetComparison}
          color={["#0f77be", "#d1d1d1", "#b0b0b0"]}
        />

        <RadarChartComponent
          title="Team Performance"
          data={reportData.teamPerformance.map((member) => ({
            subject: member.member,
            completed: getRandomVariation(member.completed),
            total: member.total,
          }))}
          dataKey="completed"
          color="#0f77be"
        />

        <LineChartComponent
          title="Projected Budget Over Time"
          data={extendedData}
          dataKey="spend"
          color="#ff7300"
        />

        <MonthlyExpenses
          title="Monthly Expenses"
          data={reportData.monthlyExpenses}
        />

        <TeamMemberContributions
          title="Team Member Contributions"
          data={reportData.teamMemberContributions || []}
          colors={["#0f77be"]}
        />
      </div>
    </div>
  );
};

export default ReportPage;
