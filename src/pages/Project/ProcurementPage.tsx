import { useLocation } from "react-router-dom";
import { ProcurementTable } from "./ProcurementTable";
import { ProjectDescription } from "./ProjectDescription";
import { Project } from "../../types/common";

const ProcurementPage = () => {
  const location = useLocation();
  const project: Project | null = location.state ?? {
    id: "3",
    name: "Project Gamma",
    description:
      "A project focusing on research and development of innovative solutions.",
    date: "2024-03-01",
    status: "In Progress",
    tableData: [
      {
        budget: 120000,
        forecast: 140000,
        totalBudget: 160000,
        monthlyBudget: [
          { month: "March", year: 2024, amount: 15000, forecast: 17000 },
          { month: "April", year: 2024, amount: 30000, forecast: 32000 },
          { month: "May", year: 2024, amount: 35000, forecast: 37000 },
          { month: "June", year: 2024, amount: 40000, forecast: 42000 },
        ],
        category: "Research",
        expenseType: "Capital",
      },
    ],
    capex: [
      {
        id: "p5",
        projectId: "3",
        item: "Research Equipment",
        cost: 50000,
        date: "2024-03-05",
        status: "Approved",
      },
    ],
    opex: [
      {
        id: "p6",
        projectId: "3",
        item: "Material C",
        cost: 20000,
        date: "2024-03-10",
        status: "Approved",
      },
    ],
    tags: ["R&D", "Innovation"],
  };

  if (!project) {
    return <div>Project not found!</div>;
  }

  return (
    <div className="p-5">
      <h1 className="font-bold text-2xl mb-4">
        Procurement Details for {project.name}
      </h1>
      <ProjectDescription project={project} />

      <ProcurementTable
        tableData={project.tableData}
        capex={project.capex}
        opex={project.opex}
      />
    </div>
  );
};

export { ProcurementPage };
