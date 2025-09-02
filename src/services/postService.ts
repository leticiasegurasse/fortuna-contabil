// Serviço para gerenciar posts
import { apiService } from './api';
import { API_CONFIG } from '../config';
import type { Post, PostFormData, ApiResponse, PaginatedResponse, ContentBlock } from '../types/blog';

export class PostService {
  // Listar todos os posts
  async getPosts(
    page: number = 1,
    limit: number = 10,
    status?: string,
    categoryId?: number,
    search?: string
  ): Promise<PaginatedResponse<Post>> {
    try {
      let endpoint = API_CONFIG.ENDPOINTS.POSTS.LIST;
      const params = new URLSearchParams();
      
      if (page > 1) params.append('page', page.toString());
      if (limit !== 10) params.append('limit', limit.toString());
      if (status) params.append('status', status);
      if (categoryId) params.append('categoryId', categoryId.toString());
      if (search) params.append('search', search);
      
      if (params.toString()) {
        endpoint += `?${params.toString()}`;
      }

      const response = await apiService.get<ApiResponse<Post[]>>(endpoint);
      
      if (response.success && response.data && response.pagination) {
        return {
          data: response.data,
          pagination: response.pagination
        };
      }
      
      throw new Error(response.message || 'Erro ao buscar posts');
    } catch (error) {
      console.error('Erro no PostService.getPosts:', error);
      throw error;
    }
  }

  // Buscar post por ID
  async getPostById(id: number): Promise<Post> {
    try {
      const response = await apiService.get<ApiResponse<Post>>(
        API_CONFIG.ENDPOINTS.POSTS.GET(id)
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Post não encontrado');
    } catch (error) {
      console.error('Erro no PostService.getPostById:', error);
      throw error;
    }
  }

  // Buscar post por slug
  async getPostBySlug(slug: string): Promise<Post> {
    try {
      const response = await apiService.get<ApiResponse<Post>>(
        API_CONFIG.ENDPOINTS.POSTS.GET_BY_SLUG(slug)
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Post não encontrado');
    } catch (error) {
      console.error('Erro no PostService.getPostBySlug:', error);
      throw error;
    }
  }

  // Criar novo post
  async createPost(postData: PostFormData, token: string): Promise<Post> {
    try {
      const response = await apiService.post<ApiResponse<Post>>(
        API_CONFIG.ENDPOINTS.POSTS.CREATE,
        postData,
        token
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Erro ao criar post');
    } catch (error) {
      console.error('Erro no PostService.createPost:', error);
      throw error;
    }
  }

  // Atualizar post
  async updatePost(id: number, postData: Partial<PostFormData>, token: string): Promise<Post> {
    try {
      const response = await apiService.put<ApiResponse<Post>>(
        API_CONFIG.ENDPOINTS.POSTS.UPDATE(id),
        postData,
        token
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Erro ao atualizar post');
    } catch (error) {
      console.error('Erro no PostService.updatePost:', error);
      throw error;
    }
  }

  // Excluir post
  async deletePost(id: number, token: string): Promise<void> {
    try {
      const response = await apiService.delete<ApiResponse<void>>(
        API_CONFIG.ENDPOINTS.POSTS.DELETE(id),
        token
      );
      
      if (!response.success) {
        throw new Error(response.message || 'Erro ao excluir post');
      }
    } catch (error) {
      console.error('Erro no PostService.deletePost:', error);
      throw error;
    }
  }

  // Atualizar status do post
  async updatePostStatus(id: number, status: string, token: string): Promise<Post> {
    try {
      const response = await apiService.put<ApiResponse<Post>>(
        API_CONFIG.ENDPOINTS.POSTS.UPDATE_STATUS(id),
        { status },
        token
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Erro ao atualizar status do post');
    } catch (error) {
      console.error('Erro no PostService.updatePostStatus:', error);
      throw error;
    }
  }

  // Incrementar visualizações do post
  async incrementViews(id: number): Promise<void> {
    try {
      // Nota: Este endpoint pode não existir no backend ainda
      // Pode ser implementado como um PATCH ou PUT específico
      await apiService.patch<ApiResponse<void>>(
        `/api/posts/${id}/views`,
        { increment: true }
      );
    } catch (error) {
      console.error('Erro ao incrementar visualizações:', error);
      // Não falha a aplicação se não conseguir incrementar visualizações
    }
  }

  // Utilitários para blocos de conteúdo
  static generateBlockId(): string {
    return `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static createContentBlock(
    type: ContentBlock['type'],
    content: string,
    order: number,
    metadata?: ContentBlock['metadata']
  ): ContentBlock {
    return {
      id: PostService.generateBlockId(),
      type,
      content,
      order,
      metadata
    };
  }

  static reorderContentBlocks(blocks: ContentBlock[]): ContentBlock[] {
    return blocks
      .map((block, index) => ({ ...block, order: index + 1 }))
      .sort((a, b) => a.order - b.order);
  }

  static addContentBlock(
    blocks: ContentBlock[],
    type: ContentBlock['type'],
    content: string,
    metadata?: ContentBlock['metadata']
  ): ContentBlock[] {
    const newBlock = PostService.createContentBlock(
      type,
      content,
      blocks.length + 1,
      metadata
    );
    return [...blocks, newBlock];
  }

  static removeContentBlock(blocks: ContentBlock[], blockId: string): ContentBlock[] {
    return PostService.reorderContentBlocks(
      blocks.filter(block => block.id !== blockId)
    );
  }

  static updateContentBlock(
    blocks: ContentBlock[],
    blockId: string,
    updates: Partial<ContentBlock>
  ): ContentBlock[] {
    return blocks.map(block =>
      block.id === blockId ? { ...block, ...updates } : block
    );
  }

  static moveContentBlock(
    blocks: ContentBlock[],
    blockId: string,
    newOrder: number
  ): ContentBlock[] {
    const blockIndex = blocks.findIndex(block => block.id === blockId);
    if (blockIndex === -1) return blocks;

    const block = blocks[blockIndex];
    const newBlocks = blocks.filter(b => b.id !== blockId);
    
    // Inserir na nova posição
    newBlocks.splice(newOrder - 1, 0, { ...block, order: newOrder });
    
    // Reordenar todos os blocos
    return PostService.reorderContentBlocks(newBlocks);
  }
}

export const postService = new PostService();
