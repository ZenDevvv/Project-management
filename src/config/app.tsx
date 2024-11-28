import { RouteObject } from "react-router-dom";
import HomePage from "../pages/Home";
import DashboardPage from "../pages/Dasboard";
import ReportPage from "../pages/Report";
import ProfilePage from "../pages/Profile";
import { SupplierPage } from "../pages/SupplierPage";
import { Overview } from "../pages/Overview";
import { ProcurementPage } from "../pages/Project/ProcurementPage";

import { MainLayout } from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import ProjectSettings from "../pages/ProjectSettings.tsx";
import { SupplierDetailsPage } from "../pages/supplier/SupplierDetailsPage.tsx";
import { RiUserLine } from "react-icons/ri";


export const app = {
  routes: [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,

          element: <ProtectedRoute element={<Overview />} />,
        },
        {
          path: "/Projects",
          element: <ProtectedRoute element={<HomePage />} />,
        },

        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/dashboard/:projectName",
          element: <ProtectedRoute element={<DashboardPage />} />,
        },
        {
          path: "/report/:projectName",
          element: <ProtectedRoute element={<ReportPage />} />,
        },
        {
          path: "/supplier",
          element: <ProtectedRoute element={<SupplierPage />} />,
        },

        {
          path: "/profile",
          element: <ProtectedRoute element={<ProfilePage />} />,
        },
        {
          path: "/project/:projectName",
          element: <ProtectedRoute element={<ProcurementPage />} />,
        },
        {
          path: "/settings/:projectName",
          element: <ProtectedRoute element={<ProjectSettings />} />,
        },
        {
          path: "/supplier/:id",
          element: <ProtectedRoute element={<SupplierDetailsPage />} />,
        },
      ],
    },
  ] as RouteObject[],

  topNavigation: [
    {
      key: "profile",
      name: "Profile",
      type: "group",
      icon: <RiUserLine size={20} />,
      submenu: [
        {
          key: "profile",
          name: "Profile",
          type: "link",
          path: "/profile",
        },
        {
          key: "settings",
          name: "Settings",
          type: "link",
          path: "/settings",
        },
        {
          key: "logout",
          name: "Logout",
          type: "link",
          path: "/logout",
        },
      ],
    },
  ],
  //this is different from routes, this is used for generating the side navigation
  /*
        If you have nested navigation, you can use the group type: 
        {
            key: 'users',
            name: 'User',
            type: 'group',
            path: 'users ,
            icon: 'insert react icon or any icon from any icon library here'
            submenu: [
                {
                    key: 'client',
                    name: 'Client',
                    type: 'link',
                    path: 'users/client/',
                    icon: <FaRegUser size={14} />
                },
            ]
        }
    */
};
