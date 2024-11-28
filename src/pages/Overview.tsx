import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register chart components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const Overview = () => {
  const projects = [
    {
      id: 1,
      name: "Project Alpha",
      totalBudget: 48000,
      usedBudget: 13000,
      status: "In Progress",
      startDate: "2024-01-01",
      deadline: "2024-12-31",
      teamMembers: 5,
      milestones: [
        { name: "Phase 1", completed: true },
        { name: "Phase 2", completed: false },
        { name: "Phase 3", completed: false },
      ],
      tasks: { total: 50, completed: 20 },
    },
    {
      id: 2,
      name: "Project Beta",
      totalBudget: 174000,
      usedBudget: 174000,
      status: "Completed",
      startDate: "2023-01-01",
      deadline: "2023-12-31",
      teamMembers: 8,
      milestones: [
        { name: "Phase 1", completed: true },
        { name: "Phase 2", completed: true },
        { name: "Phase 3", completed: true },
      ],
      tasks: { total: 100, completed: 100 },
    },
    {
      id: 3,
      name: "Project Gamma",
      totalBudget: 137000,
      usedBudget: 0,
      status: "Pending",
      startDate: "2024-05-01",
      deadline: "2024-11-01",
      teamMembers: 3,
      milestones: [
        { name: "Phase 1", completed: false },
        { name: "Phase 2", completed: false },
        { name: "Phase 3", completed: false },
      ],
      tasks: { total: 40, completed: 0 },
    },
    {
      id: 4,
      name: "Project Delta",
      totalBudget: 100000,
      usedBudget: 120000,
      status: "In Progress",
      startDate: "2024-03-01",
      deadline: "2024-09-30",
      teamMembers: 6,
      milestones: [
        { name: "Phase 1", completed: true },
        { name: "Phase 2", completed: true },
        { name: "Phase 3", completed: false },
      ],
      tasks: { total: 70, completed: 50 },
    },
  ];

  const getMonthlyData = () => {
    const monthlyBudget: { [key: string]: number } = {};
    const monthlyExpense: { [key: string]: number } = {};

    projects.forEach(({ totalBudget, usedBudget, startDate, deadline }) => {
      const start = new Date(startDate);
      const end = new Date(deadline);

      const currentMonth = new Date(start.getFullYear(), start.getMonth(), 1);

      while (currentMonth <= end) {
        const monthYear = `${
          currentMonth.getMonth() + 1
        }-${currentMonth.getFullYear()}`;

        monthlyBudget[monthYear] =
          (monthlyBudget[monthYear] || 0) + totalBudget;
        monthlyExpense[monthYear] =
          (monthlyExpense[monthYear] || 0) + usedBudget;

        currentMonth.setMonth(currentMonth.getMonth() + 1);
      }
    });

    const labels = Object.keys(monthlyBudget);
    const budgetData = labels.map((label) => monthlyBudget[label]);
    const expenseData = labels.map((label) => monthlyExpense[label]);

    return {
      labels,
      datasets: [
        {
          label: "Total Budget",
          data: budgetData,
          backgroundColor: "rgba(61, 92, 149, 0.4)",
          borderColor: "rgba(61, 92, 149, 1)",
          borderWidth: 2,
        },
        {
          label: "Total Expense",
          data: expenseData,
          backgroundColor: "rgba(12, 177, 209, 0.4)",
          borderColor: "rgba(12, 177, 209, 1)",
          borderWidth: 2,
        },
      ],
    };
  };

  const chartData = getMonthlyData();

  const statusCounts = {
    Pending: projects.filter((p) => p.status === "Pending").length,
    "In Progress": projects.filter((p) => p.status === "In Progress").length,
    Completed: projects.filter((p) => p.status === "Completed").length,
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen font-sans">
      <div className="flex flex-wrap lg:flex-nowrap">
        <div className="flex flex-wrap lg:flex-nowrap h-full">
          {/* Left Section */}
          <div className="w-full lg:w-2/3 p-4 lg:p-6 space-y-8 flex flex-col">
            {/* Status Cards and Bar Graph Section */}
            <div className="flex-1 space-y-8">
              {/* Status Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(statusCounts).map(([status, count]) => (
                  <div
                    key={status}
                    className={`p-3 rounded-lg shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out transform ${
                      status === "Pending"
                        ? "bg-gradient-to-r from-[#006f87] to-[#3d5c95] text-white"
                        : status === "In Progress"
                        ? "bg-gradient-to-r from-[#0cb1d1] to-[#1199a1] text-white"
                        : "bg-gradient-to-r from-[#89c541] to-[#91d459] text-white"
                    } flex flex-col items-center justify-center text-center`}
                  >
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                      {status}
                    </h2>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
                      {count}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bar Graph Section */}
              <div>
                <h3 className="text-lg sm:text-xl lg:text-3xl font-semibold text-gray-800 mb-6">
                  Monthly Budget vs Expense Overview
                </h3>
                <div className="h-64 sm:h-80 lg:h-[70vh] bg-white rounded-lg shadow-xl overflow-hidden">
                  <Bar
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        title: {
                          display: true,
                          text: "Budget vs Expense (Over Time)",
                          font: { size: 16 },
                        },
                        tooltip: {
                          backgroundColor: "#333",
                          titleColor: "#fff",
                          bodyColor: "#fff",
                          padding: 12,
                          cornerRadius: 6,
                        },
                      },
                      scales: {
                        x: {
                          ticks: { font: { size: 12 }, color: "#333" },
                        },
                        y: {
                          ticks: { font: { size: 12 }, color: "#333" },
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/3 p-8 space-y-10 overflow-y-auto lg:max-h-screen bg-gray-100 flex flex-col">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-wide">
                Projects
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Manage your project budgets and deadlines effectively.
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 flex-grow">
              {projects.map(
                ({ id, name, totalBudget, usedBudget, status, deadline }) => {
                  const percentageUsed = (usedBudget / totalBudget) * 100;
                  const excessAmount =
                    usedBudget > totalBudget ? usedBudget - totalBudget : 0;

                  // Colors and styles based on conditions
                  const barColor =
                    usedBudget < totalBudget
                      ? "bg-green-500"
                      : usedBudget === totalBudget
                      ? "bg-blue-500"
                      : "bg-red-500";
                  const textColor =
                    usedBudget > totalBudget ? "text-red-600" : "text-gray-800";
                  const cardBorder =
                    usedBudget > totalBudget
                      ? "border-red-200"
                      : usedBudget === totalBudget
                      ? "border-blue-200"
                      : "border-green-200";
                  const statusBg =
                    usedBudget > totalBudget
                      ? "bg-red-100 text-red-600"
                      : usedBudget === totalBudget
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600";

                  const projectDeadline = new Date(deadline);

                  return (
                    <div
                      key={id}
                      className={`relative bg-white p-6 rounded-xl shadow-lg transition-transform duration-300 border ${cardBorder}`}
                    >
                      {/* Card Header */}
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900 truncate">
                          {name}
                        </h3>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${statusBg}`}
                        >
                          {status}
                        </span>
                      </div>

                      {/* Deadline and Budget Info */}
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <p>{`Deadline: ${projectDeadline.toLocaleDateString()}`}</p>
                        </div>
                        <p className={`text-base font-medium ${textColor}`}>
                          Excess Budget: ₱{excessAmount.toLocaleString()}
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            Budget Used: {percentageUsed.toFixed(2)}%
                          </span>
                          <span className="text-xs font-semibold text-gray-500">
                            ₱{usedBudget.toLocaleString()} / ₱
                            {totalBudget.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-4 rounded-full ${barColor} transition-all duration-700`}
                            style={{ width: `${percentageUsed}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Overview };
