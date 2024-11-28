import { useState, useMemo, useEffect } from "react";
import { FaTh, FaList } from "react-icons/fa";
import Cookies from "js-cookie";
import { ProjectCard } from "../cards/ProjectCard";
import { CreateProjectModal } from "../components/modals/CreateProjectModal";
import { useProjectsState } from "../hooks/useProjectsState";
import projectService from "../api/projectAPI";
import { NewProject, User } from "../config/interfaces";
import mongoose from "mongoose";

const getDefaultProject = (): NewProject => ({
  _id: new mongoose.Types.ObjectId().toString(),
  name: "",
  description: "",
  estimatedStartDate: "",
  estimatedEndDate: "",
  actualStartDate: "",
  actualEndDate: "",
  totalBudget: 0,
  forecastedBudget: 0,
  projectStatus: [{ status: "Pending", date: new Date().toISOString() }],
  projectLeader: Cookies.get("userId") || "",
  tags: [],
  members: [{ userId: Cookies.get("userId") ?? "", role: "administrator" }],
});

const HomePage = () => {
  const { projects, setProjects, nextPage, error } = useProjectsState();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<"grid" | "line">("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState<NewProject>(getDefaultProject());

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
  }, [projects, sortOrder]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: name === "forecastedBudget" ? parseFloat(value) || 0 : value,
    }));
  };

  const validateForm = () => {
    if (!newProject.name || !newProject.description) {
      return false;
    }
    return true;
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newProjectData = { ...newProject };

    try {
      const response = await projectService.createProject(newProjectData);
      if (response?.project) {
        setProjects((prevProjects) => [...prevProjects, response.project]);
        closeModal();
        resetNewProject();
      } else {
        throw new Error("Project data is missing.");
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const resetNewProject = () => setNewProject(getDefaultProject());

  const toggleViewMode = () =>
    setViewMode((prev) => (prev === "grid" ? "line" : "grid"));

  // Infinite scrolling: fetch next page when reaching the bottom
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        document.documentElement.scrollHeight ===
        window.innerHeight + window.scrollY;
      if (bottom) {
        console.log("Reached bottom, fetching next page...");
        nextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [nextPage]);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6 md:px-16">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Sorting and View Mode */}
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="relative">
            <label className="text-xs text-gray-700 mr-2 font-medium">
              Sort:
            </label>
            <select
              className="bg-gray-50 text-gray-700 rounded-md px-3 py-1.5 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={sortOrder}
              onChange={(e) => {
                console.log("Sort Order Changed:", e.target.value);
                setSortOrder(e.target.value as "asc" | "desc");
              }}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <button
            onClick={toggleViewMode}
            aria-label="Toggle View Mode"
            className="p-2 bg-gray-50 rounded-md shadow-sm hover:bg-gray-200 transition-colors text-sm"
          >
            {viewMode === "grid" ? (
              <FaList className="text-lg text-blue-600" />
            ) : (
              <FaTh className="text-lg text-blue-600" />
            )}
          </button>
        </div>

        {/* Create Project Button */}
        <button
          onClick={openModal}
          className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105 text-sm"
          aria-label="Create Project"
        >
          <span className="text-sm">Create Project</span>
        </button>
      </div>

      {error && (
        <p className="text-red-500 font-medium mb-4 px-6 py-3 rounded-lg border border-red-500 bg-red-100">
          {error}
        </p>
      )}

      <CreateProjectModal
        isOpen={isModalOpen}
        newProject={newProject}
        onClose={closeModal}
        onChange={handleInputChange}
        onSubmit={handleCreateProject}
      />

      {/* Projects List */}
      <div
        className={`grid ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            : "grid-cols-1"
        }`}
      >
        {sortedProjects.map((project) => (
          <div
            className={`p-6 ${
              viewMode === "line" ? "w-full sm:w-5/6 lg:w-4/5 mx-auto" : ""
            } transition-all`}
            key={project._id}
          >
            <ProjectCard
              project={project}
              title={project.name}
              date={project.estimatedEndDate}
              status={
                project.projectStatus?.[project.projectStatus.length - 1]
                  ?.status ?? "N/A"
              }
              projectLeader={project.projectLeader as User}
              viewMode={viewMode}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
