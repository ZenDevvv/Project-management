import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import BG from "../assets/BG.jpg";
import LOGO from "../assets/uzaro.png";
import { CONSTANTS } from "../config/config";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: "success" | "error";
    open: boolean;
  }>({ message: "", type: "success", open: false });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    try {
      await login(email, password);
      setSnackbar({
        message: CONSTANTS.LOGIN.SUCCESS_MESSAGE,
        type: "success",
        open: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setSnackbar({
        message: CONSTANTS.LOGIN.ERROR_MESSAGE,
        type: "error",
        open: true,
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
      <div className="relative z-10 flex bg-white bg-opacity-85 rounded-xl shadow-lg w-full max-w-4xl">
        {/* Left Section */}
        <div className="w-1/2 p-8 flex flex-col items-center justify-center bg-blue-100 rounded-l-xl">
          <img src={LOGO} alt="Uzaro Logo" className="h-16 w-auto mb-4" />
          <h2 className="text-2xl font-bold text-center mb-2">
            {CONSTANTS.LOGIN.WELCOME_TEXT}
          </h2>
          <p className="text-center text-gray-600">
            {CONSTANTS.LOGIN.LOGIN_DESCRIPTION}
          </p>
        </div>
        {/* Right Section */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-6">
            {CONSTANTS.LOGIN.TITLE}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="mb-5">
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
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="********"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CONSTANTS.LOGIN.TITLE}
            </button>
            <p className="text-center mt-4 text-gray-600">
              {CONSTANTS.LOGIN.NO_ACCOUNT}{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                {CONSTANTS.REGISTER.REGISTER}
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContent
          message={snackbar.message}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CheckIcon fontSize="small" />
            </IconButton>
          }
          style={{
            backgroundColor:
              snackbar.type === "success" ? "#4caf50" : "#f44336",
          }}
        />
      </Snackbar>
    </div>
  );
};

export default LoginPage;
