import axios from "axios";
import { toast } from "react-toastify";
import { getApiUrl } from "../config/config";

/**
 * Global logout utility function
 * Can be used from anywhere in the app
 */
export const performGlobalLogout = async (dispatch, navigate, setters = {}) => {
  console.log("Performing global logout...");

  const loadingToast = toast.loading("Logging out...");

  try {
    // Call server logout endpoint
    const response = await axios.post(
      getApiUrl("/user/logout"),
      {},
      {
        withCredentials: true,
        timeout: 10000,
      }
    );

    if (response.status === 200 && response.data.success) {
      console.log("Server logout successful");
    }
  } catch (error) {
    console.error("Server logout failed:", error);
  }

  // Perform cleanup regardless of server response
  performLogoutCleanup(dispatch, navigate, setters);

  toast.dismiss(loadingToast);
  toast.success("Logged out successfully");
};

/**
 * Cleanup function for logout
 */
export const performLogoutCleanup = (dispatch, navigate, setters = {}) => {
  // Redux actions
  if (dispatch) {
    const { setIsAuthenticated, setIsAdmin } = require("../Features/roleSlice");
    dispatch(setIsAuthenticated(false));
    dispatch(setIsAdmin(false));
  }

  // Local state setters
  if (setters.setUserRole) setters.setUserRole(null);
  if (setters.setIsDropdownOpen) setters.setIsDropdownOpen(false);

  // Clear all storage
  clearAllStorage();

  // Navigate to home
  if (navigate) {
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 100);
  }

  console.log("Logout cleanup completed");
};

/**
 * Clear all storage related to authentication
 */
export const clearAllStorage = () => {
  // Clear localStorage
  const localStorageKeys = [
    "userToken",
    "userRole",
    "isAuthenticated",
    "isAdmin",
    "persist:root",
    "authToken",
    "user",
    "userSession",
  ];

  localStorageKeys.forEach((key) => {
    localStorage.removeItem(key);
  });

  // Clear sessionStorage
  const sessionStorageKeys = [
    "userToken",
    "userRole",
    "isAuthenticated",
    "isAdmin",
    "authToken",
    "user",
    "userSession",
  ];

  sessionStorageKeys.forEach((key) => {
    sessionStorage.removeItem(key);
  });

  console.log("All storage cleared");
};

/**
 * Check if user is actually authenticated by validating with server
 */
export const validateAuthenticationStatus = async () => {
  try {
    const response = await axios.get(getApiUrl("/user/validate-auth"), {
      withCredentials: true,
    });

    return response.data.isAuthenticated || false;
  } catch (error) {
    console.error("Auth validation failed:", error);
    return false;
  }
};
