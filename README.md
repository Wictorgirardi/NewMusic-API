
# NewMusic API

## Descrição
A NewMusic API é uma API para gerenciar usuários, incluindo registro e login. Esta API é construída usando Node.js, TypeScript, Hono, Drizzle ORM e PostgreSQL.

## Endpoints

### Registro de Usuário
**Endpoint:** `/auth/register`  
**Método:** POST  
**Descrição:** Registra um novo usuário.

#### Corpo da Requisição:
```json
{
  "username": "exemplo",
  "email": "exemplo@dominio.com",
  "password": "senha123",
  "acceptedPolicy": true,
  "avatar": "teste",
  "newsaletter": true
}
```

#### Resposta de Sucesso:
```json
{
  "message": "Usuário registrado com sucesso"
}
```

#### Respostas de Erro:
- **400 Bad Request**: E-mail já registrado ou dados inválidos.
- **500 Internal Server Error**: Erro interno do servidor.

### Login de Usuário
**Endpoint:** `/auth/login`  
**Método:** POST  
**Descrição:** Faz login de um usuário.

#### Corpo da Requisição:
```json
{
  "email": "exemplo@dominio.com",
  "password": "senha123"
}
```

#### Resposta de Sucesso:
```json
{
  "accessToken": "exemplo-token",
  "refreshToken": "exemplo-refresh-token",
  "user": {
    "username": "exemplo",
    "email": "exemplo@dominio.com",
    "role": "user"
  }
}
```

#### Respostas de Erro:
- **400 Bad Request**: Credenciais inválidas.
- **500 Internal Server Error**: Erro interno do servidor.

## Comandos de Execução

### Instalar Dependências
```bash
npm install
```

### Gerar Migrações
```bash
npm run generate
```

### Aplicar Migrações
```bash
npm run push
```

### Iniciar a Aplicação em Modo de Desenvolvimento
```bash
npm run dev
```

## Configuração do Ambiente
Certifique-se de configurar as variáveis de ambiente no arquivo `.env`:

```env
DB_URL=postgres://usuario:senha@localhost:5432/newMusic
```

## Estrutura do Projeto

```plaintext
newMusic
  ├── src
  ├── migrations
  ├── .env
  ├── package.json
  └── tsconfig.json
```

## Docker

Para executar a aplicação e o banco de dados PostgreSQL usando Docker, utilize os seguintes comandos:

### Construir e Iniciar os Contêineres
```bash
docker-compose up --build
```

### Executar Migrações
```bash
docker-compose exec app drizzle-kit push
```

### Gerar Migrações
```bash
docker-compose exec app drizzle-kit generate
```

## Licença
Este projeto está licenciado sob a licença ISC.
