import api from '../lib/axios';

export interface UploadResponse {
  success: boolean;
  message: string;
  data: {
    filename: string;
    originalName: string;
    size: number;
    mimetype: string;
    url: string;
  };
}

export interface UploadError {
  success: false;
  message: string;
}

class UploadService {
  private baseURL = '/api/upload';

  /**
   * Sanitiza uma URL de imagem, convertendo localhost para URL de produção
   * @param url - URL a ser sanitizada
   * @returns URL sanitizada
   */
  private sanitizeImageUrl(url: string): string {
    if (!url) return url;
    
    const productionBaseURL = import.meta.env.VITE_API_URL || 'https://api.fortunacontabil.com.br';
    
    // Se contém localhost, substituir pela URL de produção
    if (url.includes('localhost:3001')) {
      const path = url.split('/uploads/')[1];
      if (path) {
        return `${productionBaseURL}/uploads/${path}`;
      }
    }
    
    // Se contém http://localhost (sem porta), também substituir
    if (url.includes('http://localhost')) {
      const path = url.split('/uploads/')[1];
      if (path) {
        return `${productionBaseURL}/uploads/${path}`;
      }
    }
    
    return url;
  }

  /**
   * Faz upload de uma imagem para o servidor
   * @param file - Arquivo de imagem para upload
   * @param token - Token de autenticação
   * @returns Promise com a resposta do upload
   */
  async uploadImage(file: File, token: string): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post<UploadResponse>(
        `${this.baseURL}/image`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new Error(error.response.data.message || 'Erro no upload da imagem');
      }
      throw new Error('Erro de conexão durante o upload');
    }
  }

  /**
   * Exclui uma imagem do servidor
   * @param filename - Nome do arquivo a ser excluído
   * @param token - Token de autenticação
   * @returns Promise com a resposta da exclusão
   */
  async deleteImage(filename: string, token: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.delete(`${this.baseURL}/image/${filename}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new Error(error.response.data.message || 'Erro ao excluir imagem');
      }
      throw new Error('Erro de conexão ao excluir imagem');
    }
  }

  /**
   * Gera a URL completa para uma imagem
   * @param filename - Nome do arquivo
   * @returns URL completa da imagem
   */
  getImageUrl(filename: string): string {
    // Primeiro, sanitizar a URL se necessário
    const sanitizedUrl = this.sanitizeImageUrl(filename);
    
    // Usar a mesma configuração da API
    const baseURL = import.meta.env.VITE_API_URL || 'https://api.fortunacontabil.com.br';
    
    // Se já é uma URL completa e sanitizada, retornar como está
    if (sanitizedUrl.startsWith('http://') || sanitizedUrl.startsWith('https://')) {
      return sanitizedUrl;
    }
    
    // Se é um caminho relativo, adiciona a base da API
    if (sanitizedUrl.startsWith('/uploads/')) {
      return `${baseURL}${sanitizedUrl}`;
    }
    
    // Se é apenas o nome do arquivo, constrói o caminho completo
    return `${baseURL}/uploads/${sanitizedUrl}`;
  }

  /**
   * Valida se um arquivo é uma imagem válida
   * @param file - Arquivo a ser validado
   * @returns true se for válido, false caso contrário
   */
  validateImageFile(file: File): { isValid: boolean; error?: string } {
    // Verificar tipo MIME
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'Tipo de arquivo não suportado. Apenas imagens são permitidas.'
      };
    }

    // Verificar tamanho (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB em bytes
    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'Arquivo muito grande. Tamanho máximo permitido: 5MB'
      };
    }

    return { isValid: true };
  }

  /**
   * Comprime uma imagem antes do upload
   * @param file - Arquivo de imagem
   * @param quality - Qualidade da compressão (0.1 a 1.0)
   * @param maxWidth - Largura máxima em pixels
   * @returns Promise com a imagem comprimida como Blob
   */
  async compressImage(
    file: File, 
    quality: number = 0.8, 
    maxWidth: number = 800
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      let objectURL: string | null = null;

      // Limpar recursos em caso de erro
      const cleanup = () => {
        if (objectURL) {
          URL.revokeObjectURL(objectURL);
        }
      };

      img.onload = () => {
        try {
          let { width, height } = img;
          
          // Redimensionar mantendo proporção
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          
          if (ctx) {
            // Configurar contexto para melhor qualidade
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            ctx.drawImage(img, 0, 0, width, height);
            
            // Converter para blob com qualidade especificada
            canvas.toBlob(
              (blob) => {
                cleanup();
                if (blob) {
                  resolve(blob);
                } else {
                  reject(new Error('Falha ao comprimir imagem - blob é null'));
                }
              },
              'image/jpeg',
              quality
            );
          } else {
            cleanup();
            reject(new Error('Contexto do canvas não disponível'));
          }
        } catch (error) {
          cleanup();
          reject(new Error(`Erro durante compressão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`));
        }
      };

      img.onerror = () => {
        cleanup();
        reject(new Error('Falha ao carregar imagem - arquivo pode estar corrompido ou em formato não suportado'));
      };

      // Configurar crossOrigin para evitar problemas de CORS
      img.crossOrigin = 'anonymous';
      
      try {
        objectURL = URL.createObjectURL(file);
        img.src = objectURL;
      } catch (error) {
        cleanup();
        reject(new Error(`Erro ao criar object URL: ${error instanceof Error ? error.message : 'Erro desconhecido'}`));
      }
    });
  }
}

export default new UploadService();
