const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const getAuthHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});

export const loginUser = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
};

export const getPortfolioItems = async (category = '') => {
  const url = new URL(`${API_BASE_URL}/portfolio`);

  if (category) {
    url.searchParams.set('category', category);
  }

  const response = await fetch(url.toString());

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to load portfolio items');
  }

  return data;
};

export const getPortfolioItemById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/portfolio/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to load portfolio item');
  }

  return data;
};

export const uploadPortfolioItem = async (formData, token) => {
  const response = await fetch(`${API_BASE_URL}/portfolio`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(token),
    },
    body: formData,
  });
  
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Upload failed');
  }

  return data;
};

export const deletePortfolioItem = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/portfolio/${id}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeaders(token),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Delete failed');
  }

  return data;
};