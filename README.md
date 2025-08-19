# Fortuna Contábil - Site Institucional

Site institucional moderno e responsivo para a Fortuna Contábil, especializada em contabilidade para MEI e pequenas empresas.

## 🚀 Sobre o Projeto

O site da Fortuna Contábil foi desenvolvido com foco em:
- **Design moderno e profissional**
- **Atendimento humanizado**
- **Especialização em MEI e pequenas empresas**
- **Atendimento 100% online**
- **Transparência total**

## 🛠️ Tecnologias Utilizadas

- **React 19.1.0** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de estilização
- **React Router DOM** - Roteamento
- **Lucide React** - Ícones
- **Framer Motion** - Animações

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.tsx      # Cabeçalho com navegação
│   └── Footer.tsx      # Rodapé
├── pages/              # Páginas da aplicação
│   ├── Home.tsx        # Página inicial
│   ├── About.tsx       # Sobre a empresa
│   ├── Services.tsx    # Serviços oferecidos
│   ├── Blog.tsx        # Blog/Notícias
│   ├── Contact.tsx     # Página de contato
│   ├── ClientArea.tsx  # Área do cliente
│   └── NotFound.tsx    # Página 404
├── config/             # Configurações
│   ├── api.ts          # Configuração da API
│   └── routes.ts       # Definição das rotas
├── types/              # Tipos TypeScript
├── hooks/              # Custom hooks
├── layouts/            # Layouts da aplicação
├── lib/                # Bibliotecas configuradas
├── styles/             # Estilos globais
└── assets/             # Recursos estáticos
```

## 🎨 Design System

### Cores Principais
- **Azul Primário**: #238cd2 (Confiança e profissionalismo)
- **Laranja Secundário**: #FFAF3C (Energia e criatividade)
- **Azul Claro Accent**: #96E6F0 (Modernidade)

### Tipografia
- **Fonte Principal**: Manrope (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700, 800

## 📱 Páginas Implementadas

### 1. **Home** (`/`)
- Hero section com call-to-action
- Seção de estatísticas
- Apresentação dos serviços
- Sobre a empresa
- Depoimentos de clientes
- Call-to-action final

### 2. **Sobre** (`/sobre`)
- Missão, visão e valores
- História da empresa
- Timeline de crescimento
- Diferenciais
- Objetivos futuros

### 3. **Serviços** (`/servicos`)
- Lista completa de serviços
- Preços e características
- FAQ sobre serviços
- Call-to-action para contato

### 4. **Blog** (`/blog`)
- Artigos sobre contabilidade
- Sistema de categorias
- Newsletter signup
- Sidebar com informações úteis

### 5. **Contato** (`/contato`)
- Formulário de contato
- Informações da empresa
- Botões de WhatsApp e telefone
- Mapa de localização

### 6. **Área do Cliente** (`/area-cliente`)
- Sistema de login
- Dashboard do cliente
- Documentos disponíveis
- Próximos vencimentos
- Ações rápidas

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre na pasta
cd fortuna-contabil

# Instale as dependências
npm install
```

### Desenvolvimento
```bash
# Inicie o servidor de desenvolvimento
npm run dev

# O site estará disponível em http://localhost:5173
```

### Build para Produção
```bash
# Gere o build de produção
npm run build

# Visualize o build
npm run preview
```

## 📦 Deploy

O projeto está configurado para deploy com Docker:

```bash
# Build da imagem Docker
docker build -t fortuna-contabil .

# Executar o container
docker run -p 80:80 fortuna-contabil
```

## 🔧 Configurações

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=https://api.fortunacontabil.com.br
```

### Personalização
- **Cores**: Edite `tailwind.config.js`
- **Fontes**: Atualize `src/styles/index.css`
- **SEO**: Modifique `index.html`

## 📊 SEO e Performance

### Meta Tags Implementadas
- Title e description otimizados
- Open Graph tags
- Twitter Card tags
- Keywords relevantes
- Geo-localização

### Performance
- Lazy loading de imagens
- Otimização de fontes
- Bundle splitting
- Compressão gzip

## 🎯 Funcionalidades Principais

### ✅ Implementadas
- [x] Design responsivo
- [x] Navegação completa
- [x] Formulário de contato
- [x] Área do cliente
- [x] Blog funcional
- [x] SEO otimizado
- [x] Performance otimizada

### 🔄 Futuras Implementações
- [ ] Sistema de autenticação real
- [ ] Integração com API
- [ ] Sistema de blog com CMS
- [ ] Chat online
- [ ] Área de membros completa

## 📞 Contato

**Fortuna Contábil**
- **Telefone**: (31) 99999-9999
- **E-mail**: contato@fortunacontabil.com.br
- **Localização**: Belo Horizonte - MG
- **Atendimento**: Todo o Brasil

## 📄 Licença

Este projeto foi desenvolvido para a Fortuna Contábil. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para o seu negócio**
