import { useState, useEffect, useRef, useCallback } from "react";
import { NewProject } from "../config/interfaces";
import projectAPI from "../api/projectAPI";
import { useAuth } from "../context/AuthContext";

const { getProjectsByuser } = projectAPI;

export const useProjectsState = () => {
  const [projects, setProjects] = useState<NewProject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth(); // Get authentication status
  const [currentPage, setCurrentPage] = useState(1);

  const isFetching = useRef(false);
  const projectsPerPage = 9;

  const fetchProjects = useCallback(async () => {
    if (!isAuthenticated || isFetching.current) return;

    isFetching.current = true;

    try {
      const data = await getProjectsByuser(
        undefined,
        projectsPerPage,
        currentPage
      );

      if (Array.isArray(data)) {
        setProjects((prev) => [...prev, ...data]);
      } else {
        setError("Failed to fetch projects. Invalid response format.");
      }
    } catch {
      setError("Failed to fetch projects. Please try again later.");
    } finally {
      isFetching.current = false;
    }
  }, [isAuthenticated, currentPage]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects, currentPage]);

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return {
    projects,
    setProjects,
    error,
    currentPage,
    nextPage,
    prevPage,
  };
};
