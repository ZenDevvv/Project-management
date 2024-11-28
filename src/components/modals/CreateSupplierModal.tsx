import React from "react";
import { Supplier } from "../../config/interfaces";

interface CreateSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  newSupplier: Partial<Supplier>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CreateSupplierModal: React.FC<CreateSupplierModalProps> = ({
  isOpen,
  onClose,
  onSave,
  newSupplier,
  handleInputChange,
  handleLogoChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-2xl font-semibold mb-4">Add New Supplier</h2>
        <input
          type="text"
          name="name"
          value={newSupplier.name || ""}
          onChange={handleInputChange}
          placeholder="Supplier Name"
          className="w-full mb-4 border border-gray-300 p-3 rounded-md"
        />
        {/* <input fields for contactPerson, email, and phone can be added similarly */}
        <input
          type="text"
          name="address"
          value={newSupplier.address || ""}
          onChange={handleInputChange}
          placeholder="Address"
          className="w-full mb-4 border border-gray-300 p-3 rounded-md"
        />

        {/* Upload Logo */}
        <div className="mb-4">
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleLogoChange}
            className="w-full mb-2 border border-gray-300 p-3 rounded-md"
          />
          {newSupplier.logo && (
            <img
              src={newSupplier.logo}
              alt="Logo Preview"
              className="w-20 h-20 object-cover"
            />
          )}
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSupplierModal;
