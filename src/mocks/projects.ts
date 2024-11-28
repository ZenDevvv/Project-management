// interface Procurement {
//   id: string;
//   projectId: string;
//   item: string;
//   cost: number;
//   date: string;
//   status: "Pending" | "Approved" | "Rejected";
// }

// interface MonthlyBudget {
//   month: string;
//   year: number;
//   amount: number;
//   forecast: number;
// }

// interface TableData {
//   budget: number;
//   forecast: number;
//   totalBudget: number;
//   monthlyBudget: MonthlyBudget[];
//   category: string;
//   expenseType: string;
// }

// export interface Project {
//   estimatedEndDate: any;
//   members: never[];
//   projectStatus: any;
//   _id: Key | null | undefined;
//   id: string;
//   name: string;
//   description: string;
//   date: string;
//   status: "In Progress" | "Completed" | "Pending";
//   tableData: TableData[];
//   procurement: Procurement[];
//   tags: string[];
// }
// export const mockProjects: Project[] = [
//   {
//     id: "1",
//     name: "Project Alpha",
//     description: "This project focuses on developing a new product.",
//     date: "2024-01-01",
//     status: "In Progress",
//     tableData: [
//       {
//         budget: 100000,
//         forecast: 120000,
//         totalBudget: 150000,
//         monthlyBudget: [
//           { month: "January", year: 2024, amount: 10000, forecast: 12000 },
//           { month: "February", year: 2024, amount: 15000, forecast: 17000 },
//           { month: "March", year: 2024, amount: 20000, forecast: 22000 },
//           { month: "April", year: 2024, amount: 30000, forecast: 35000 },
//           { month: "May", year: 2024, amount: 25000, forecast: 27000 },
//           { month: "June", year: 2024, amount: 15000, forecast: 17000 },
//         ],
//         category: "Materials",
//         expenseType: "Capital",
//       },
//     ],
//     procurement: [
//       {
//         id: "p1",
//         projectId: "1",
//         item: "Material A",
//         cost: 20000,
//         date: "2024-01-10",
//         status: "Approved",
//       },
//       {
//         id: "p2",
//         projectId: "1",
//         item: "Material B",
//         cost: 15000,
//         date: "2024-01-15",
//         status: "Pending",
//       },
//     ],
//     tags: ["Development", "Product"],
//   },
//   {
//     id: "2",
//     name: "Project Beta",
//     description:
//       "This project aims to enhance the existing system functionalities.",
//     date: "2024-02-01",
//     status: "Pending",
//     tableData: [
//       {
//         budget: 80000,
//         forecast: 90000,
//         totalBudget: 100000,
//         monthlyBudget: [
//           { month: "February", year: 2024, amount: 12000, forecast: 13000 },
//           { month: "March", year: 2024, amount: 15000, forecast: 16000 },
//           { month: "April", year: 2024, amount: 25000, forecast: 27000 },
//           { month: "May", year: 2024, amount: 20000, forecast: 21000 },
//           { month: "June", year: 2024, amount: 13000, forecast: 14000 },
//         ],
//         category: "Software Development",
//         expenseType: "Operational",
//       },
//     ],
//     procurement: [
//       {
//         id: "p3",
//         projectId: "2",
//         item: "Software License A",
//         cost: 30000,
//         date: "2024-02-05",
//         status: "Approved",
//       },
//       {
//         id: "p4",
//         projectId: "2",
//         item: "Consultancy Services",
//         cost: 25000,
//         date: "2024-02-10",
//         status: "Pending",
//       },
//     ],
//     tags: ["Enhancement", "System"],
//   },
//   {
//     id: "3",
//     name: "Project Gamma",
//     description:
//       "A project focusing on research and development of innovative solutions.",
//     date: "2024-03-01",
//     status: "In Progress",
//     tableData: [
//       {
//         budget: 120000,
//         forecast: 140000,
//         totalBudget: 160000,
//         monthlyBudget: [
//           { month: "March", year: 2024, amount: 15000, forecast: 17000 },
//           { month: "April", year: 2024, amount: 30000, forecast: 32000 },
//           { month: "May", year: 2024, amount: 35000, forecast: 37000 },
//           { month: "June", year: 2024, amount: 40000, forecast: 42000 },
//         ],
//         category: "Research",
//         expenseType: "Capital",
//       },
//     ],
//     procurement: [
//       {
//         id: "p5",
//         projectId: "3",
//         item: "Research Equipment",
//         cost: 50000,
//         date: "2024-03-05",
//         status: "Approved",
//       },
//       {
//         id: "p6",
//         projectId: "3",
//         item: "Material C",
//         cost: 20000,
//         date: "2024-03-10",
//         status: "Approved",
//       },
//     ],
//     tags: ["R&D", "Innovation"],
//   },
//   {
//     id: "4",
//     name: "Project Delta",
//     description: "Project aimed at optimizing the existing processes.",
//     date: "2024-04-01",
//     status: "Completed",
//     tableData: [
//       {
//         budget: 60000,
//         forecast: 70000,
//         totalBudget: 80000,
//         monthlyBudget: [
//           { month: "April", year: 2024, amount: 20000, forecast: 22000 },
//           { month: "May", year: 2024, amount: 15000, forecast: 17000 },
//           { month: "June", year: 2024, amount: 25000, forecast: 27000 },
//         ],
//         category: "Consulting",
//         expenseType: "Operational",
//       },
//     ],
//     procurement: [
//       {
//         id: "p7",
//         projectId: "4",
//         item: "Consulting Services",
//         cost: 20000,
//         date: "2024-04-05",
//         status: "Approved",
//       },
//       {
//         id: "p8",
//         projectId: "4",
//         item: "Optimization Tools",
//         cost: 30000,
//         date: "2024-04-10",
//         status: "Approved",
//       },
//     ],
//     tags: ["Optimization", "Efficiency"],
//   },
//   {
//     id: "5",
//     name: "Project Epsilon",
//     description: "Developing a mobile application for better user engagement.",
//     date: "2024-05-01",
//     status: "In Progress",
//     tableData: [
//       {
//         budget: 95000,
//         forecast: 100000,
//         totalBudget: 110000,
//         monthlyBudget: [
//           { month: "May", year: 2024, amount: 20000, forecast: 22000 },
//           { month: "June", year: 2024, amount: 25000, forecast: 27000 },
//           { month: "July", year: 2024, amount: 30000, forecast: 32000 },
//           { month: "August", year: 2024, amount: 15000, forecast: 16000 },
//         ],
//         category: "Mobile Development",
//         expenseType: "Capital",
//       },
//     ],
//     procurement: [
//       {
//         id: "p9",
//         projectId: "5",
//         item: "Development Tools",
//         cost: 40000,
//         date: "2024-05-15",
//         status: "Pending",
//       },
//       {
//         id: "p10",
//         projectId: "5",
//         item: "Marketing Services",
//         cost: 30000,
//         date: "2024-05-20",
//         status: "Pending",
//       },
//     ],
//     tags: ["Mobile", "Engagement"],
//   },
// ];
