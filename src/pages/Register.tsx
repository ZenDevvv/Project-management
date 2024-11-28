import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserService from "../api/userApi";
import BG from "../assets/BG.jpg";
import LOGO from "../assets/uzaro.png";
import { CONSTANTS } from "../config/config";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    const userData = {
      username,
      firstname,
      lastname,
      email,
      password,
    };

    try {
      await UserService.createUser(userData);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${BG})`,
      }}
    >
      {/* Enhanced Overlay for Better 3D Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-transparent to-black/70" />
      <div className="relative z-10 flex bg-white bg-opacity-90 rounded-xl shadow-lg w-full max-w-5xl">
        {/* Left Section */}
        <div className="w-1/2 p-8 flex flex-col items-center justify-center bg-blue-100 rounded-l-xl">
          <img src={LOGO} alt="Uzaro Logo" className="h-20 w-auto mb-6" />
          <h2 className="text-2xl font-bold text-center mb-4">
            {CONSTANTS.REGISTER.WELCOME_TEXT}
          </h2>
          <p className="text-center text-gray-600">
            {CONSTANTS.REGISTER.LOGIN_DESCRIPTION}
          </p>
        </div>
        {/* Right Section */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-6">
            {CONSTANTS.REGISTER.TITLE}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your last name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CONSTANTS.REGISTER.REGISTER}
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            {CONSTANTS.LOGIN.NO_ACCOUNT}{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
