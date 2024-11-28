import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import Cookies from "js-cookie";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import { useLocation } from "react-router-dom";
import projectService from "../api/projectAPI";
import {NewProject } from "../config/interfaces";

// Register necessary chart components from Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

// Chart options that are reused for each chart type
const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};

const DashboardPage: React.FC = () => {
  const [projectData, setProjectData] = useState<NewProject>();
  const location = useLocation();

  // Extract the project name directly from the pathname
  const pathSegments = location.pathname.split("/");
  const projectName = pathSegments[2]
    ? decodeURIComponent(pathSegments[2])
    : "";

  // Fetch project data whenever the pathname or projectName changes
  useEffect(() => {
    const fetchProjectData = async () => {
      if (projectName) {
        Cookies.set("projectName", projectName);
        try {
          const response = await projectService.getProjectDashboard(
            projectName
          );
          setProjectData(response.project); // Assuming the response contains 'project' data
        } catch (error) {
          console.error("Error fetching project data:", error);
        }
      }
    };

    if (projectName) {
      fetchProjectData();
    }
  }, [projectName, location.pathname]); // Trigger re-fetch when pathname or projectName changes

  if (!projectData) {
    return <div>Loading...</div>;
  }

  // Chart data for Budget vs Actual
  const budgetExpenditureData = {
    labels: ["Budget", "Forecasted Budget"],
    datasets: [
      {
        label: "Budget vs Actual",
        data: projectData?.budgetExpenditure || [0, 0], // Ensure correct fallback
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const expenditureBreakdownData = {
    labels: ["OPEX", "CAPEX"],
    datasets: [
      {
        label: "Expenditure Breakdown",
        data: projectData?.expenditureBreakdown || [0, 0], // Ensure correct fallback
        backgroundColor: ["#FFCE56", "#FF6384"],
      },
    ],
  };

  const monthlyBreakdownData = {
    labels:
      projectData?.monthly?.map((item) => `Month ${item.monthIndex + 1}`) || [],
    datasets: [
      {
        label: "Actual Spent",
        data: projectData?.monthly?.map((item) => item.actualSpent) || [],
        backgroundColor: "#42A5F5",
      },
      {
        label: "Budgeted Amount",
        data: projectData?.monthly?.map((item) => item.budgetedAmount) || [],
        backgroundColor: "#FF6384",
      },
      {
        label: "Estimated Expenses",
        data: projectData?.monthly?.map((item) => item.estimatedExpenses) || [],
        backgroundColor: "#FFCE56",
      },
    ],
  };

  const opexVsCapexData = {
    labels: ["OPEX", "CAPEX"],
    datasets: [
      {
        label: "Financial Breakdown",
        data: projectData?.opexVsCapex || [0, 0], // Ensure correct fallback
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    <div className="dashboard grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 p-8 bg-[#f5f5f5]">
      {/* Budget vs Forecasted Budget Chart */}
      <div className="chart-container bg-white p-6 rounded-lg shadow-md flex flex-col">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Budget vs Actual
        </h3>
        <Bar data={budgetExpenditureData} options={chartOptions} />
      </div>

      {/* Monthly Budget Breakdown */}
      <div className="chart-container bg-white p-6 rounded-lg shadow-md flex flex-col">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Monthly Breakdown
        </h3>
        <Bar data={monthlyBreakdownData} options={chartOptions} />
      </div>

      {/* OPEX vs CAPEX Breakdown */}
      <div className="chart-container bg-white p-6 rounded-lg shadow-md flex flex-col">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          OPEX vs CAPEX
        </h3>
        <Pie data={expenditureBreakdownData} options={chartOptions} />
      </div>

      {/* OPEX vs CAPEX Total */}
      <div className="chart-container bg-white p-6 rounded-lg shadow-md flex flex-col">
        <h3 className="text-md font-semibold text-gray-800 mb-4">
          OPEX vs CAPEX Total
        </h3>
        <Pie data={opexVsCapexData} options={chartOptions} />
      </div>
    </div>
  );
};

export default DashboardPage;
