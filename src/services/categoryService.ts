// Serviço para gerenciar categorias
import { apiService } from './api';
import { API_CONFIG, DEBUG_CONFIG } from '../config';
import type { Category, ApiResponse, PaginatedResponse } from '../types/blog';

export class CategoryService {
  // Listar todas as categorias
  async getCategories(): Promise<Category[]> {
    try {
      const response = await apiService.get<ApiResponse<Category[]>>(
        API_CONFIG.ENDPOINTS.CATEGORIES.LIST
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Erro ao buscar categorias');
    } catch (error) {
      console.error('Erro no CategoryService.getCategories:', error);
      
      // Fallback para dados mock em desenvolvimento
      if (DEBUG_CONFIG.MOCK_DATA && DEBUG_CONFIG.ENABLE_LOGS) {
        console.warn('Usando dados mock para categorias');
        return DEBUG_CONFIG.MOCK_CATEGORIES;
      }
      
      throw error;
    }
  }

  // Buscar categoria por ID
  async getCategoryById(id: number): Promise<Category> {
    try {
      const response = await apiService.get<ApiResponse<Category>>(
        API_CONFIG.ENDPOINTS.CATEGORIES.GET(id)
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Categoria não encontrada');
    } catch (error) {
      console.error('Erro no CategoryService.getCategoryById:', error);
      throw error;
    }
  }

  // Criar nova categoria
  async createCategory(categoryData: Partial<Category>, token: string): Promise<Category> {
    try {
      const response = await apiService.post<ApiResponse<Category>>(
        API_CONFIG.ENDPOINTS.CATEGORIES.CREATE,
        categoryData,
        token
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Erro ao criar categoria');
    } catch (error) {
      console.error('Erro no CategoryService.createCategory:', error);
      throw error;
    }
  }

  // Atualizar categoria
  async updateCategory(id: number, categoryData: Partial<Category>, token: string): Promise<Category> {
    try {
      const response = await apiService.put<ApiResponse<Category>>(
        API_CONFIG.ENDPOINTS.CATEGORIES.UPDATE(id),
        categoryData,
        token
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Erro ao atualizar categoria');
    } catch (error) {
      console.error('Erro no CategoryService.updateCategory:', error);
      throw error;
    }
  }

  // Excluir categoria
  async deleteCategory(id: number, token: string): Promise<void> {
    try {
      const response = await apiService.delete<ApiResponse<void>>(
        API_CONFIG.ENDPOINTS.CATEGORIES.DELETE(id),
        token
      );
      
      if (!response.success) {
        throw new Error(response.message || 'Erro ao excluir categoria');
      }
    } catch (error) {
      console.error('Erro no CategoryService.deleteCategory:', error);
      throw error;
    }
  }

  // Buscar categorias com paginação
  async getCategoriesPaginated(
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<PaginatedResponse<Category>> {
    try {
      let endpoint = API_CONFIG.ENDPOINTS.CATEGORIES.LIST;
      const params = new URLSearchParams();
      
      if (page > 1) params.append('page', page.toString());
      if (limit !== 10) params.append('limit', limit.toString());
      if (search) params.append('search', search);
      
      if (params.toString()) {
        endpoint += `?${params.toString()}`;
      }

      const response = await apiService.get<ApiResponse<Category[]>>(endpoint);
      
      if (response.success && response.data && response.pagination) {
        return {
          data: response.data,
          pagination: response.pagination
        };
      }
      
      throw new Error(response.message || 'Erro ao buscar categorias');
    } catch (error) {
      console.error('Erro no CategoryService.getCategoriesPaginated:', error);
      throw error;
    }
  }
}

export const categoryService = new CategoryService();
