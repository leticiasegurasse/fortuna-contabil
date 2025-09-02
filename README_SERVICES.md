# 🚀 Serviços da API - Frontend

## 📁 **Estrutura de Arquivos**

```
front/src/services/
├── index.ts              # Exporta todos os serviços
├── api.ts                # Serviço base para requisições HTTP
├── authService.ts        # Gerenciamento de autenticação
├── categoryService.ts    # Gerenciamento de categorias
└── postService.ts        # Gerenciamento de posts
```

## 🔧 **Configuração**

### **1. Variáveis de Ambiente**
Crie um arquivo `.env` na raiz do frontend:

```env
# URL da API (ajuste conforme seu ambiente)
VITE_API_URL=http://localhost:3001
```

### **2. Configuração da API**
O arquivo `config/api.ts` centraliza todas as configurações:

```typescript
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  ENDPOINTS: { /* ... */ }
};
```

## 🎯 **Como Usar os Serviços**

### **1. Importar Serviços**
```typescript
import { 
  categoryService, 
  postService, 
  authService 
} from '../services';
```

### **2. Serviço de Categorias**
```typescript
// Listar todas as categorias
const categories = await categoryService.getCategories();

// Buscar categoria por ID
const category = await categoryService.getCategoryById(1);

// Criar categoria (requer token)
const newCategory = await categoryService.createCategory({
  name: 'Nova Categoria',
  description: 'Descrição da categoria',
  color: '#3B82F6'
}, token);
```

### **3. Serviço de Posts**
```typescript
// Listar posts com filtros
const posts = await postService.getPosts(1, 10, 'published', 1, 'busca');

// Criar novo post (requer token)
const newPost = await postService.createPost({
  title: 'Título do Post',
  excerpt: 'Resumo do post',
  content: 'Conteúdo completo',
  image: 'https://exemplo.com/imagem.jpg',
  categoryId: '1',
  status: 'draft'
}, token);
```

### **4. Serviço de Autenticação**
```typescript
// Fazer login
const auth = await authService.login({
  email: 'admin@fortunacontabil.com',
  password: 'admin123'
});

// Verificar se está autenticado
if (authService.isAuthenticated()) {
  // Usuário logado
}

// Obter token válido
const token = await authService.getValidToken();
```

## 🛠️ **Funcionalidades dos Serviços**

### **1. ApiService (Base)**
- ✅ **Métodos HTTP**: GET, POST, PUT, DELETE, PATCH
- ✅ **Headers automáticos**: Content-Type, Authorization
- ✅ **Tratamento de erros**: Respostas HTTP não-ok
- ✅ **Logs de debug**: Console para desenvolvimento

### **2. CategoryService**
- ✅ **CRUD completo**: Criar, ler, atualizar, excluir
- ✅ **Paginação**: Suporte a página e limite
- ✅ **Busca**: Filtro por nome ou descrição
- ✅ **Fallback mock**: Dados de teste em desenvolvimento

### **3. PostService**
- ✅ **CRUD completo**: Todas as operações de posts
- ✅ **Filtros avançados**: Status, categoria, busca
- ✅ **Paginação**: Controle de página e limite
- ✅ **Slugs**: Busca por slug amigável

### **4. AuthService**
- ✅ **Login/Logout**: Gerenciamento de sessão
- ✅ **Token JWT**: Armazenamento seguro
- ✅ **Refresh automático**: Renovação de tokens
- ✅ **Validação**: Verificação de expiração

## 🔒 **Segurança e Autenticação**

### **1. Tokens JWT**
```typescript
// Token é incluído automaticamente
const token = await authService.getValidToken();
const posts = await postService.getPosts(1, 10, undefined, undefined, undefined, token);
```

### **2. Validação de Sessão**
```typescript
// Verificar antes de operações protegidas
if (!authService.isAuthenticated()) {
  // Redirecionar para login
  navigate('/admin/login');
  return;
}
```

### **3. Refresh Automático**
```typescript
// O serviço renova tokens automaticamente
const validToken = await authService.getValidToken();
// Se expirado, renova automaticamente
```

## 🐛 **Debug e Teste**

### **1. Logs Detalhados**
```typescript
// Habilitar em desenvolvimento
if (DEBUG_CONFIG.ENABLE_LOGS) {
  console.log('Requisição para:', endpoint);
}
```

### **2. Dados Mock**
```typescript
// Fallback quando backend não está disponível
if (DEBUG_CONFIG.MOCK_DATA) {
  return DEBUG_CONFIG.MOCK_CATEGORIES;
}
```

### **3. Timeout e Retry**
```typescript
// Configurações de rede
REQUEST_TIMEOUT: 10000,
AUTO_RETRY: true,
MAX_RETRIES: 3
```

## 📱 **Exemplo de Uso na Tela de Novo Post**

```typescript
const NewBlogPost = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Carregar categorias ao montar componente
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categories = await categoryService.getCategories();
      setCategories(categories);
    } catch (error) {
      setError('Erro ao carregar categorias');
    }
  };

  const handleSubmit = async (formData: PostFormData) => {
    try {
      const token = await authService.getValidToken();
      if (!token) {
        setError('Usuário não autenticado');
        return;
      }

      await postService.createPost(formData, token);
      navigate('/admin/blog');
    } catch (error) {
      setError('Erro ao criar post');
    }
  };
};
```

## 🚀 **Vantagens da Arquitetura**

### **1. Separação de Responsabilidades**
- **Serviços**: Lógica de negócio e API
- **Componentes**: Interface e estado
- **Configuração**: Centralizada e reutilizável

### **2. Reutilização**
- Serviços podem ser usados em qualquer componente
- Lógica centralizada e testável
- Fácil manutenção e atualização

### **3. Tratamento de Erros**
- Erros capturados e tratados consistentemente
- Fallbacks para desenvolvimento
- Logs detalhados para debug

### **4. TypeScript**
- Tipos seguros e autocompletar
- Interfaces bem definidas
- Detecção de erros em tempo de compilação

## 🔧 **Troubleshooting**

### **Erro: "Erro ao carregar categorias"**
1. **Verificar backend**: Está rodando na porta 3001?
2. **Verificar URL**: VITE_API_URL está configurado?
3. **Verificar CORS**: Backend permite requisições do frontend?
4. **Verificar logs**: Console mostra detalhes do erro?

### **Erro: "Usuário não autenticado"**
1. **Verificar login**: Usuário fez login?
2. **Verificar token**: Token está no localStorage?
3. **Verificar expiração**: Token não expirou?

### **Erro: "Network Error"**
1. **Verificar conexão**: Internet funcionando?
2. **Verificar backend**: Servidor está rodando?
3. **Verificar porta**: Porta 3001 está livre?

## 📋 **Próximos Passos**

### **1. Implementar Cache**
- Cache de categorias e posts
- Redux ou Zustand para estado global
- Persistência local

### **2. Melhorar Tratamento de Erros**
- Retry automático para falhas de rede
- Fallbacks mais robustos
- Notificações de erro mais amigáveis

### **3. Adicionar Testes**
- Testes unitários para serviços
- Testes de integração
- Mocks para desenvolvimento

**Sistema de serviços pronto e funcional!** 🎯✨
