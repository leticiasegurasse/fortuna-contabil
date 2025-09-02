# Componente NewsletterSignup

## Visão Geral

O componente `NewsletterSignup` é um componente reutilizável que permite aos usuários se inscreverem na newsletter da Fortuna Contábil. Ele foi criado para substituir as seções "Fique por dentro!" nas páginas do blog e post individual.

## Características

- **Funcionalidade Completa**: Inscrição na newsletter com validação de email
- **Estados Visuais**: Loading, sucesso e erro com feedback visual
- **Validação**: Validação de email em tempo real
- **Responsivo**: Design adaptável para diferentes tamanhos de tela
- **Animações**: Transições suaves com Framer Motion
- **Variantes**: Diferentes estilos visuais disponíveis

## Uso

### Importação

```tsx
import NewsletterSignup from '../components/NewsletterSignup';
```

### Implementação Básica

```tsx
<NewsletterSignup />
```

### Com Variante Personalizada

```tsx
<NewsletterSignup variant="primary" />
```

### Com Classe CSS Personalizada

```tsx
<NewsletterSignup className="my-custom-class" />
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `'default' \| 'accent' \| 'primary'` | `'default'` | Estilo visual do componente |
| `className` | `string` | `''` | Classes CSS adicionais |

## Variantes

### Default (Accent)
- Fundo: Gradiente azul (accent-500 → accent-600)
- Botão: Laranja (primary-500)
- Texto: Branco

### Primary
- Fundo: Gradiente laranja (primary-500 → primary-600)
- Botão: Azul (accent-500)
- Texto: Branco

## Funcionalidades

### Validação de Email
- Verifica se o campo não está vazio
- Valida formato de email com regex
- Feedback visual imediato

### Estados de Loading
- Botão desabilitado durante submissão
- Spinner de loading
- Texto "Processando..."

### Feedback de Sucesso/Erro
- Mensagens de sucesso em verde
- Mensagens de erro em vermelho
- Animações suaves
- Auto-limpeza do campo após sucesso

### Integração com API
- Usa o `newsletterService` para comunicação
- Tratamento de erros da API
- Fallback para mensagens de erro genéricas

## Implementação nas Páginas

### Blog.tsx
```tsx
{/* Newsletter */}
<NewsletterSignup variant="accent" />
```

### BlogPost.tsx
```tsx
{/* Newsletter */}
<NewsletterSignup variant="accent" />
```

## Estilos

### Cores
- **Accent**: Azul (accent-500, accent-600)
- **Primary**: Laranja (primary-500, primary-600)
- **Success**: Verde (green-500, green-600)
- **Error**: Vermelho (red-500, red-600)

### Animações
- **Entrada**: Fade in + slide up
- **Mensagens**: Fade in + slide up
- **Hover**: Scale up no botão
- **Transições**: 200-300ms para interações

### Responsividade
- **Mobile**: Layout em coluna única
- **Desktop**: Layout otimizado para sidebar
- **Breakpoints**: Usa classes Tailwind responsivas

## Dependências

- `react`: Hooks (useState)
- `framer-motion`: Animações
- `lucide-react`: Ícones
- `../services/newsletterService`: API de newsletter

## Exemplo de Uso Completo

```tsx
import NewsletterSignup from '../components/NewsletterSignup';

const MyPage = () => {
  return (
    <div>
      <h1>Minha Página</h1>
      
      {/* Newsletter com estilo padrão */}
      <NewsletterSignup />
      
      {/* Newsletter com estilo personalizado */}
      <NewsletterSignup 
        variant="primary" 
        className="mt-8"
      />
    </div>
  );
};
```

## Notas de Privacidade

O componente inclui uma nota de privacidade que informa aos usuários:
- Que eles concordam em receber emails da Fortuna Contábil
- Que podem cancelar a inscrição a qualquer momento
- Sobre o uso dos dados fornecidos

## Tratamento de Erros

- **Erro de Validação**: Email inválido ou vazio
- **Erro de API**: Problemas de conexão ou servidor
- **Erro de Rede**: Falhas de internet
- **Fallback**: Mensagens genéricas para erros desconhecidos

## Acessibilidade

- Labels apropriados para campos
- Estados disabled durante loading
- Feedback visual e textual
- Contraste adequado para leitores de tela
- Navegação por teclado
