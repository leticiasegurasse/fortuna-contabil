// Serviço para gerenciar tags
import { apiService } from './api';
import { API_CONFIG } from '../config';
import type { Tag, ApiResponse, PaginatedResponse } from '../types/blog';

export class TagService {
  // Listar todas as tags
  async getTags(): Promise<Tag[]> {
    try {
      const response = await apiService.get<ApiResponse<Tag[]>>(
        API_CONFIG.ENDPOINTS.TAGS.LIST
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Erro ao buscar tags');
    } catch (error) {
      console.error('Erro no TagService.getTags:', error);
      throw error;
    }
  }

  // Buscar tags populares
  async getPopularTags(limit: number = 10): Promise<Tag[]> {
    try {
      const response = await apiService.get<ApiResponse<Tag[]>>(
        `${API_CONFIG.ENDPOINTS.TAGS.POPULAR}?limit=${limit}`
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Erro ao buscar tags populares');
    } catch (error) {
      console.error('Erro no TagService.getPopularTags:', error);
      throw error;
    }
  }

  // Buscar tag por ID
  async getTagById(id: number): Promise<Tag> {
    try {
      const response = await apiService.get<ApiResponse<Tag>>(
        API_CONFIG.ENDPOINTS.TAGS.GET(id)
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Tag não encontrada');
    } catch (error) {
      console.error('Erro no TagService.getTagById:', error);
      throw error;
    }
  }

  // Buscar tag por slug
  async getTagBySlug(slug: string): Promise<Tag> {
    try {
      const response = await apiService.get<ApiResponse<Tag>>(
        API_CONFIG.ENDPOINTS.TAGS.GET_BY_SLUG(slug)
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Tag não encontrada');
    } catch (error) {
      console.error('Erro no TagService.getTagBySlug:', error);
      throw error;
    }
  }

  // Criar nova tag
  async createTag(tagData: Partial<Tag>, token: string): Promise<Tag> {
    try {
      const response = await apiService.post<ApiResponse<Tag>>(
        API_CONFIG.ENDPOINTS.TAGS.CREATE,
        tagData,
        token
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Erro ao criar tag');
    } catch (error) {
      console.error('Erro no TagService.createTag:', error);
      throw error;
    }
  }

  // Atualizar tag
  async updateTag(id: number, tagData: Partial<Tag>, token: string): Promise<Tag> {
    try {
      const response = await apiService.put<ApiResponse<Tag>>(
        API_CONFIG.ENDPOINTS.TAGS.UPDATE(id),
        tagData,
        token
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Erro ao atualizar tag');
    } catch (error) {
      console.error('Erro no TagService.updateTag:', error);
      throw error;
    }
  }

  // Excluir tag
  async deleteTag(id: number, token: string): Promise<void> {
    try {
      const response = await apiService.delete<ApiResponse<void>>(
        API_CONFIG.ENDPOINTS.TAGS.DELETE(id),
        token
      );
      
      if (!response.success) {
        throw new Error(response.message || 'Erro ao excluir tag');
      }
    } catch (error) {
      console.error('Erro no TagService.deleteTag:', error);
      throw error;
    }
  }

  // Buscar posts de uma tag
  async getTagPosts(tagId: number, page: number = 1, limit: number = 10): Promise<PaginatedResponse<any>> {
    try {
      let endpoint = API_CONFIG.ENDPOINTS.TAGS.GET_POSTS(tagId);
      const params = new URLSearchParams();
      
      if (page > 1) params.append('page', page.toString());
      if (limit !== 10) params.append('limit', limit.toString());
      
      if (params.toString()) {
        endpoint += `?${params.toString()}`;
      }

      const response = await apiService.get<ApiResponse<any[]>>(endpoint);
      
      if (response.success && response.data && response.pagination) {
        return {
          data: response.data,
          pagination: response.pagination
        };
      }
      
      throw new Error(response.message || 'Erro ao buscar posts da tag');
    } catch (error) {
      console.error('Erro no TagService.getTagPosts:', error);
      throw error;
    }
  }

  // Associar tag a um post
  async associateTagToPost(tagId: number, postId: number, token: string): Promise<void> {
    try {
      const response = await apiService.post<ApiResponse<void>>(
        API_CONFIG.ENDPOINTS.TAGS.ASSOCIATE_POST(tagId, postId),
        {},
        token
      );
      
      if (!response.success) {
        throw new Error(response.message || 'Erro ao associar tag ao post');
      }
    } catch (error) {
      console.error('Erro no TagService.associateTagToPost:', error);
      throw error;
    }
  }

  // Desassociar tag de um post
  async disassociateTagFromPost(tagId: number, postId: number, token: string): Promise<void> {
    try {
      const response = await apiService.delete<ApiResponse<void>>(
        API_CONFIG.ENDPOINTS.TAGS.DISASSOCIATE_POST(tagId, postId),
        token
      );
      
      if (!response.success) {
        throw new Error(response.message || 'Erro ao desassociar tag do post');
      }
    } catch (error) {
      console.error('Erro no TagService.disassociateTagFromPost:', error);
      throw error;
    }
  }
}

export const tagService = new TagService();
