import { ReactNode, useMemo, useState } from "react";
import { SideNavigation } from "../components/navigation/SideNavigation";
import { TopNavigation } from "../components/navigation/TopNavigation";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import LOGO from "../assets/uzaro.png";
import { COLORS } from "../config/config";
import React from "react";
import { useProjectsState } from "../hooks/useProjectsState";
import Cookies from "js-cookie";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { NewProject } from "../config/interfaces";
import {
  RiBarChartLine,
  RiDashboardLine,
  RiFileListLine,
  RiSettings2Fill,
} from "react-icons/ri";

type TNavigation = {
  key: string;
  name: string;
  path?: string | null | undefined;
  type: string;
  submenu?: TNavigation[] | null | undefined;
  icon: ReactNode;
};

const MainLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isHomePage = location.pathname === "/Projects";
  const isOverviewPage = location.pathname === "/";
  const isSupplierPage = location.pathname === "/Supplier";
  const isProfilePage = location.pathname === "/profile";
  const isSupplierDetailPage = location.pathname.includes("/supplier/");

  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isAccordionExpanded, setAccordionExpanded] = useState(false);

  const { projects } = useProjectsState();

  const memoizedProjects = useMemo(() => projects, [projects]);

  const handleAccordionChange = (expanded: boolean) => {
    setAccordionExpanded(expanded);
  };

  return (
    <div className="flex">
      {!isLoginPage &&
        !isHomePage &&
        !isRegisterPage &&
        !isOverviewPage &&
        !isSupplierPage &&
        !isSupplierDetailPage &&
        !isProfilePage && (
          <SideNavigation
            groupBehavior="multiple"
            className="gap-10 bg-[#1e3a5f] text-white border-none"
          >
            <SideNavigationContent
              projects={memoizedProjects}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
              isAccordionExpanded={isAccordionExpanded}
              handleAccordionChange={handleAccordionChange}
            />
          </SideNavigation>
        )}

      <div className="flex flex-col flex-1 min-h-screen">
        {!isLoginPage && !isRegisterPage && (
          <TopNavigation className="border-b-0" />
        )}

        <div className={`flex flex-col bg-[${COLORS.BASE_COLOR}] flex-1`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export const SideNavigationContent = React.memo(
  ({
    projects,
    selectedProject,
    setSelectedProject,
    isAccordionExpanded,
    handleAccordionChange,
  }: {
    projects: NewProject[];
    selectedProject: string | null;
    setSelectedProject: React.Dispatch<React.SetStateAction<string | null>>;
    isAccordionExpanded: boolean;
    handleAccordionChange: (expanded: boolean) => void;
  }) => {
    const handleProjectClick = (projectId: string, projectName: string) => {
      setSelectedProject(projectId);
      Cookies.set("projectName", projectName);
    };

    // Determine the projectName
    const projectName =
      Cookies.get("projectName") ||
      (selectedProject
        ? projects.find((project) => project._id === selectedProject)?.name
        : "");

    const navigation = [
      {
        key: "dashboard",
        name: "Dashboard",
        type: "link",
        path: projectName ? `/dashboard/${projectName}` : "/dashboard",
        icon: <RiDashboardLine size={20} />,
      },
      {
        key: "report",
        name: "Report",
        type: "link",
        path: projectName ? `/report/${projectName}` : "/report",
        icon: <RiFileListLine size={20} />,
      },
      {
        key: "project",
        name: "Project",
        type: "link",
        path: projectName ? `/project/${projectName}` : "/project",
        icon: <RiBarChartLine size={20} />,
      },
      {
        key: "setting",
        name: "Settings",
        type: "link",
        path: projectName ? `/settings/${projectName}` : "/settings",
        icon: <RiSettings2Fill size={20} />,
      },
    ];

    return (
      <div className="flex flex-col items-center">
        <div className="py-4 self-center">
          <NavLink to="/">
            <img src={LOGO} alt="Logo" className="h-12" />
          </NavLink>
        </div>
        <div className="mt-3">
          {projects.length === 0 ? (
            <p className="text-gray-500">No projects available</p>
          ) : (
            <div className={`bg-transparent`}>
              <div
                className="flex justify-between px-4 py-2 cursor-pointer"
                onClick={() => handleAccordionChange(!isAccordionExpanded)}
              >
                <p className="text-white text-xl font-medium">
                  {Cookies.get("projectName")
                    ? (Cookies.get("projectName")?.length ?? 0) > 12
                      ? Cookies.get("projectName")?.slice(0, 12) + "..."
                      : Cookies.get("projectName")
                    : selectedProject
                    ? projects
                        .find((project) => project._id === selectedProject)
                        ?.name?.slice(0, 12) + "..."
                    : "Select a project"}
                </p>
                <span className="text-white">
                  {isAccordionExpanded ? <ExpandLess /> : <ExpandMore />}
                </span>
              </div>

              {isAccordionExpanded && (
                <div className="p-4 mt-4">
                  {projects
                    .filter((project) => project._id !== selectedProject)
                    .map((project) => (
                      <NavLink
                        to={`/dashboard/${project.name}`}
                        key={project._id}
                        className={`block text-white-600 hover:text-blue-800 mb-2 transition duration-300 ${
                          selectedProject === project._id ? "bg-blue-800" : ""
                        }`}
                        onClick={() =>
                          handleProjectClick(project._id, project.name)
                        }
                      >
                        {project.name?.length > 15
                          ? project.name?.slice(0, 15) + "..."
                          : project.name}
                      </NavLink>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center h-full mt-1">
          {navigation.map((navItem) => handleNavigation({ navItem }))}
        </div>
      </div>
    );
  }
);

const handleNavigation = ({
  navItem,
  iteration = 1,
}: {
  navItem: TNavigation;
  iteration?: number;
}) => {
  if (navItem.type === "link" && navItem.path) {
    return (
      <SideNavigation.NavLink
        key={navItem.key}
        to={navItem.path}
        className={`${iteration > 1 ? "px-14" : ""}`}
      >
        {navItem.icon}
        {navItem.name}
      </SideNavigation.NavLink>
    );
  }

  if (navItem.type === "group" && navItem.submenu) {
    return (
      <SideNavigation.Group key={navItem.key}>
        <SideNavigation.GroupTrigger group={navItem.key}>
          {navItem.icon}
          {navItem.name}
        </SideNavigation.GroupTrigger>
        <SideNavigation.GroupContent group={navItem.key}>
          {navItem.submenu.map((navItem) =>
            handleNavigation({ navItem, iteration: iteration + 1 })
          )}
        </SideNavigation.GroupContent>
      </SideNavigation.Group>
    );
  }
};

export { MainLayout };
