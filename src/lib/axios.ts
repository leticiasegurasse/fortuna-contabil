// Instância do Axios configurada para uso na aplicação
import axios from 'axios';
import { API_CONFIG } from '../config';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL, // Altere para a URL real da API
  timeout: 10000,
});

export default api; 