import axios from "axios";
import { API_ENDPOINTS } from "../config/endpoint";
import Cookies from "js-cookie";

const { baseUrl, CAPEX } = API_ENDPOINTS;

const CapexService = {
  getAllCapex: async (selectFields: string) => {
    try {
      const response = await axios.get(`${baseUrl}${CAPEX.GET_ALL}`, {
        params: {
          select: selectFields,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Error fetching CAPEX entries");
    }
  },

  getCapexById: async (id: string, selectFields?: string) => {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("Token not found in cookies");
    }

    try {
      const response = await axios.get(
        `${baseUrl}${CAPEX.GET_BY_ID.replace(":id", id)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: selectFields ? { select: selectFields } : {},
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching CAPEX entry with ID ${id}:`, error);
      throw new Error(`Error fetching CAPEX entry with ID ${id}`);
    }
  },

  // Create a new CAPEX entry
  createCapex: async (capexData: object) => {
    const token = Cookies.get("token");
    const response = await axios.post(`${baseUrl}${CAPEX.CREATE}`, capexData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  updateCapex: async (id: string, capexData: object) => {
    const response = await axios.put(
      `${baseUrl}${CAPEX.UPDATE.replace(":id", id)}`,
      capexData
    );
    return response.data;
  },

  removeCapex: async (id: string) => {
    const response = await axios.delete(
      `${baseUrl}${CAPEX.REMOVE.replace(":id", id)}`
    );
    return response.data;
  },

  searchCapex: async (query: string, page: number, pageSize: number) => {
    const token = Cookies.get("token");
    const response = await axios.get(`${baseUrl}${CAPEX.SEARCH}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { search: query, page: page, pageSize: pageSize },
    });
    return response.data;
  },

  searchAndUpdateCapex: async (query: string, updateData: object) => {
    const response = await axios.post(`${baseUrl}${CAPEX.SEARCH_AND_UPDATE}`, {
      query,
      updateData,
    });
    return response.data;
  },
};

export default CapexService;
