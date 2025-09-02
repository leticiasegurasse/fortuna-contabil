// Tipos para o sistema de blog

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
  postsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
  postsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

// Interface para blocos de conteúdo
export interface ContentBlock {
  id: string;
  type: 'title' | 'paragraph' | 'image' | 'subtitle' | 'list' | 'quote';
  content: string;
  order: number;
  metadata?: {
    level?: number; // Para títulos (h1, h2, h3, etc.)
    alignment?: 'left' | 'center' | 'right';
    imageAlt?: string; // Para imagens
    imageCaption?: string; // Para imagens
    listType?: 'ordered' | 'unordered'; // Para listas
    quoteAuthor?: string; // Para citações
    [key: string]: any; // Para outros metadados
  };
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  contentBlocks: ContentBlock[]; // Campo obrigatório para conteúdo estruturado
  status: 'draft' | 'published' | 'archived';
  image?: string;
  views: number;
  authorId: number;
  categoryId: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  author?: User;
  category?: Category;
  tags?: Tag[];
}

export interface PostFormData {
  title: string;
  excerpt: string;
  contentBlocks: ContentBlock[]; // Campo obrigatório para conteúdo estruturado
  image: string;
  categoryId: string;
  status: 'draft' | 'published' | 'archived';
  tagIds: number[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}
