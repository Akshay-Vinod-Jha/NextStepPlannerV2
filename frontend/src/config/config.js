// API Configuration
export const API_CONFIG = {
  BASE_URL: "https://next-step-planner-v2.vercel.app",
  // For development, you can switch back to:
  // BASE_URL: 'http://localhost:5001',
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
