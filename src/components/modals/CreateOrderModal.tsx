import React from "react";
import { NewProject, Order } from "../../config/interfaces";
import { useProjectsState } from "../../hooks/useProjectsState";

interface CreateOrderModalProps {
  isOpen: boolean;
  closeModal: () => void;
  newOrder: Order;
  handleOrderChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmitOrder: () => void;
}

const CreateOrderModal: React.FC<CreateOrderModalProps> = ({
  isOpen,
  closeModal,
  newOrder,
  handleOrderChange,
  handleSubmitOrder,
}) => {
  const { projects } = useProjectsState();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Create Order
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitOrder();
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <input
              type="text"
              name="type"
              value={newOrder.type}
              onChange={handleOrderChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={newOrder.description}
              onChange={handleOrderChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={newOrder.date}
              onChange={handleOrderChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Estimated Amount
            </label>
            <input
              type="number"
              name="estimatedAmount"
              value={newOrder.estimatedAmount}
              onChange={handleOrderChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Actual Amount
            </label>
            <input
              type="number"
              name="actualAmount"
              value={newOrder.actualAmount}
              onChange={handleOrderChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Project
            </label>
            <select
              name="projectId"
              value={newOrder.projectId}
              onChange={handleOrderChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Select a project
              </option>
              {projects?.map((project: NewProject) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
            >
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { CreateOrderModal };
