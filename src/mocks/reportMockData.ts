export interface ReportData {
  totalProjects: number;
  completedProjects: number;
  pendingTasks: number;
  totalBudget: number;
  trendLabels: string[];
  trendValues: number[];
  taskLabels: string[];
  taskValues: number[];
  budgetLabels: string[];
  budgetValues: number[];
  completionTrendLabels: string[];
  completionTrendValues: number[];
  teamMembers: { name: string; completedTasks: number }[];
  costCategories: { name: string; value: number }[];
  budgetComparison: { category: string; value: number }[];
  teamPerformance: {
    member: string;
    completed: number;
    total: number;
    avgTimeSpent: number;
  }[];
  taskCategories: { category: string; value: number }[];
  budgetAllocation: { category: string; value: number }[];
  upcomingDeadlines: { task: string; date: string; status: string }[];
  costOverrun: { category: string; amount: number }[];
  taskCompletionTrends: { week: string; completed: number }[];
  customerFeedback: { project: string; rating: number; feedback: string }[];
  riskAssessment: { risk: string; impact: string; likelihood: string }[];
  resourceAllocation: {
    team: string;
    allocatedBudget: number;
    allocatedHours: number;
  }[];
  monthlyExpenses: { month: string; expenses: number }[];
  teamMemberContributions: { member: string; contributions: number }[]; 
  teamContributions?: { name: string; contribution: number }[]; 
}

export const mockReportData = {
  totalProjects: 15,
  completedProjects: 10,
  pendingTasks: 5,
  totalBudget: 50000,
  trendLabels: ["January", "February", "March", "April", "May"],
  trendValues: [10000, 12000, 8000, 15000, 9000],
  taskLabels: ["Tasks Completed", "Tasks Pending"],
  taskValues: [70, 30],
  budgetLabels: ["Planned", "Actual"],
  budgetValues: [30000, 20000],
  completionTrendLabels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  completionTrendValues: [10, 15, 20, 25],
  teamMembers: [
    { name: "Alice", completedTasks: 15 },
    { name: "Bob", completedTasks: 10 },
    { name: "Charlie", completedTasks: 20 },
  ],
  costCategories: [
    { name: "Manpower", value: 20000 },
    { name: "Materials", value: 15000 },
    { name: "Miscellaneous", value: 5000 },
    { name: "Transport", value: 8000 },
  ],
  budgetComparison: [
    { category: "Planned", value: 30000 },
    { category: "Actual", value: 25000 },
    { category: "Variance", value: 5000 },
  ],
  teamPerformance: [
    { member: "Alice", completed: 15, total: 20, avgTimeSpent: 5 },
    { member: "Bob", completed: 10, total: 15, avgTimeSpent: 4 },
    { member: "Charlie", completed: 20, total: 25, avgTimeSpent: 3 },
  ],
  taskCategories: [
    { category: "Development", value: 40 },
    { category: "Testing", value: 30 },
    { category: "Deployment", value: 20 },
    { category: "Documentation", value: 10 },
  ],
  budgetAllocation: [
    { category: "Development", value: 20000 },
    { category: "Marketing", value: 15000 },
    { category: "Sales", value: 10000 },
    { category: "Support", value: 5000 },
  ],
  upcomingDeadlines: [
    { task: "Design Review", date: "2024-10-30", status: "Pending" },
    { task: "Implementation Phase", date: "2024-11-15", status: "In Progress" },
  ],
  costOverrun: [
    { category: "Materials", amount: 5000 },
    { category: "Transport", amount: 2000 },
  ],
  taskCompletionTrends: [
    { week: "Week 1", completed: 10 },
    { week: "Week 2", completed: 15 },
    { week: "Week 3", completed: 20 },
    { week: "Week 4", completed: 25 },
  ],
  customerFeedback: [
    {
      project: "Project A",
      rating: 4.5,
      feedback: "Great progress and communication!",
    },
    {
      project: "Project B",
      rating: 3.8,
      feedback: "Good work, but some delays.",
    },
  ],
  riskAssessment: [
    { risk: "Budget Overrun", impact: "High", likelihood: "Medium" },
    { risk: "Resource Shortage", impact: "Medium", likelihood: "Low" },
  ],
  resourceAllocation: [
    { team: "Development", allocatedBudget: 20000, allocatedHours: 200 },
    { team: "Marketing", allocatedBudget: 15000, allocatedHours: 150 },
  ],
  monthlyExpenses: [
    { month: "January", expenses: 1000 },
    { month: "February", expenses: 1200 },
    { month: "March", expenses: 1100 },
    { month: "April", expenses: 1300 },
    { month: "May", expenses: 900 },
    { month: "June", expenses: 1500 },
    { month: "July", expenses: 1600 },
    { month: "August", expenses: 1700 },
    { month: "September", expenses: 1400 },
    { month: "October", expenses: 1250 },
    { month: "November", expenses: 1350 },
    { month: "December", expenses: 1450 },
  ],
  teamMemberContributions: [
    { member: "Alice", contributions: 50 },
    { member: "Bob", contributions: 70 },
    { member: "Charlie", contributions: 60 },
    { member: "David", contributions: 80 },
    { member: "Eve", contributions: 55 },
  ],

  teamContributions: [
    { name: "Alice", contribution: 50 },
    { name: "Bob", contribution: 70 },
    { name: "Charlie", contribution: 60 },
  ],
};
