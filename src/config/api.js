export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/api/health`,
  AUTH: {
    SIGNUP: `${API_BASE_URL}/api/auth/signup`,
    RESEND_SIGNUP_OTP: `${API_BASE_URL}/api/auth/signup/resend-otp`,
    VERIFY_SIGNUP_OTP: `${API_BASE_URL}/api/auth/signup/verify-otp`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
  },
  RESTAURANTS: {
    GET_ALL: `${API_BASE_URL}/api/restaurants`,
    GET_BY_ID: (id) => `${API_BASE_URL}/api/restaurants/${id}`,
  },
  ORDERS: {
    PLACE_ORDER: `${API_BASE_URL}/api/orders/place-order`,
  },
};

export const apiRequest = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || data.error || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default API_BASE_URL;
