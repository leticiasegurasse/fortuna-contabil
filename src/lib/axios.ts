// Instância do Axios configurada para uso na aplicação
import axios from 'axios';
import { API_URL } from '../config/api';

const api = axios.create({
  baseURL: API_URL, // Altere para a URL real da API
  timeout: 10000,
});

export default api; 