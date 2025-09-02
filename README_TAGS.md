# Gerenciamento de Tags - Painel Admin

## Visão Geral

O sistema de gerenciamento de tags permite aos administradores criar, editar e excluir tags para organizar e categorizar os posts do blog. As tags são elementos importantes para SEO e navegação do usuário.

## Funcionalidades

### 1. Listagem de Tags
- Visualização em grid responsivo
- Busca por nome ou descrição
- Exibição de estatísticas (número de posts, data de criação)
- Indicador visual de cor personalizada

### 2. Criação de Tags
- Formulário com validação
- Campo obrigatório: Nome (máximo 100 caracteres)
- Campo opcional: Descrição
- Seletor de cor personalizada (padrão: #3B82F6)
- Geração automática de slug único

### 3. Edição de Tags
- Modificação de todos os campos
- Validação de nome único
- Atualização automática do slug se necessário

### 4. Exclusão de Tags
- Confirmação antes da exclusão
- Verificação de posts associados
- Bloqueio de exclusão se houver posts vinculados

## Estrutura da API

### Endpoints Utilizados
- `GET /api/tags` - Listar todas as tags
- `POST /api/tags` - Criar nova tag
- `PUT /api/tags/:id` - Atualizar tag existente
- `DELETE /api/tags/:id` - Excluir tag

### Modelo de Dados
```typescript
interface Tag {
  id: number;
  name: string;           // Nome da tag (único)
  slug: string;           // Slug para URL (único, gerado automaticamente)
  description: string;    // Descrição opcional
  color: string;          // Cor em formato hexadecimal
  postsCount: number;     // Contador automático de posts
  createdAt: string;      // Data de criação
  updatedAt: string;      // Data da última atualização
}
```

## Validações

### Backend
- Nome obrigatório e único
- Nome com máximo de 100 caracteres
- Cor em formato hexadecimal válido (#FFFFFF)
- Slug único e gerado automaticamente

### Frontend
- Validação de campos obrigatórios
- Feedback visual de erros
- Confirmação antes de ações destrutivas

## Integração com Posts

### Associação Automática
- Contador de posts atualizado automaticamente
- Verificação de dependências antes da exclusão
- Relacionamento via tabela intermediária (PostTag)

### Uso no Blog
- Tags exibidas nos posts
- Filtros por tag
- Navegação entre posts relacionados

## Navegação

### Acesso
- Dashboard Admin → Seção "Gerenciamento do Blog" → Tags
- Categorias do Blog → Link "Gerenciar Tags"
- URL direta: `/admin/blog/tags`

### Permissões
- Requer autenticação de administrador
- Token JWT obrigatório para todas as operações

## Tecnologias Utilizadas

### Frontend
- React 18 com TypeScript
- Framer Motion para animações
- Tailwind CSS para estilização
- Lucide React para ícones
- React Router para navegação

### Backend
- Node.js com Express
- Sequelize ORM
- PostgreSQL
- JWT para autenticação

## Melhorias Futuras

### Funcionalidades Planejadas
- [ ] Paginação para grandes volumes de tags
- [ ] Ordenação por diferentes critérios
- [ ] Bulk operations (seleção múltipla)
- [ ] Histórico de alterações
- [ ] Importação/exportação em lote
- [ ] Templates de cores predefinidas

### Otimizações
- [ ] Cache de tags populares
- [ ] Lazy loading para melhor performance
- [ ] Filtros avançados
- [ ] Estatísticas de uso das tags

## Troubleshooting

### Problemas Comuns

1. **Tag não pode ser excluída**
   - Verificar se há posts associados
   - Remover associações antes da exclusão

2. **Erro de validação de cor**
   - Usar formato hexadecimal válido (#RRGGBB)
   - Verificar se não há espaços extras

3. **Slug duplicado**
   - O sistema gera automaticamente slugs únicos
   - Se persistir, verificar integridade do banco

### Logs e Debug
- Console do navegador para erros frontend
- Logs do servidor para erros backend
- Verificar token de autenticação
- Validar formato dos dados enviados

## Contribuição

Para contribuir com melhorias no sistema de tags:

1. Seguir padrões de código existentes
2. Adicionar testes para novas funcionalidades
3. Documentar mudanças na API
4. Atualizar este README conforme necessário
5. Testar em diferentes navegadores e dispositivos
