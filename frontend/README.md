# Hotel das Maravilhas - Frontend

Interface moderna e responsiva para o sistema de gerenciamento do Hotel das Maravilhas.

## 🚀 Tecnologias

- **React 18** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **Vite** - Build tool moderna
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento
- **React Hook Form** - Gerenciamento de formulários
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones

## 📋 Pré-requisitos

- Node.js 16+
- Backend API rodando
- Navegador moderno

## ⚙️ Instalação

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar variáveis de ambiente:**
```bash
cp env.example .env
```

3. **Editar arquivo `.env` com a URL da API:**
```env
VITE_API_URL=http://localhost:3000/api
```

## 🏃‍♂️ Execução

**Desenvolvimento:**
```bash
npm run dev
```

**Build para produção:**
```bash
npm run build
```

**Preview da build:**
```bash
npm run preview
```

## 🎨 Funcionalidades

### **🔐 Autenticação**
- ✅ Página de login responsiva
- ✅ Página de cadastro completa
- ✅ Validação de formulários
- ✅ Gerenciamento de estado global
- ✅ Proteção de rotas

### **👤 Interface do Usuário**
- ✅ Dashboard personalizado
- ✅ Exibição de informações do usuário
- ✅ Layout responsivo
- ✅ Navegação intuitiva
- ✅ Feedback visual (toasts)

### **🛡️ Segurança**
- ✅ Validação client-side
- ✅ Tratamento de erros
- ✅ Tokens JWT automáticos
- ✅ Logout automático em caso de token inválido

## 📱 Páginas Disponíveis

### **Login** (`/login`)
- Formulário de login com validação
- Campos: email, senha
- Link para cadastro
- Validação em tempo real

### **Cadastro** (`/register`)
- Formulário completo de cadastro
- Campos: nome, email, CPF, telefone, endereço, senha, código
- Validação de CPF e email
- Link para login

### **Dashboard** (`/dashboard`)
- Informações pessoais do usuário
- Status da conta
- Ações rápidas
- Layout responsivo

## 🎯 Componentes Principais

### **AuthContext**
- Gerenciamento global de autenticação
- Persistência de dados no localStorage
- Métodos: login, register, logout, updateUser

### **Layout**
- Header com logo e navegação
- Informações do usuário logado
- Botão de logout

### **Formulários**
- Validação com React Hook Form
- Feedback visual de erros
- Campos com ícones
- Máscaras de entrada

## 🔧 Configuração

### **Variáveis de Ambiente**
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Hotel das Maravilhas
VITE_APP_VERSION=1.0.0
```

### **Roteamento**
- `/` - Redireciona para dashboard
- `/login` - Página de login
- `/register` - Página de cadastro
- `/dashboard` - Dashboard (protegido)

## 📊 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── contexts/           # Contextos React
├── pages/             # Páginas da aplicação
├── services/          # Serviços de API
├── types/             # Definições TypeScript
├── App.tsx            # Componente principal
└── main.tsx           # Ponto de entrada
```

## 🎨 Design System

### **Cores**
- **Primary**: Azul (#3b82f6)
- **Secondary**: Cinza (#64748b)
- **Success**: Verde
- **Error**: Vermelho
- **Warning**: Amarelo

### **Componentes**
- Botões com estados (primary, secondary)
- Inputs com validação
- Cards informativos
- Layout responsivo

## 🚀 Deploy

1. **Build da aplicação:**
```bash
npm run build
```

2. **Os arquivos estarão em `dist/`**

3. **Servir com qualquer servidor estático:**
```bash
npm run preview
```

## 📱 Responsividade

- **Mobile First** - Design otimizado para mobile
- **Breakpoints** - sm, md, lg, xl
- **Grid System** - Layout flexível
- **Typography** - Escalas responsivas

## 🔍 Desenvolvimento

### **Scripts Disponíveis**
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview da build
- `npm run lint` - Linting do código

### **Hot Reload**
- Recarga automática em mudanças
- Preservação de estado
- Fast refresh do React

## 🎯 Próximos Passos

1. Implementar edição de perfil
2. Adicionar mais funcionalidades do hotel
3. Implementar sistema de reservas
4. Adicionar notificações push
5. Melhorar acessibilidade






