import {
  clearUser,
  setUser,
  setUsers,
  updateUser,
} from "@/redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";

export function useAuth() {
  const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api/auth`;
  const { user } = useSelector((state) => state.auth);
  const auth_token = user?.token;
  const dispatch = useDispatch();

  const signIn = async ({ email, password }) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sign-in failed");
      }

      const userData = await response.json();
      dispatch(setUser(userData));
      return userData;
    } catch (error) {
      console.error("Sign-in error:", error.message);
      throw error;
    }
  };

  const signUp = async (userDetails) => {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sign-up failed");
      }

      return response.json();
    } catch (error) {
      console.error("Sign-up error:", error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const response = await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Sign-out failed");
      }

      // First clear the user
      dispatch(clearUser());
      // Then reset the entire store
      dispatch({ type: "RESET_STORE" });

      return null;
    } catch (error) {
      console.error("Sign-out error:", error.message);
      throw error;
    }
  };

  const requestPasswordReset = async ({ email }) => {
    try {
      const response = await fetch(`${BASE_URL}/password/reset-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Password reset request failed");
      }

      return response.json();
    } catch (error) {
      console.error("Password reset request error:", error.message);
      throw error;
    }
  };

  const resetPassword = async ({ token, newPassword }) => {
    try {
      const response = await fetch(`${BASE_URL}/password/reset/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Password reset failed");
      }

      return response.json();
    } catch (error) {
      console.error("Password reset error:", error.message);
      throw error;
    }
  };

  const updateProfile = async (profileData, userId) => {
    try {
      const response = await fetch(`${BASE_URL}/profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`,
        },
        credentials: "include",
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Profile update failed");
      }

      const updatedUser = await response.json();
      dispatch(updateUser(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error("Profile update error:", error.message);
      throw error;
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch users");
      }

      const usersData = await response.json();
      dispatch(setUsers(usersData));

      return usersData;
    } catch (error) {
      console.error("Get all users error:", error.message);
      throw error;
    }
  };

  const revokeUserAccess = async (userId, status) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/users/${userId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`,
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user status");
      }

      return response.json();
    } catch (error) {
      console.error("Error updating user status:", error.message);
      throw error;
    }
  };

  const updateUserRole = async (role, userId) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`,
        },
        credentials: "include",
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user role");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("user role update error:", error.message);
      throw error;
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    requestPasswordReset,
    resetPassword,
    updateProfile,
    getAllUsers,
    revokeUserAccess,
    updateUserRole,
  };
}
