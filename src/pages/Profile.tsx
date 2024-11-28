import { useState, useRef, useEffect } from "react";
import { uploadImagesToCloudinary } from "../api/imageService";
import { useUsersState } from "../hooks/useUsersState";

// Define the User type based on the structure of mockUser
interface User {
  username?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  avatarImage?: string;
  position?: string;
  status?: string;
  type?: string;
  lastActive?: string;
  phoneNumber?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  bio?: string;
  skills?: string[];
  hobbies?: string[];
  company?: string;
  hireDate?: string;
}

// Define the component
const ProfilePage: React.FC = () => {
  const { users } = useUsersState();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    if (users) {
      setUser(users);
    }
  }, [users]);

  // Create references for scrolling
  const basicInfoRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const moreDetailsRef = useRef<HTMLDivElement>(null);

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...(prevUser ?? {}),
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      try {
        const uploadedImageUrls = await uploadImagesToCloudinary(files);

        setUser((prevUser) => ({
          ...prevUser,
          avatarImage: uploadedImageUrls[0],
        }));
      } catch (error) {
        console.error("Upload failed: Please try again.");
        alert("Upload failed: Please try again.");
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-500";
      case "inactive":
        return "text-yellow-500";
      case "suspended":
        return "text-red-500";
      case "deactivated":
        return "text-gray-400";
      case "archived":
        return "text-gray-500";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="container p-4 mb-6">
      <div className="flex">
        <div className="w-1/6 bg-white rounded-lg p-6 mr-6 shadow-md border border-gray-200 h-80 overflow-auto">
          <h2 className="font-semibold text-gray-800 mb-6 text-lg border-b pb-3">
            Profile Sections
          </h2>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() =>
                  basicInfoRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex items-center p-4 w-full text-left"
              >
                <span className="font-medium">Basic Info</span>
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  contactInfoRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex items-center p-4 w-full text-left"
              >
                <span className="font-medium">Contact Info</span>
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  moreDetailsRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex items-center p-4 w-full text-left"
              >
                <span className="font-medium">More Details</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Main Profile Section */}
        <div className="flex-1 bg-white shadow-md rounded-lg overflow-hidden">
          {/* Header Section with User Info */}
          <div className="flex items-center p-4 bg-white border-b border-gray-200">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="avatar-upload"
            />
            <label htmlFor="avatar-upload">
              <img
                className="w-32 h-32 rounded-full border-4 border-gray-300 cursor-pointer hover:scale-105 transition-transform duration-200"
                src={user?.avatarImage || "https://via.placeholder.com/150"}
                alt={`${user?.firstname} ${user?.lastname}`}
              />
            </label>

            <div className="ml-6">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="firstname"
                    value={user?.firstname || ""}
                    onChange={handleChange}
                    className="border rounded p-2 mb-2 w-full"
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    name="lastname"
                    value={user?.lastname || ""}
                    onChange={handleChange}
                    className="border rounded p-2 mb-2 w-full"
                    placeholder="Last Name"
                  />
                  <input
                    type="text"
                    name="position"
                    value={user?.position || ""}
                    onChange={handleChange}
                    className="border rounded p-2 mb-2 w-full"
                    placeholder="Position"
                  />
                  <input
                    type="email"
                    name="email"
                    value={user?.email || ""}
                    onChange={handleChange}
                    className="border rounded p-2 mb-4 w-full"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    name="company"
                    value={user?.company || ""}
                    onChange={handleChange}
                    className="border rounded p-2 mb-2 w-full"
                    placeholder="Company"
                  />
                  <input
                    type="text"
                    name="hireDate"
                    value={user?.hireDate || ""}
                    onChange={handleChange}
                    className="border rounded p-2 mb-2 w-full"
                    placeholder="Hire Date"
                  />
                </>
              ) : (
                <div>
                  <h2 className="text-4xl font-bold text-gray-900">
                    {user?.firstname} {user?.lastname}
                  </h2>
                  <p className="text-xl text-gray-700">{user?.position}</p>
                  <p className="text-md text-gray-600">{user?.email}</p>
                  <p className="text-md text-gray-600">{user?.company}</p>
                  <p className="text-md text-gray-600">{user?.hireDate}</p>
                </div>
              )}
              <button
                className="mt-4 text-blue-600 hover:underline font-semibold"
                onClick={handleEditToggle}
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 space-y-8">
            {/* Basic Info Section */}
            <div ref={basicInfoRef} className="py-2 bg-white border-b">
              <h3 className="font-semibold text-gray-800 text-xl mb-4">
                Basic Info
              </h3>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label
                      className="font-semibold text-gray-700"
                      htmlFor="status"
                    >
                      Status:
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={user?.status}
                      onChange={handleChange}
                      className="border rounded p-2 mb-2 w-full focus:outline-none focus:ring focus:border-blue-300 transition"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                      <option value="deactivated">Deactivated</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="font-semibold text-gray-700"
                      htmlFor="type"
                    >
                      User Type:
                    </label>
                    <input
                      id="type"
                      type="text"
                      name="type"
                      value={user?.type || ""}
                      onChange={handleChange}
                      className="border rounded p-2 mb-2 w-full focus:outline-none focus:ring focus:border-blue-300 transition"
                      placeholder="User Type"
                    />
                  </div>

                  <div>
                    <label
                      className="font-semibold text-gray-700"
                      htmlFor="lastActive"
                    >
                      Last Active:
                    </label>
                    <input
                      id="lastActive"
                      type="text"
                      name="lastActive"
                      value={user?.lastActive || ""}
                      onChange={handleChange}
                      className="border rounded p-2 mb-2 w-full focus:outline-none focus:ring focus:border-blue-300 transition"
                      placeholder="Last Active"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p>
                    Status:{" "}
                    <span className={getStatusColor(user?.status || "")}>
                      {user?.status}
                    </span>
                  </p>
                  <p>Last Active: {user?.lastActive}</p>
                  <p>User Type: {user?.type}</p>
                </div>
              )}
            </div>

            {/* Contact Info Section */}
            <div ref={contactInfoRef} className="py-2 bg-white border-b">
              <h3 className="font-semibold text-gray-800 text-xl mb-4">
                Contact Info
              </h3>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label
                      className="font-semibold text-gray-700"
                      htmlFor="phoneNumber"
                    >
                      Phone Number:
                    </label>
                    <input
                      id="phoneNumber"
                      type="text"
                      name="phoneNumber"
                      value={user?.phoneNumber || ""}
                      onChange={handleChange}
                      className="border rounded p-2 mb-2 w-full focus:outline-none focus:ring focus:border-blue-300 transition"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div>
                    <label
                      className="font-semibold text-gray-700"
                      htmlFor="address"
                    >
                      Address:
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={user?.address?.street || ""}
                      onChange={handleChange}
                      className="border rounded p-2 mb-2 w-full focus:outline-none focus:ring focus:border-blue-300 transition"
                      placeholder="Street"
                    />
                    <input
                      id="city"
                      type="text"
                      name="city"
                      value={user?.address?.city || ""}
                      onChange={handleChange}
                      className="border rounded p-2 mb-2 w-full focus:outline-none focus:ring focus:border-blue-300 transition"
                      placeholder="City"
                    />
                    <input
                      id="state"
                      type="text"
                      name="state"
                      value={user?.address?.state || ""}
                      onChange={handleChange}
                      className="border rounded p-2 mb-2 w-full focus:outline-none focus:ring focus:border-blue-300 transition"
                      placeholder="State"
                    />
                    <input
                      id="zip"
                      type="text"
                      name="zip"
                      value={user?.address?.zip || ""}
                      onChange={handleChange}
                      className="border rounded p-2 mb-2 w-full focus:outline-none focus:ring focus:border-blue-300 transition"
                      placeholder="Zip"
                    />
                    <input
                      id="country"
                      type="text"
                      name="country"
                      value={user?.address?.country || ""}
                      onChange={handleChange}
                      className="border rounded p-2 mb-2 w-full focus:outline-none focus:ring focus:border-blue-300 transition"
                      placeholder="Country"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p>Phone Number: {user?.phoneNumber}</p>
                  <p>
                    Address:{" "}
                    {`${user?.address?.street}, ${user?.address?.city}, ${user?.address?.state}, ${user?.address?.zip}, ${user?.address?.country}`}
                  </p>
                </div>
              )}
            </div>

            {/* More Details Section */}
            <div ref={moreDetailsRef} className="py-2 bg-white border-b">
              <h3 className="font-semibold text-gray-800 text-xl mb-4">
                More Details
              </h3>
              <div>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label
                        className="font-semibold text-gray-700"
                        htmlFor="bio"
                      >
                        Bio:
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={user?.bio || ""}
                        onChange={handleChange}
                        className="border rounded p-2 mb-2 w-full focus:outline-none focus:ring focus:border-blue-300 transition"
                        placeholder="Write a short bio"
                      />
                    </div>

                    <div>
                      <label
                        className="font-semibold text-gray-700"
                        htmlFor="skills"
                      >
                        Skills:
                      </label>
                      <input
                        id="skills"
                        type="text"
                        name="skills"
                        value={user?.skills?.join(", ") || ""}
                        onChange={handleChange}
                        className="border rounded p-2 mb-2 w-full focus:outline-none focus:ring focus:border-blue-300 transition"
                        placeholder="Skills (comma separated)"
                      />
                    </div>

                    <div>
                      <label
                        className="font-semibold text-gray-700"
                        htmlFor="hobbies"
                      >
                        Hobbies:
                      </label>
                      <input
                        id="hobbies"
                        type="text"
                        name="hobbies"
                        value={user?.hobbies?.join(", ") || ""}
                        onChange={handleChange}
                        className="border rounded p-2 mb-2 w-full focus:outline-none focus:ring focus:border-blue-300 transition"
                        placeholder="Hobbies (comma separated)"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>Bio: {user?.bio}</p>
                    <p>Skills: {user?.skills?.join(", ")}</p>
                    <p>Hobbies: {user?.hobbies?.join(", ")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
