import { clearUser, setUser, updateUser } from "@/redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";

export function useAuth() {
  const BASE_URL = "https://lms-server-kkry.onrender.com/api/auth";
  const { user } = useSelector((state) => state.auth);
  console.log("🚀 ~ useAuth ~ user:", user);
  const { token } = user;
  console.log("🚀 ~ useAuth ~ token:", token);
  const dispatch = useDispatch();

  const signIn = async ({ email, password }) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error during Sign In");
      }

      const user = await response.json();
      console.log("🚀 ~ signIn ~ user:", user);
      dispatch(setUser(user));
      return user;
    } catch (error) {
      console.error("Error during Sign In:", error.message);
      throw error;
    }
  };

  const signUp = async ({ email, password, username, full_name, userType }) => {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          username,
          full_name,
          userType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error during sign up");
      }

      return response.json();
    } catch (error) {
      console.error("Error during sign up:", error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const response = await fetch(`${BASE_URL}/logout`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Error signing out");
      }

      dispatch(clearUser(null));
      return null;
    } catch (error) {
      console.error("Error during sign out:", error);
      throw error;
    }
  };

  const requestPasswordReset = async ({ email }) => {
    try {
      const response = await fetch(`${BASE_URL}/request-password-reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error requesting password reset");
      }

      return response.json();
    } catch (error) {
      console.error("Error during password reset request:", error);
      throw error;
    }
  };

  const resetPassword = async ({ token, newPassword }) => {
    try {
      const response = await fetch(`${BASE_URL}/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error resetting password");
      }

      return response.json();
    } catch (error) {
      console.error("Error during password reset:", error);
      throw error;
    }
  };

  const updateProfile = async (userId, profileData) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error updating profile");
      }

      const updatedUser = await response.json();
      console.log("🚀 ~ updateProfile ~ updatedUser:", updatedUser);
      dispatch(updateUser(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error("Error updating profile:", error.message);
      throw error;
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error fetching users");
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching users:", error.message);
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
  };
}
