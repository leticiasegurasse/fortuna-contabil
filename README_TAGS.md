# 🏷️ Sistema de Tags - Frontend

## 📋 **Visão Geral**

O sistema de tags permite associar múltiplas tags a um post, facilitando a organização, categorização e SEO do conteúdo do blog.

## 🚀 **Funcionalidades Implementadas**

### **1. Seleção de Múltiplas Tags**
- ✅ **Checkbox para cada tag**: Interface intuitiva com checkboxes
- ✅ **Visualização de cores**: Cada tag exibe sua cor personalizada
- ✅ **Scroll automático**: Lista com scroll quando há muitas tags
- ✅ **Estado persistente**: Tags selecionadas são mantidas durante a edição

### **2. Serviço de Tags (`tagService.ts`)**
- ✅ **CRUD completo**: Criar, ler, atualizar, excluir tags
- ✅ **Tags populares**: Endpoint para buscar tags mais utilizadas
- ✅ **Associação de posts**: Vincular/desvincular tags de posts
- ✅ **Busca por slug**: Encontrar tags por URL amigável

### **3. Interface de Usuário**
- ✅ **Loading states**: Indicadores de carregamento para tags
- ✅ **Feedback visual**: Contador de tags selecionadas
- ✅ **Responsivo**: Funciona em dispositivos móveis e desktop
- ✅ **Acessibilidade**: Labels e controles adequados

## 🎯 **Como Usar**

### **1. Na Tela de Novo Post**
```typescript
// As tags são carregadas automaticamente
const [tags, setTags] = useState<Tag[]>([]);
const [formData, setFormData] = useState<PostFormData>({
  // ... outros campos
  tagIds: [] // Array de IDs das tags selecionadas
});

// Função para lidar com seleção/desseleção
const handleTagChange = (tagId: number, checked: boolean) => {
  setFormData(prev => ({
    ...prev,
    tagIds: checked 
      ? [...prev.tagIds, tagId]
      : prev.tagIds.filter(id => id !== tagId)
  }));
};
```

### **2. Seleção de Tags**
```tsx
{tags.map((tag) => (
  <label key={tag.id} className="flex items-center space-x-2 cursor-pointer">
    <input
      type="checkbox"
      checked={formData.tagIds.includes(tag.id)}
      onChange={(e) => handleTagChange(tag.id, e.target.checked)}
      className="h-4 w-4 text-primary-600"
    />
    <span className="flex items-center space-x-2">
      <span 
        className="w-3 h-3 rounded-full" 
        style={{ backgroundColor: tag.color }}
      />
      {tag.name}
    </span>
  </label>
))}
```

### **3. Envio do Formulário**
```typescript
const postData = {
  // ... outros campos
  tagIds: formData.tagIds // Array enviado para o backend
};

// O backend receberá o array de IDs das tags
await postService.createPost(postData, token);
```

## 🔧 **Configuração**

### **1. Endpoints da API**
```typescript
// Configurado em config/api.ts
TAGS: {
  LIST: '/api/tags',
  POPULAR: '/api/tags/popular',
  GET: (id: number) => `/api/tags/${id}`,
  CREATE: '/api/tags',
  UPDATE: (id: number) => `/api/tags/${id}`,
  DELETE: (id: number) => `/api/tags/${id}`,
  ASSOCIATE_POST: (tagId: number, postId: number) => `/api/tags/${tagId}/posts/${postId}`,
  DISASSOCIATE_POST: (tagId: number, postId: number) => `/api/tags/${tagId}/posts/${postId}`,
}
```

### **2. Tipos TypeScript**
```typescript
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

export interface PostFormData {
  // ... outros campos
  tagIds: number[]; // Array de IDs das tags
}
```

## 🎨 **Interface Visual**

### **1. Seção de Tags**
- **Localização**: Sidebar, após Status
- **Layout**: Lista com scroll, máximo 48 unidades de altura
- **Estilo**: Checkboxes com cores das tags
- **Feedback**: Contador de tags selecionadas

### **2. Estados Visuais**
- **Loading**: Spinner com texto "Carregando tags..."
- **Vazio**: Mensagem "Nenhuma tag disponível"
- **Selecionadas**: Checkbox marcado e contador atualizado
- **Hover**: Background neutro ao passar o mouse

### **3. Cores das Tags**
- **Indicador visual**: Círculo colorido ao lado do nome
- **Personalização**: Cada tag pode ter sua cor única
- **Acessibilidade**: Cores complementam o texto

## 📱 **Responsividade**

### **1. Mobile**
- **Scroll vertical**: Lista de tags com scroll tátil
- **Touch targets**: Checkboxes adequados para toque
- **Espaçamento**: Padding e margins otimizados

### **2. Desktop**
- **Hover effects**: Feedback visual ao passar o mouse
- **Scroll mouse**: Scroll com roda do mouse
- **Layout otimizado**: Melhor aproveitamento do espaço

## 🔒 **Segurança e Validação**

### **1. Validação de Dados**
- **IDs válidos**: Apenas números positivos
- **Array de tags**: Sempre um array, mesmo vazio
- **Backend validation**: Validação adicional no servidor

### **2. Autenticação**
- **Token requerido**: Operações de CRUD precisam de autenticação
- **Permissões**: Verificação de role do usuário
- **Segurança**: Tokens JWT para operações protegidas

## 🚀 **Próximas Melhorias**

### **1. Funcionalidades Futuras**
- **Criação rápida de tags**: Adicionar tags durante a edição
- **Sugestões inteligentes**: Tags baseadas no conteúdo
- **Filtros avançados**: Buscar tags por nome ou categoria
- **Drag & Drop**: Reordenar tags por relevância

### **2. Performance**
- **Lazy loading**: Carregar tags sob demanda
- **Cache local**: Armazenar tags em localStorage
- **Debounce**: Otimizar busca de tags
- **Virtualização**: Para listas muito grandes

### **3. UX/UI**
- **Tags sugeridas**: Baseadas no título/conteúdo
- **Preview de tags**: Como ficará na listagem
- **Histórico**: Tags mais usadas pelo usuário
- **Atalhos**: Teclas de atalho para tags comuns

## 📋 **Exemplo de Uso Completo**

```typescript
const NewBlogPost = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    categoryId: '',
    status: 'draft',
    tagIds: [] // Inicialmente vazio
  });

  // Carregar tags ao montar componente
  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const tags = await tagService.getTags();
      setTags(tags);
    } catch (error) {
      console.error('Erro ao carregar tags:', error);
    }
  };

  const handleTagChange = (tagId: number, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      tagIds: checked 
        ? [...prev.tagIds, tagId]
        : prev.tagIds.filter(id => id !== tagId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = await authService.getValidToken();
      if (!token) return;

      // Criar post com tags
      await postService.createPost(formData, token);
      
      // Sucesso - redirecionar
      navigate('/admin/blog');
    } catch (error) {
      setError('Erro ao criar post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... outros campos ... */}
      
      {/* Seção de Tags */}
      <div className="tags-section">
        <label>Tags</label>
        <div className="tags-list">
          {tags.map((tag) => (
            <label key={tag.id}>
              <input
                type="checkbox"
                checked={formData.tagIds.includes(tag.id)}
                onChange={(e) => handleTagChange(tag.id, e.target.checked)}
              />
              <span style={{ color: tag.color }}>{tag.name}</span>
            </label>
          ))}
        </div>
        <p>Tags selecionadas: {formData.tagIds.length}</p>
      </div>
      
      <button type="submit">Criar Post</button>
    </form>
  );
};
```

## ✨ **Conclusão**

O sistema de tags está completamente funcional e integrado ao fluxo de criação de posts. Ele oferece:

- **Interface intuitiva** para seleção de múltiplas tags
- **Serviço robusto** para gerenciamento de tags
- **Validação adequada** de dados
- **Design responsivo** para todos os dispositivos
- **Integração perfeita** com o sistema existente

**Sistema de tags implementado com sucesso!** 🎯🏷️
