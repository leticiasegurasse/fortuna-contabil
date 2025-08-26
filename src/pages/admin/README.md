# Painel Administrativo - Fortuna Contábil

## Estrutura do Projeto

O painel administrativo está localizado em `src/pages/admin/` e inclui:

### Páginas
- `Login.tsx` - Tela de login do painel
- `Dashboard.tsx` - Dashboard principal com estatísticas

### Componentes
- `AdminProtectedRoute.tsx` - Componente para proteger rotas que requerem autenticação

### Hooks
- `useAdminAuth.ts` - Hook personalizado para gerenciar autenticação

## Rotas

- `/admin/login` - Tela de login
- `/admin/dashboard` - Dashboard principal (protegido)

## Funcionalidades

### Autenticação
- Login com usuário e senha
- Verificação automática de token
- Redirecionamento automático para login se não autenticado
- Logout com limpeza de dados

### Dashboard
- Estatísticas em tempo real
- Ações rápidas
- Interface responsiva

## Como Usar

1. Acesse `/admin/login`
2. Faça login com suas credenciais
3. Será redirecionado automaticamente para o dashboard
4. Use o botão "Sair" para fazer logout

## Configuração da API

O painel se conecta ao backend através das seguintes rotas:

- `POST /api/auth/login` - Login
- `GET /api/auth/verify-token` - Verificar token
- `POST /api/auth/logout` - Logout

## Próximos Passos

- [ ] Adicionar mais páginas (Clientes, Documentos, etc.)
- [ ] Implementar funcionalidades CRUD
- [ ] Adicionar relatórios e gráficos
- [ ] Implementar notificações
- [ ] Adicionar configurações do sistema
