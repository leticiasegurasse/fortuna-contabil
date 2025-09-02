import apiClient from '../lib/axios';

export interface NewsletterSubscriber {
  id: number;
  email: string;
  isActive: boolean;
  subscribedAt: string;
  unsubscribedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsletterStats {
  totalSubscribers: number;
  activeSubscribers: number;
  inactiveSubscribers: number;
  recentSubscriptions: number;
  lastUpdated: string;
}

export interface NewsletterPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface NewsletterResponse {
  subscribers: NewsletterSubscriber[];
  pagination: NewsletterPagination;
}

export interface NewsletterParams {
  page?: number;
  limit?: number;
  status?: 'active' | 'inactive';
}

class NewsletterService {
  // Inscrever na newsletter
  async subscribe(email: string) {
    const response = await apiClient.post('/api/newsletter/subscribe', { email });
    return response.data;
  }

  // Cancelar inscrição na newsletter
  async unsubscribe(email: string) {
    const response = await apiClient.post('/api/newsletter/unsubscribe', { email });
    return response.data;
  }

  // Verificar status de inscrição
  async checkSubscription(email: string) {
    const response = await apiClient.get(`/api/newsletter/check/${encodeURIComponent(email)}`);
    return response.data;
  }

  // Listar inscritos (requer autenticação)
  async getSubscribers(params: NewsletterParams = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.status) queryParams.append('status', params.status);

    const response = await apiClient.get(`/api/newsletter/subscribers?${queryParams.toString()}`);
    return response.data;
  }

  // Obter estatísticas da newsletter (requer autenticação)
  async getStats() {
    const response = await apiClient.get('/api/newsletter/stats');
    return response.data;
  }

  // Exportar lista de inscritos (requer autenticação)
  async exportSubscribers(format: 'csv' | 'json' = 'csv') {
    const response = await apiClient.get(`/api/newsletter/export?format=${format}`, {
      responseType: 'blob'
    });
    return response.data;
  }

  // Reativar inscrição cancelada
  async reactivateSubscription(email: string) {
    // Para reativar, usamos o endpoint de subscribe que automaticamente reativa
    const response = await apiClient.post('/api/newsletter/subscribe', { email });
    return response.data;
  }

  // Obter histórico de inscrições por email
  async getSubscriptionHistory(email: string) {
    const response = await apiClient.get(`/api/newsletter/history/${encodeURIComponent(email)}`);
    return response.data;
  }
}

export const newsletterService = new NewsletterService();
export default newsletterService;
