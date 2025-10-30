# Hotel das Maravilhas - Backend API

API REST para gerenciamento de usuários do Hotel das Maravilhas.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Supabase** - Banco de dados PostgreSQL
- **JWT** - Autenticação
- **bcryptjs** - Hash de senhas
- **express-validator** - Validação de dados

## 📋 Pré-requisitos

- Node.js 16+ 
- Conta no Supabase
- Variáveis de ambiente configuradas

## ⚙️ Instalação

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar variáveis de ambiente:**
```bash
cp env.example .env
```

3. **Editar arquivo `.env` com suas credenciais do Supabase:**
```env
SUPABASE_URL=sua_url_do_supabase
SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_de_servico
JWT_SECRET=sua_chave_secreta_jwt
JWT_EXPIRES_IN=7d
PORT=3000
NODE_ENV=development
```

## 🏃‍♂️ Execução

**Desenvolvimento:**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

## 📚 Endpoints da API

### 🔐 Autenticação

**POST** `/api/usuarios/register` - Cadastrar usuário
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456",
  "cpf": "123.456.789-00",
  "telefone": "(11) 99999-9999",
  "endereco": "Rua das Flores, 123"
}
```

**POST** `/api/usuarios/login` - Login
```json
{
  "email": "joao@email.com",
  "senha": "123456"
}
```

### 👤 Perfil do Usuário

**GET** `/api/usuarios/profile` - Buscar perfil (requer token)
**PUT** `/api/usuarios/profile` - Atualizar perfil (requer token)

### 👥 Gerenciamento de Usuários

**GET** `/api/usuarios` - Listar usuários (requer token)
**GET** `/api/usuarios/:id` - Buscar usuário por ID (requer token)
**PUT** `/api/usuarios/:id` - Atualizar usuário (requer token)
**DELETE** `/api/usuarios/:id` - Deletar usuário (requer token)

## 🔑 Autenticação

Para acessar rotas protegidas, inclua o token JWT no header:
```
Authorization: Bearer SEU_TOKEN_JWT
```

## 📊 Estrutura do Banco

A API trabalha com a tabela `usuarios` com os seguintes campos:

- `id` - ID único (auto incremento)
- `nome` - Nome completo
- `email` - Email único
- `senha` - Hash da senha
- `cpf` - CPF único
- `telefone` - Telefone de contato
- `endereco` - Endereço
- `codigo` - Código opcional
- `active` - Status ativo/inativo
- `created_at` - Data de criação
- `updated_at` - Data de atualização
- `deleted_at` - Data de exclusão (soft delete)
- `deleted_by` - Quem deletou

## 🛡️ Segurança

- Senhas são hasheadas com bcrypt
- Rate limiting para prevenir ataques
- Validação rigorosa de dados
- Soft delete para preservar dados
- Headers de segurança com Helmet

## 📝 Exemplos de Uso

### Cadastro de Usuário
```bash
curl -X POST http://localhost:3000/api/usuarios/register \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Silva",
    "email": "maria@email.com",
    "senha": "123456",
    "cpf": "987.654.321-00",
    "telefone": "(11) 88888-8888"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@email.com",
    "senha": "123456"
  }'
```

### Buscar Perfil (com token)
```bash
curl -X GET http://localhost:3000/api/usuarios/profile \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 🏥 Health Check

**GET** `/health` - Verificar status da API

## 📈 Monitoramento

A API inclui logs de requisições e tratamento de erros para facilitar o debug e monitoramento.


