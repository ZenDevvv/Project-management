import axios from "axios";
import Cookies from "js-cookie";
import { Supplier } from "../config/interfaces";
import { API_ENDPOINTS } from "../config/endpoint";

const { baseUrl } = API_ENDPOINTS;

const supplierService = {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  searchSuppliers,
  searchAndUpdateSupplier,
};

export default supplierService;

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch all suppliers
async function getSuppliers(
  params?: Record<string, string | number | boolean>
): Promise<Supplier[]> {
  try {
    const response = await axios.get(`${baseUrl}/supplier/get/all`, {
      params,
      ...getAuthHeaders(),
    });
    const data = response.data as Supplier[];
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    throw error;
  }
}

// Fetch a single supplier by ID
async function getSupplierById(
  id: string,
  select?: string[]
): Promise<Supplier> {
  try {
    const params = select ? { select: select.join(",") } : {};
    const response = await axios.get(
      `${baseUrl}/supplier/get/${id}?select=name,contactPerson,address,logo&limit=20&sort=name:asc&populate=contactPerson:firstname lastname email status lastActive position phoneNumber avatarImage`,
      {
        params,
        ...getAuthHeaders(),
      }
    );
    console.log(response);
    return response.data as Supplier;
  } catch (error) {
    console.error(`Error fetching supplier with ID ${id}:`, error);
    throw error;
  }
}

// Create a new supplier
async function createSupplier(supplierData: Supplier): Promise<Supplier> {
  try {
    const response = await axios.post(
      `${baseUrl}/supplier/create`,
      supplierData,
      getAuthHeaders()
    );
    return response.data as Supplier;
  } catch (error) {
    console.error("Error creating supplier:", error);
    throw error;
  }
}

// Update an existing supplier
async function updateSupplier(
  id: string,
  supplierData: Supplier
): Promise<Supplier> {
  try {
    const response = await axios.put(
      `${baseUrl}/suppliers/${id}`,
      supplierData,
      getAuthHeaders()
    );
    return response.data as Supplier;
  } catch (error) {
    console.error(`Error updating supplier with ID ${id}:`, error);
    throw error;
  }
}

// Delete a supplier by ID
async function deleteSupplier(id: string): Promise<void> {
  try {
    await axios.delete(`${baseUrl}/supplier/remove/${id}`, getAuthHeaders());
  } catch (error) {
    console.error(`Error deleting supplier with ID ${id}:`, error);
    throw error;
  }
}

// Search for suppliers using a query
async function searchSuppliers(query: string): Promise<Supplier[]> {
  try {
    const response = await axios.get(`${baseUrl}/suppliers/search`, {
      params: { search: query },
      ...getAuthHeaders(),
    });
    return response.data as Supplier[];
  } catch (error) {
    console.error("Error searching suppliers:", error);
    throw error;
  }
}

// Search for and update suppliers
async function searchAndUpdateSupplier(
  query: Record<string, string>,
  updateData: Supplier,
  multi: boolean = false
): Promise<Supplier[]> {
  try {
    const response = await axios.patch(
      `${baseUrl}/suppliers/search-and-update`,
      {
        query,
        update: updateData,
        multi,
      },
      getAuthHeaders()
    );
    return response.data as Supplier[];
  } catch (error) {
    console.error("Error searching and updating suppliers:", error);
    throw error;
  }
}
