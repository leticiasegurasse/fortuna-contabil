# Gerenciamento de Tags - Painel Admin

## Visão Geral

A funcionalidade de gerenciamento de tags permite aos administradores criar, editar, excluir e organizar as tags utilizadas para categorizar os posts do blog.

## Funcionalidades

### ✅ Listagem de Tags
- Visualização de todas as tags em formato de tabela
- Paginação automática (10 tags por página)
- Ordenação por número de posts (padrão), nome ou data de criação
- Busca por nome ou descrição com debounce de 500ms

### ✅ Criação de Tags
- Modal para criar novas tags
- Campos obrigatórios: Nome
- Campos opcionais: Descrição, Cor
- Validação automática de formato de cor (hexadecimal)
- Geração automática de slug único

### ✅ Edição de Tags
- Modal para editar tags existentes
- Atualização de todos os campos
- Validação de nome único
- Atualização automática do slug se o nome mudar

### ✅ Exclusão de Tags
- Exclusão individual com confirmação
- Exclusão em lote de tags selecionadas
- Verificação de posts associados antes da exclusão
- Proteção contra exclusão de tags com posts vinculados

### ✅ Seleção e Ações em Lote
- Checkbox para selecionar todas as tags da página
- Seleção individual de tags
- Botão de exclusão em lote para tags selecionadas
- Contador de tags selecionadas

## Estrutura da Tabela

| Coluna | Descrição |
|--------|-----------|
| Seleção | Checkbox para seleção individual |
| Tag | Nome da tag, slug e indicador visual de cor |
| Descrição | Descrição da tag (ou "Sem descrição") |
| Cor | Visualização da cor e código hexadecimal |
| Posts | Número de posts associados à tag |
| Criada em | Data de criação formatada (pt-BR) |
| Ações | Botões de editar e excluir |

## Campos da Tag

### Nome
- **Tipo**: Texto
- **Obrigatório**: Sim
- **Máximo**: 100 caracteres
- **Validação**: Nome único no sistema

### Slug
- **Tipo**: Texto
- **Obrigatório**: Sim (gerado automaticamente)
- **Formato**: Nome normalizado (sem acentos, espaços viram hífens)
- **Validação**: Slug único no sistema

### Descrição
- **Tipo**: Texto longo
- **Obrigatório**: Não
- **Uso**: Descrição opcional para SEO e organização

### Cor
- **Tipo**: Hexadecimal
- **Obrigatório**: Não
- **Padrão**: #3B82F6 (azul)
- **Formato**: #RRGGBB
- **Validação**: Formato hexadecimal válido

### Contador de Posts
- **Tipo**: Número inteiro
- **Obrigatório**: Sim
- **Padrão**: 0
- **Atualização**: Automática ao associar/desassociar posts

## Integração com o Backend

### Endpoints Utilizados
- `GET /api/tags` - Listar tags com paginação e busca
- `POST /api/tags` - Criar nova tag
- `PUT /api/tags/:id` - Atualizar tag existente
- `DELETE /api/tags/:id` - Excluir tag

### Parâmetros de Busca
- `page`: Número da página (padrão: 1)
- `limit`: Itens por página (padrão: 10)
- `search`: Termo de busca (opcional)
- `sort`: Ordenação (postsCount, name, createdAt)

### Resposta da API
```typescript
{
  success: boolean;
  data: Tag[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  }
}
```

## Segurança

### Autenticação
- Todas as operações de criação, edição e exclusão requerem token JWT
- Rotas protegidas pelo middleware `AdminProtectedRoute`
- Verificação de autenticação em cada operação

### Validações
- Nome único no sistema
- Formato de cor válido
- Verificação de posts associados antes da exclusão
- Sanitização de entrada de dados

## Estados da Interface

### Loading
- Indicador de carregamento ao buscar tags
- Indicador de carregamento ao salvar/editar
- Indicador de carregamento ao excluir

### Error
- Mensagens de erro específicas da API
- Validações de formulário
- Confirmações para ações destrutivas

### Success
- Feedback visual de operações bem-sucedidas
- Atualização automática da lista após operações
- Fechamento automático de modais

## Responsividade

### Desktop
- Sidebar fixa com navegação completa
- Tabela com todas as colunas visíveis
- Modais centralizados na tela

### Mobile
- Menu hambúrguer para navegação
- Tabela com scroll horizontal
- Modais responsivos com padding adequado

## Dependências

### Frontend
- React 18+
- TypeScript
- Tailwind CSS
- Framer Motion (animações)
- Lucide React (ícones)
- React Router DOM

### Backend
- Node.js + Express
- Sequelize ORM
- PostgreSQL
- JWT para autenticação

## Como Usar

### 1. Acessar o Painel Admin
- Faça login em `/admin/login`
- Navegue para "Blog" → "Tags" no menu lateral

### 2. Criar Nova Tag
- Clique em "Nova Tag"
- Preencha o nome (obrigatório)
- Adicione descrição (opcional)
- Escolha uma cor (opcional)
- Clique em "Criar"

### 3. Editar Tag Existente
- Clique no ícone de editar na linha da tag
- Modifique os campos desejados
- Clique em "Atualizar"

### 4. Excluir Tag
- Clique no ícone de excluir na linha da tag
- Confirme a exclusão
- **Nota**: Tags com posts associados não podem ser excluídas

### 5. Buscar Tags
- Use o campo de busca para filtrar por nome ou descrição
- A busca é automática após 500ms de inatividade

### 6. Exclusão em Lote
- Selecione as tags desejadas usando os checkboxes
- Clique em "Excluir (X)" para excluir todas as selecionadas

## Tratamento de Erros

### Erros Comuns
- **Nome duplicado**: "Já existe uma tag com este nome"
- **Tag não encontrada**: "Tag não encontrada"
- **Posts associados**: "Não é possível excluir a tag. Existem X post(s) associado(s)."
- **Erro de validação**: Mensagens específicas para cada campo

### Recuperação
- Mensagens de erro são exibidas no topo da tela
- Botão para fechar mensagens de erro
- Formulários mantêm dados em caso de erro
- Validação em tempo real nos campos

## Performance

### Otimizações
- Debounce na busca (500ms)
- Paginação do lado do servidor
- Lazy loading de dados
- Cache de autenticação
- Animações otimizadas com Framer Motion

### Monitoramento
- Logs de erro no console
- Indicadores de loading visuais
- Feedback imediato para ações do usuário

## Manutenção

### Atualizações
- Verificar compatibilidade com novas versões da API
- Manter dependências atualizadas
- Testar funcionalidades após mudanças no backend

### Debug
- Console do navegador para logs de erro
- Network tab para verificar requisições
- Estado dos componentes no React DevTools

## Roadmap Futuro

### Funcionalidades Planejadas
- [ ] Drag & drop para reordenar tags
- [ ] Importação/exportação em lote
- [ ] Estatísticas de uso das tags
- [ ] Histórico de alterações
- [ ] Templates de cores predefinidas
- [ ] Integração com sistema de SEO

### Melhorias Técnicas
- [ ] Cache local para tags frequentes
- [ ] Otimização de re-renders
- [ ] Testes automatizados
- [ ] Métricas de performance
- [ ] Acessibilidade aprimorada
