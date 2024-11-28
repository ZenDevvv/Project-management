import axios from "axios";
import { API_ENDPOINTS } from "../config/endpoint";
import Cookies from "js-cookie";

const { baseUrl, USER } = API_ENDPOINTS;

const UserService = {
  // Get all users with dynamic select fields
  getAllUsers: async (selectFields: string) => {
    try {
      const response = await axios.get(`${baseUrl}${USER.GET_ALL}`, {
        params: {
          select: selectFields,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Error fetching users");
    }
  },

  // Get a single user by ID, with optional select fields
  getUserById: async (selectFields?: string) => {
    const id = Cookies.get("userId");
    const token = Cookies.get("token");

    if (!id || !token) {
      throw new Error("User ID or token not found in cookies");
    }

    try {
      const response = await axios.get(
        `${baseUrl}${USER.GET_BY_ID.replace(":id", id)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: selectFields ? { select: selectFields } : {},
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw new Error(`Error fetching user with ID ${id}`);
    }
  },

  // Create a new user
  createUser: async (userData: object) => {
    const response = await axios.post(`${baseUrl}${USER.CREATE}`, userData);
    return response.data;
  },

  // Update user data
  updateUser: async (userData: object) => {
    const response = await axios.put(`${baseUrl}${USER.UPDATE}`, userData);
    return response.data;
  },

  // Remove a user by ID
  removeUser: async (id: string) => {
    const response = await axios.delete(
      `${baseUrl}${USER.REMOVE.replace(":id", id)}`
    );
    return response.data;
  },

  // User login
  login: async (credentials: object) => {
    const response = await axios.post(`${baseUrl}${USER.LOGIN}`, credentials);
    return response.data;
  },

  // User logout
  logout: async () => {
    const token = Cookies.get("token");
    const response = await axios.post(`${baseUrl}${USER.LOGOUT}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  // Check if the user is logged in
  checkLogin: async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(`${baseUrl}${USER.CHECKLOGIN}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error during login check:", error);
      throw error;
    }
  },

  // Search for users based on a query string
  searchUsers: async (query: string) => {
    const response = await axios.get(`${baseUrl}${USER.SEARCH}`, {
      params: { q: query },
    });
    return response.data;
  },
};

export default UserService;
