export interface DashboardData {
  totalProjects: number;
  inProgress: number;
  completed: number;
  pending: number;
  totalBudget: number;
  totalSpent: number;
  remainingBudget: number;
  procurementCounts: Record<string, number>;
  procurementItems: {
    item: string;
    cost: number;
    status: "Completed" | "Pending" | "In Progress";
    date: string;
  }[];
}

export const mockDashboardData: DashboardData = {
  totalProjects: 10,
  inProgress: 5,
  completed: 3,
  pending: 2,
  totalBudget: 300000,
  totalSpent: 180000,
  remainingBudget: 120000,
  procurementCounts: {
    Completed: 15,
    Pending: 5,
    "In Progress": 10,
  },
  procurementItems: [
    {
      item: "Office Supplies",
      cost: 1200,
      status: "Completed",
      date: "2024-01-10",
    },
    {
      item: "Software License",
      cost: 3000,
      status: "Completed",
      date: "2024-02-15",
    },
    {
      item: "Consultancy Service",
      cost: 8000,
      status: "In Progress",
      date: "2024-03-20",
    },
    {
      item: "Equipment Purchase",
      cost: 5000,
      status: "Pending",
      date: "2024-04-25",
    },
    {
      item: "Training Program",
      cost: 2000,
      status: "Completed",
      date: "2024-05-30",
    },
    {
      item: "Marketing Campaign",
      cost: 15000,
      status: "In Progress",
      date: "2024-06-05",
    },
    {
      item: "Website Development",
      cost: 12000,
      status: "Pending",
      date: "2024-07-15",
    },
    {
      item: "Research Report",
      cost: 5000,
      status: "Completed",
      date: "2024-08-01",
    },
    {
      item: "Networking Event",
      cost: 7000,
      status: "In Progress",
      date: "2024-08-20",
    },
    {
      item: "System Upgrade",
      cost: 10000,
      status: "Pending",
      date: "2024-09-10",
    },
  ],
};
