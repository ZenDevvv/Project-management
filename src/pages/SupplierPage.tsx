import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import supplierService from "../api/SupplierAPI";
import { Supplier, User } from "../config/interfaces";
import CreateSupplierModal from "../components/modals/CreateSupplierModal";
import { uploadImagesToCloudinary } from "../api/imageService";
import Cookies from "js-cookie";

const SupplierPage: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({
    name: "",
    address: "",
    logo: "",
    contactPerson: [
      {
        _id: Cookies.get("userId") || "",
      },
    ] as User[],
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  const fetchSuppliers = useCallback(
    async (currentPage: number, reset = false) => {
      if (!hasMore && !reset) return;

      setIsLoading(true);
      try {
        const params = {
          select: "name,contactPerson,address,logo",
          sort: "name:asc",
          populate:
            "contactPerson:firstname lastname email status lastActive position phoneNumber avatarImage",
          page: currentPage,
          limit: 10, 
        };

        const response = (await supplierService.getSuppliers(
          params
        )) as unknown as {
          suppliers: Supplier[];
          totalPages: number;
          currentPage: number;
        };

        setSuppliers((prev) =>
          reset ? response.suppliers : [...prev, ...response.suppliers]
        );

        setHasMore(currentPage < response.totalPages);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [hasMore]
  );

  useEffect(() => {
    if (isLoading || !hasMore) return;

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });

    if (loadMoreTriggerRef.current) {
      observerRef.current.observe(loadMoreTriggerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoading, hasMore]);

  useEffect(() => {
    fetchSuppliers(page, page === 1);
  }, [page, fetchSuppliers]);

  const handleAddSupplier = () => {
    setIsModalOpen(true);
  };

  const handleSaveSupplier = async () => {
    try {
      const response = await supplierService.createSupplier(
        newSupplier as Supplier
      );
      const supplier = response?.supplier;
      if (supplier?._id) {
        setPage(1);
        fetchSuppliers(1, true);
      } else {
        console.error("Invalid supplier data returned:", response);
      }

      setIsModalOpen(false);
      setNewSupplier({
        name: "",
        address: "",
        logo: "",
        contactPerson: [],
      });
    } catch (error) {
      console.error("Error creating supplier:", error);
    }
  };

  const handleDeleteSupplier = async (id: string) => {
    try {
      await supplierService.deleteSupplier(id);
      setPage(1);
      fetchSuppliers(1, true);
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        try {
          const uploadedImageUrls = await uploadImagesToCloudinary(
            e.target.files
          );
          if (uploadedImageUrls.length > 0) {
            setNewSupplier((prev) => ({
              ...prev,
              logo: uploadedImageUrls[0],
            }));
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    }
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen w-full px-6 py-6 md:px-16">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="relative w-1/2 md:w-1/3 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search..."
            className="w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          onClick={handleAddSupplier}
          className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105 text-sm"
        >
          Add Supplier
        </button>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-200 text-sm text-[#2a2a2a]">
            <tr>
              <th className="py-3 px-6 text-left">Logo</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  Loading suppliers...
                </td>
              </tr>
            ) : suppliers.length > 0 ? (
              suppliers.map((supplier) => (
                <tr
                  key={supplier._id as string}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <Link
                      to={`/supplier/${supplier._id}`}
                      state={{ supplier }}
                      className="block"
                    >
                      <img
                        src={supplier.logo}
                        alt="Supplier Logo"
                        className="w-12 h-12 object-cover"
                      />
                    </Link>
                  </td>
                  <td className="py-4 px-6 text-[#2a2a2a]">
                    <Link
                      to={`/supplier/${supplier._id}`}
                      state={{ supplier }}
                      className="block"
                    >
                      {supplier.name}
                    </Link>
                  </td>
                  <td className="py-4 px-6 text-[#607d8b]">
                    <Link
                      to={`/supplier/${supplier._id}`}
                      state={{ supplier }}
                      className="block"
                    >
                      {supplier.address}
                    </Link>
                  </td>
                  <td className="py-4 px-6 flex flex-col md:flex-row md:space-x-3 space-y-2 md:space-y-0">
                    <Link
                      to={`/supplier/${supplier._id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Link>
                    <button
                      className="text-red-600 hover:text-red-800"
                      title="Delete Supplier"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent link navigation when deleting
                        handleDeleteSupplier(supplier._id!);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  No suppliers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div ref={loadMoreTriggerRef} className="h-10 w-full" />

      <CreateSupplierModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSupplier}
        newSupplier={newSupplier}
        handleInputChange={handleInputChange}
        handleLogoChange={handleLogoChange}
      />
    </div>
  );
};

export { SupplierPage };
