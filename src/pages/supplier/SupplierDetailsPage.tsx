import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Supplier, Order } from "../../config/interfaces";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import CapexService from "../../api/capexAPI";
import { useProjectsState } from "../../hooks/useProjectsState";
import { CreateOrderModal } from "../../components/modals/CreateOrderModal";

const SupplierDetailsPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const [supplier] = useState<Supplier | null>(location.state.supplier);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    type: "",
    description: "",
    supplierId: supplier?._id || "",
    projectId: "",
    date: new Date().toLocaleDateString("en-CA"),
    estimatedAmount: 0,
    actualAmount: 0,
  });

  
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(3);

  const [totalPages, setTotalPages] = useState<number>(1);

  useProjectsState();

  useEffect(() => {
    const fetchSupplier = async () => {
      if (id) {
        try {
          const data = await CapexService.searchCapex(id, page, pageSize);
          if (data.data && data.data.length > 0) {
            setOrders(data.data);
            setTotalPages(data.pagination.totalPages);
          } else {
            setOrders([]);
          }
        } catch (error) {
          console.error("Error fetching supplier details:", error);
        }
      }
    };

    fetchSupplier();
  }, [id, page, pageSize]);

  const handleCreateOrderClick = () => {
    setIsModalOpen(true);
  };

  const handleOrderChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitOrder = async () => {
    const updatedOrder = {
      ...newOrder,
      estimatedAmount: Number(newOrder.estimatedAmount),
      actualAmount: Number(newOrder.actualAmount),
    };
    const response = await CapexService.createCapex(updatedOrder);
    console.log(response);
    setOrders((prevState) => [...prevState, response]);
    setIsModalOpen(false);
    setNewOrder({
      type: "",
      description: "",
      supplierId: supplier?._id || "",
      projectId: "",
      date: new Date().toLocaleDateString("en-CA"),
      estimatedAmount: 0,
      actualAmount: 0,
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewOrder({
      type: "",
      description: "",
      supplierId: supplier?._id || "",
      projectId: "",
      date: new Date().toLocaleDateString("en-CA"),
      estimatedAmount: 0,
      actualAmount: 0,
    });
  };

  const handlePageChange = (direction: number) => {
    setPage((prevPage) =>
      Math.max(1, Math.min(totalPages, prevPage + direction))
    );
  };

  if (!supplier) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl p-6 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={supplier.logo}
                alt="Supplier Logo"
                className="w-20 h-20 object-cover rounded-full"
              />
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {supplier.name}
                </h1>
                <p className="text-gray-500">{supplier.address}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Persons
              </h3>
              {supplier.contactPerson?.map((person, index) => (
                <div key={index} className="flex items-center space-x-4 mb-6">
                  <img
                    src={person.avatarImage}
                    alt="Contact Person"
                    className="w-14 h-14 object-cover rounded-full"
                  />
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      {person.firstname} {person.lastname}
                    </p>
                    <p className="text-sm text-gray-500">{person.position}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <FaPhoneAlt className="mr-2" />
                      {person.phoneNumber}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FaEnvelope className="mr-2" />
                      {person.email}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Last Active:{" "}
                      {new Date(person.lastActive).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2 bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Recent Orders
              </h2>
              <button
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                onClick={handleCreateOrderClick}
              >
                Create Order
              </button>
            </div>
            {orders.length > 0 ? (
              <>
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="border-b border-gray-200 pb-6 mb-6"
                  >
                    <p className="text-lg font-medium text-gray-900">
                      {order.description}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Date: {new Date(order.date).toLocaleDateString()}
                    </p>
                    <div className="flex justify-between text-sm text-gray-500 mt-4">
                      <p>
                        Actual:{" "}
                        <span className="font-semibold text-gray-800">
                          ${order.actualAmount.toLocaleString()}
                        </span>
                      </p>
                      <p>
                        Estimated:{" "}
                        <span className="font-semibold text-gray-800">
                          ${order.estimatedAmount.toLocaleString()}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
                <div className="text-center">
                  <button
                    className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                    onClick={() => handlePageChange(-1)}
                    disabled={page <= 1}
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600 mx-4">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                    onClick={() => handlePageChange(1)}
                    disabled={page >= totalPages}
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500">
                No orders available
              </div>
            )}
          </div>
        </div>
      </div>

      <CreateOrderModal
        isOpen={isModalOpen}
        closeModal={handleCloseModal}
        newOrder={newOrder}
        handleOrderChange={handleOrderChange}
        handleSubmitOrder={handleSubmitOrder}
      />
    </div>
  );
};

export { SupplierDetailsPage };
