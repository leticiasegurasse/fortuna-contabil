// Instância do Axios configurada para uso na aplicação
import axios from 'axios';
import { API_CONFIG } from '../config';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Token adicionado à requisição:', config.url);
    } else {
      console.log('⚠️ Nenhum token encontrado para:', config.url);
    }
    return config;
  },
  (error) => {
    console.error('❌ Erro no interceptor de requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de respostas
api.interceptors.response.use(
  (response) => {
    console.log('✅ Resposta recebida:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('❌ Erro na resposta:', error.config?.url, error.response?.status, error.response?.data);
    
    // Se receber 401, redirecionar para login
    if (error.response?.status === 401) {
      console.log('🚪 Redirecionando para login devido a token inválido');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api; 