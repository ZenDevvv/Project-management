import axios from "axios";
import Cookies from "js-cookie"; // Import Cookies to get the token
import { NewProject } from "../config/interfaces";
import { API_ENDPOINTS } from "../config/endpoint";

const { baseUrl } = API_ENDPOINTS;

const projectService = {
  getProjects,
  getProjectsByuser,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  searchProjects,
  searchAndUpdateProject,
  getProjectDashboard,
};

export default projectService;

// Helper function to get the Authorization header
const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch all projects
async function getProjects(
  query?: string,
  limit: number = 10,
  select?: string[]
): Promise<NewProject> {
  try {
    const params: Record<string, string | number | boolean | Date | undefined> =
      { limit };
    if (query) params.query = query;
    if (select) params.select = select.join(",");

    const response = await axios.get(
      `${baseUrl}/project/get/all?populate=projectLeader`,
      {
        params,
        ...getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

async function getProjectsByuser(
  query?: string,
  pageSize: number = 10,
  page: number = 1,
  select?: string[]
): Promise<NewProject[]> {
  const id = Cookies.get("userId");
  try {
    const params: Record<string, string | number | boolean | Date | undefined> =
      {
        page,
        pageSize,
      };
    if (query) params.query = query;
    if (select) params.select = select.join(",");

    const response = await axios.get(
      `${baseUrl}/project/get/byUser/${id}?populate=projectLeader`,
      {
        params,
        ...getAuthHeaders(),
      }
    );

    return response.data.projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

// Fetch a single project by ID
async function getProjectById(
  id: string,
  select?: string[]
): Promise<NewProject> {
  try {
    const params = select ? { select: select.join(",") } : {};
    const response = await axios.get(`${baseUrl}/projects/${id}`, {
      params,
      ...getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error);
    throw error;
  }
}

// Create a new project
async function createProject(projectData: NewProject): Promise<NewProject> {
  try {
    const response = await axios.post(
      `${baseUrl}/project/create`,
      projectData,
      getAuthHeaders()
    );

    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

// Update an existing project
async function updateProject(
  id: string,
  projectData: NewProject
): Promise<NewProject> {
  try {
    const response = await axios.put(
      `${baseUrl}/projects/${id}`,
      projectData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating project with ID ${id}:`, error);
    throw error;
  }
}

// Delete a project by ID
async function deleteProject(id: string): Promise<NewProject> {
  try {
    const response = await axios.delete(
      `${baseUrl}/projects/${id}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting project with ID ${id}:`, error);
    throw error;
  }
}

// Search for projects using a query
async function searchProjects(query: string): Promise<NewProject> {
  try {
    const response = await axios.get(`${baseUrl}/projects/search`, {
      params: { search: query },
      ...getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error searching projects:", error);
    throw error;
  }
}

// Search for and update projects
async function searchAndUpdateProject(
  query: Record<string, string>,
  updateData: NewProject,
  multi: boolean = false
): Promise<NewProject> {
  try {
    const response = await axios.patch(
      `${baseUrl}/projects/search-and-update`,
      {
        query,
        update: updateData,
        multi,
      },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error searching and updating projects:", error);
    throw error;
  }
}

async function getProjectDashboard(projectName: string): Promise<NewProject> {
  try {
    const response = await axios.get(
      `${baseUrl}/project/dashboard/${projectName}`,
      {
        ...getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching dashboard for project: ${projectName}`,
      error
    );
    throw error;
  }
}
