import getConfig from 'next/config';
import { apiList } from './list';

// const { publicRuntimeConfig } = getConfig();

// const API_BASE_URL = publicRuntimeConfig.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

const API_BASE_URL = 'http://localhost:9876';

// Global error handler
const handleError = (error) => {
  if (error?.response?.status === 403) {
    return error?.response?.data;
  }
  
  const { data = {} } = error?.response || {};
  
  if (data?.code === 'UNAUTHENTICATED') {
    // handleSessionLogout();
    // showNotification('Oops, it looks like your session has expired!', 'error', { id: 'logout' });
    return error?.response?.data;
  } else if (data?.message && data?.message !== 'Permission not found!') {
    // showNotification(data?.message, 'error');
  }

  if (error) {
    console.error('API Error:', error);
  }
  
  throw error;
};

/**
 * Common API function
 * @param {Object} options - Options for the API call
 * @param {string} options.action - The API action from apiList
 * @param {Array} [options.parameters=[]] - Parameters for the URL
 * @param {Object} [options.data={}] - Request body data
 * @param {Object} [options.config={}] - Additional fetch config
 * @returns {Promise<any>} - The response data
 */
const commonApi = async ({
  action,
  parameters = [],
  data = {},
  config = {}
}) => {
  const apiConfig = apiList[action];
  
  if (!apiConfig) {
    throw new Error(`API action '${action}' not found in apiList`);
  }

  // Get token from localStorage
  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token') || '';
  }

  // Build the URL with parameters
  const url = typeof apiConfig.url === 'function' 
    ? apiConfig.url(...parameters)
    : apiConfig.url;

  // Prepare headers
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...(config.headers || {})
  };

  // Prepare request options
  const requestOptions = {
    method: apiConfig.method,
    headers,
    ...config,
    ...(data && apiConfig.method !== 'GET' && { 
      body: JSON.stringify(data) 
    })
  };

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, requestOptions);
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Something went wrong');
      error.response = {
        status: response.status,
        data: responseData
      };
      throw error;
    }

    return responseData;
  } catch (error) {
    return handleError(error);
  }
};

export default commonApi;