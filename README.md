# RN Informática — Site Institucional

Site institucional da **RN Informática**, empresa de suporte técnico e desenvolvimento web. Desenvolvido com foco em performance, design moderno e área administrativa protegida.

---

## 🚀 Tecnologias Utilizadas

### Core
| Tecnologia | Descrição |
|---|---|
| [React 18](https://react.dev/) | Biblioteca principal para construção da interface |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática para maior segurança no código |
| [Vite](https://vitejs.dev/) | Bundler e servidor de desenvolvimento ultrarrápido |

### Estilização
| Tecnologia | Descrição |
|---|---|
| [Tailwind CSS](https://tailwindcss.com/) | Framework CSS utilitário |
| [shadcn/ui](https://ui.shadcn.com/) | Componentes acessíveis baseados em Radix UI |
| [Radix UI](https://www.radix-ui.com/) | Primitivos de UI acessíveis e sem estilo |
| [Framer Motion](https://www.framer.com/motion/) | Animações declarativas para React |
| [Lucide React](https://lucide.dev/) | Biblioteca de ícones SVG |

### Roteamento e Estado
| Tecnologia | Descrição |
|---|---|
| [React Router DOM](https://reactrouter.com/) | Roteamento client-side |
| [TanStack Query](https://tanstack.com/query) | Gerenciamento de estado e cache de dados assíncronos |
| [React Hook Form](https://react-hook-form.com/) | Gerenciamento de formulários performático |

### Backend e Serviços
| Tecnologia | Descrição |
|---|---|
| [Firebase / Firestore](https://firebase.google.com/) | Banco de dados NoSQL para armazenamento dos contatos |
| [EmailJS](https://www.emailjs.com/) | Envio de e-mails diretamente do frontend |

### Deploy
| Tecnologia | Descrição |
|---|---|
| [Vercel](https://vercel.com/) | Hospedagem e CDN global |

---

## 📁 Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis (Header, Footer, Hero, etc.)
│   └── ui/           # Componentes shadcn/ui
├── contexts/         # Context API (autenticação da área admin)
├── hooks/            # Hooks customizados
├── lib/              # Configuração do Firebase e utilitários
├── pages/            # Páginas da aplicação
│   ├── Index.tsx         # Página principal
│   ├── Admin.tsx         # Área administrativa (protegida)
│   ├── AdminLogin.tsx    # Login da área administrativa
│   ├── AdminDashboard.tsx# Dashboard com contatos recebidos
│   ├── PrivacyPolicy.tsx # Política de privacidade
│   └── NotFound.tsx      # Página 404
└── main.tsx          # Ponto de entrada da aplicação
```

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) v18 ou superior
- [npm](https://www.npmjs.com/)

### 1. Clonar o repositório
```bash
git clone https://github.com/rodrigo749/rn-informatica.git
cd rn-informatica
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```bash
cp .env.example .env
```

Preencha as variáveis no `.env`:

```env
# Firebase
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_projeto
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id

# EmailJS
VITE_EMAILJS_SERVICE_ID=seu_service_id
VITE_EMAILJS_TEMPLATE_ID=seu_template_id
VITE_EMAILJS_PUBLIC_KEY=sua_public_key

# WhatsApp
VITE_WHATSAPP_NUMBER=5500000000000

# Área Administrativa
VITE_ADMIN_USER=admin
VITE_ADMIN_PASS=sua_senha
```

### 4. Rodar em modo de desenvolvimento
```bash
npm run dev
```

Acesse em: [http://localhost:8080](http://localhost:8080)

### 5. Gerar build de produção
```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

### 6. Visualizar build de produção localmente
```bash
npm run preview
```

---

## 🔐 Área Administrativa

A área administrativa está disponível em `/admin` e é protegida por usuário e senha configurados via variáveis de ambiente (`VITE_ADMIN_USER` e `VITE_ADMIN_PASS`). Após o login, é possível visualizar, editar e excluir os contatos recebidos através do formulário do site.

---

## 🧪 Testes

```bash
npm run test
```
