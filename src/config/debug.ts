// Configurações de debug e teste
export const DEBUG_CONFIG = {
  // Habilitar logs detalhados
  ENABLE_LOGS: import.meta.env.DEV,
  
  // Simular dados para teste (quando backend não estiver disponível)
  MOCK_DATA: false,
  
  // Timeout das requisições (em ms)
  REQUEST_TIMEOUT: 10000,
  
  // Retry automático em caso de falha
  AUTO_RETRY: true,
  MAX_RETRIES: 3,
  
  // Dados mock para categorias (para teste)
  MOCK_CATEGORIES: [
    {
      id: 1,
      name: 'Abertura de Empresas',
      slug: 'abertura-empresas',
      description: 'Artigos sobre abertura e formalização de empresas',
      color: '#3B82F6',
      postsCount: 5,
      createdAt: '2024-01-15T10:00:00.000Z',
      updatedAt: '2024-01-15T10:00:00.000Z'
    },
    {
      id: 2,
      name: 'Imposto de Renda',
      slug: 'imposto-renda',
      description: 'Artigos sobre declaração de IR',
      color: '#EF4444',
      postsCount: 3,
      createdAt: '2024-01-15T10:00:00.000Z',
      updatedAt: '2024-01-15T10:00:00.000Z'
    },
    {
      id: 3,
      name: 'Consultoria',
      slug: 'consultoria',
      description: 'Artigos sobre consultoria contábil',
      color: '#10B981',
      postsCount: 2,
      createdAt: '2024-01-15T10:00:00.000Z',
      updatedAt: '2024-01-15T10:00:00.000Z'
    }
  ]
};
