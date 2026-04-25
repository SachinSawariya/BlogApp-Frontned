import { apiList } from './list';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:9876';

/**
 * Global error handler for API calls
 * @param {Error} error - The error object
 * @throws {Object} Structured error object
 */
const handleError = (error) => {
  const errorResponse = {
    status: error?.response?.status || 500,
    message: error?.response?.data?.message || error.message || 'An unexpected error occurred',
    data: error?.response?.data || null,
    code: error?.response?.data?.code || 'UNKNOWN_ERROR'
  };

  if (errorResponse.status === 401 || errorResponse.code === 'UNAUTHENTICATED') {
    // Optionally handle session logout logic here if needed centrally
    console.warn('Authentication error detected');
  }

  console.error('API Error:', {
    status: errorResponse.status,
    message: errorResponse.message,
    code: errorResponse.code
  });
  
  throw errorResponse;
};

/**
 * Common API function for handling fetch requests
 * @param {Object} options - Options for the API call
 * @param {string} options.action - The API action key from apiList
 * @param {Array} [options.parameters=[]] - Parameters to be passed to URL functions
 * @param {Object} [options.data={}] - Request body data (for POST/PUT)
 * @param {Object} [options.config={}] - Additional fetch configurations
 * @returns {Promise<any>} - The JSON response from the API
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

  // Get token from localStorage as the primary source of truth for the API layer
  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token') || '';
  }

  // Build the URL, supporting both static strings and functions
  const urlPath = typeof apiConfig.url === 'function' 
    ? apiConfig.url(...parameters)
    : apiConfig.url;

  const fullUrl = `${API_BASE_URL}${urlPath.startsWith('/') ? '' : '/'}${urlPath}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...(config.headers || {})
  };

  const requestOptions = {
    method: apiConfig.method,
    headers,
    ...config,
    ...(data && ['POST', 'PUT', 'PATCH'].includes(apiConfig.method) && { 
      body: JSON.stringify(data) 
    })
  };

  try {
    const response = await fetch(fullUrl, requestOptions);
    
    // Check if response is JSON before parsing
    const contentType = response.headers.get('content-type');
    let responseData;
    
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = { message: await response.text() };
    }

    if (!response.ok) {
      const error = new Error(responseData.message || 'Request failed');
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