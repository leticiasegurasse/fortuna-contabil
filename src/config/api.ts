// Configuração da API
export const API_CONFIG = {
  // URL base da API (ajuste conforme seu ambiente)
  BASE_URL: import.meta.env.VITE_API_URL || 'https://api.fortunacontabil.com.br',
  
  // Endpoints da API
  ENDPOINTS: {
    // Autenticação
    AUTH: {
      LOGIN: '/api/auth/login',
      REFRESH: '/api/auth/refresh',
    },
    
    // Categorias
    CATEGORIES: {
      LIST: '/api/categories',
      GET: (id: number) => `/api/categories/${id}`,
      CREATE: '/api/categories',
      UPDATE: (id: number) => `/api/categories/${id}`,
      DELETE: (id: number) => `/api/categories/${id}`,
    },
    
    // Posts
    POSTS: {
      LIST: '/api/posts',
      GET: (id: number) => `/api/posts/${id}`,
      GET_BY_SLUG: (slug: string) => `/api/posts/slug/${slug}`,
      CREATE: '/api/posts',
      UPDATE: (id: number) => `/api/posts/${id}`,
      DELETE: (id: number) => `/api/posts/${id}`,
      UPDATE_STATUS: (id: number) => `/api/posts/${id}/status`,
    },
    
    // Tags
    TAGS: {
      LIST: '/api/tags',
      POPULAR: '/api/tags/popular',
      GET: (id: number) => `/api/tags/${id}`,
      GET_BY_SLUG: (slug: string) => `/api/tags/slug/${slug}`,
      GET_POSTS: (id: number) => `/api/tags/${id}/posts`,
      CREATE: '/api/tags',
      UPDATE: (id: number) => `/api/tags/${id}`,
      DELETE: (id: number) => `/api/tags/${id}`,
      ASSOCIATE_POST: (tagId: number, postId: number) => `/api/tags/${tagId}/posts/${postId}`,
      DISASSOCIATE_POST: (tagId: number, postId: number) => `/api/tags/${tagId}/posts/${postId}`,
    },
  },
  
  // Headers padrão
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
  
  // Timeout das requisições (em ms)
  TIMEOUT: 10000,
};

// Função para construir URL completa
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Função para adicionar token de autenticação
export const getAuthHeaders = (token?: string) => {
  const headers: Record<string, string> = { ...API_CONFIG.DEFAULT_HEADERS };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Função para fazer requisições HTTP
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
  token?: string
) => {
  const url = buildApiUrl(endpoint);
  const headers = getAuthHeaders(token);
  
  const config: RequestInit = {
    headers,
    ...options,
  };
  
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};
