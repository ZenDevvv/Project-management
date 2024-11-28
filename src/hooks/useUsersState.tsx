// src/hooks/useUsersState.tsx
import { useState, useEffect, useRef, useCallback } from "react";
import UserService from "../api/userApi";
import { useAuth } from "../context/AuthContext";
import { User } from "../config/interfaces";

const { getUserById } = UserService;

export const useUsersState = () => {
  const [users, setUsers] = useState<User>();
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);
  const { isAuthenticated } = useAuth();

  const fetchUsers = useCallback(async () => {
    if (hasFetched.current || !isAuthenticated) return;

    try {
      const data = await getUserById(
        "username firstname lastname email password phoneNumber position avatarImage status type lastActive address bio skills hobbies company hireDate address"
      );

      setUsers(data);
      hasFetched.current = true;
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setError("Failed to fetch users. Please try again later.");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    setUsers,
    error,
  };
};
