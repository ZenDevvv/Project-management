export interface NewProject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project?: any;
  _id: string;
  name: string;
  description: string;
  estimatedStartDate: string;
  estimatedEndDate: string;
  actualStartDate: string;
  actualEndDate: string;
  totalBudget: number;
  forecastedBudget: number;
  projectStatus: {
    status: "Pending" | "In Progress" | "Completed";
    date: string;
  }[];
  tags: string[];
  projectLeader: User | string;
  members?: { userId: string; role: string }[];
  budgetExpenditure?: [number, number];
  expenditureBreakdown?: [number, number];
  monthly?: MonthlyData[];
  opexVsCapex?: [number, number];
}

export interface MonthlyData {
  monthIndex: number;
  actualSpent: number;
  budgetedAmount: number;
  estimatedExpenses: number;
}

export interface Supplier {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supplier: any;
  _id?: string;
  name?: string;
  contactPerson?: User[];
  address?: string;
  logo?: string;
}
export interface User {
  _id?: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  avatarImage: string;
  position: string;
  status: string;
  type: string;
  lastActive: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  bio: string;
  skills: string[];
  hobbies: string[];
  company: string;
  hireDate: string;
}

export interface Order {
  description: string;
  supplierId: string;
  date: string;
  actualAmount: number;
  estimatedAmount: number;
  _id?: string;
  type: string;
  projectId?: string;
}
