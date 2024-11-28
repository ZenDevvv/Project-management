import React from "react";
import { NewProject} from "../../config/interfaces";

interface CreateProjectModalProps {
  newProject: NewProject;
  isOpen: boolean;
  onClose: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  newProject,
  isOpen,
  onClose,
  onChange,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-md z-60 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Create New Project
        </h2>
        <form onSubmit={onSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">
              Project Name
            </label>
            <input
              type="text"
              name="name"
              value={newProject.name}
              onChange={onChange}
              className="w-full border-2 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">
              Description
            </label>
            <textarea
              name="description"
              value={newProject.description}
              onChange={onChange}
              className="w-full border-2 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">
              Estimated Start Date
            </label>
            <input
              type="date"
              name="estimatedStartDate"
              value={newProject.estimatedStartDate}
              onChange={onChange}
              className="w-full border-2 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">
              Estimated End Date
            </label>
            <input
              type="date"
              name="estimatedEndDate"
              value={newProject.estimatedEndDate}
              onChange={onChange}
              className="w-full border-2 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">
              Forecasted Budget
            </label>
            <input
              type="number"
              name="forecastedBudget"
              value={newProject.forecastedBudget}
              onChange={onChange}
              className="w-full border-2 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-6 py-3 rounded-lg transition duration-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-300 hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
