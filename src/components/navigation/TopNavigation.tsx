import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { app } from "../../config/app";
import Modal from "../modals/ReusableModal";
import { useAuth } from "../../context/AuthContext";
import { useUsersState } from "../../hooks/useUsersState";
import LOGO from "../../assets/uzaro12.png";
// Define the props for the main TopNavigation component
interface TopNavigationProps {
  className?: string;
  children?: React.ReactNode;
}

// Define the props for the Item component
interface ItemProps {
  className?: string;
  href: string;
  children: React.ReactNode;
}

// Define the type for the main TopNavigation component with the Item property
interface TopNavigationComponent extends React.FC<TopNavigationProps> {
  Item: React.FC<ItemProps>;
}

const TopNavigation: TopNavigationComponent = ({ className, children }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();
  const { users } = useUsersState();
  const isSupplierDetailPage = location.pathname.includes("/supplier/");
  const avatarImage = users?.avatarImage;

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    setModalOpen(true);
    closeDropdown();
  };

  const handleLogoutConfirm = () => {
    logout();
    setModalOpen(false);
    navigate("/login");
  };

  const profileNavItem = app.topNavigation.find(
    (item) => item.key === "profile"
  );

  return (
    <div
      className={twMerge(
        "flex w-full items-center justify-between min-h-16 h-16 bg-[#3d5c95] p-4 text-black border-b border-gray-300 shadow-lg",
        className
      )}
    >
      {(location.pathname === "/Projects" ||
        location.pathname === "/" ||
        location.pathname === "/Supplier" ||
        isSupplierDetailPage ||
        location.pathname === "/profile") && (
        <div className="flex justify-between items-center p-4 w-full">
          <nav>
            <Link to="/">
              <img
                src={LOGO}
                alt="Projects"
                className="w-32 h-12 object-cover"
              />
            </Link>
          </nav>

          <div className="flex space-x-4">
            <ul className="flex space-x-4">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    twMerge(
                      "text-lg font-medium",
                      isActive ? "text-[#a4d061]" : "text-[#ffffff]"
                    )
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Projects"
                  className={({ isActive }) =>
                    twMerge(
                      "text-lg font-medium",
                      isActive ? "text-[#a4d061]" : "text-[#ffffff]"
                    )
                  }
                >
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Supplier"
                  className={({ isActive }) =>
                    twMerge(
                      "text-lg font-medium",
                      isActive ? "text-[#a4d061]" : "text-[#ffffff]"
                    )
                  }
                >
                  Suppliers
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}

      <div className="flex-grow">{children}</div>

      <div className="relative flex items-center">
        <img
          onClick={toggleDropdown}
          src={avatarImage}
          alt="User Avatar"
          className="h-8 w-8 rounded-full cursor-pointer"
        />

        {isDropdownOpen && profileNavItem?.submenu && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {profileNavItem.submenu.map((subItem) => (
              <NavLink
                key={subItem.key}
                to={subItem.key === "logout" ? "#" : subItem.path}
                onClick={() => {
                  if (subItem.key === "logout") {
                    handleLogoutClick();
                  } else {
                    closeDropdown();
                  }
                }}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-lg transition duration-200"
              >
                {subItem.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleLogoutConfirm}
        text="Are you sure you want to logout?"
      />
    </div>
  );
};

// Define the Item component used within TopNavigation
const Item: React.FC<ItemProps> = ({ className, href, children, ...props }) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        twMerge(
          "p-4 px-6 text-sm hover:bg-opacity-70 rounded-lg transition duration-200",
          isActive ? "text-black bg-opacity-70 hover:bg-opacity-80" : "",
          className
        )
      }
      {...props}
    >
      {children}
    </NavLink>
  );
};

TopNavigation.Item = Item;

export { TopNavigation };
