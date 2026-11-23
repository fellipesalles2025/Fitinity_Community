# Fitinity Community API

API REST desenvolvida para a plataforma **Fitinity Community**, uma rede social voltada à interação entre usuários por meio de publicações, curtidas e comentários.

O projeto permite o cadastro e autenticação de usuários, gerenciamento de perfis, criação de publicações e interação entre usuários.

## Tecnologias utilizadas

- Node.js
- Express
- MySQL
- JSON Web Token (JWT)
- Bcrypt
- Multer
- Postman

## Funcionalidades

- Cadastro de usuários.
- Login e autenticação com JWT.
- Criptografia de senhas com Bcrypt.
- Proteção de rotas privadas.
- Consulta e atualização de perfil.
- Upload de foto de perfil.
- Criação, listagem, edição e exclusão de publicações.
- Upload de imagens nas publicações.
- Curtidas em publicações.
- Comentários em publicações.
- Controle de autorização para impedir que usuários alterem publicações de outras pessoas.

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- [Node.js](https://nodejs.org/)
- [MySQL](https://dev.mysql.com/downloads/)
- [Git](https://git-scm.com/)
- [Postman](https://www.postman.com/) para realizar os testes.

## Instalação

1. Clone o repositório:

```bash
git clone git@github.com:fellipesalles2025/Fitinity_Community.git
```

2. Entre na pasta do projeto:

```bash
cd Fitinity-Community
```

3. Instale as dependências:

```bash
npm install
```

## Configuração do banco de dados

1. Abra o **MySQL Workbench** e conecte-se ao seu servidor MySQL.
2. No menu superior, acesse **File → Open SQL Script**.
3. Selecione o arquivo `database.sql`, localizado na raiz do projeto.
4. Com o script aberto, clique no botão de execução (ícone de raio).
5. Aguarde a execução de todos os comandos.

O script criará automaticamente o banco de dados `fitinity_community` e as seguintes tabelas:

- `users`: armazena os dados dos usuários.
- `posts`: armazena as publicações.
- `likes`: registra as curtidas.
- `comments`: armazena os comentários.

Para verificar se tudo foi criado corretamente, atualize a seção **Schemas** no painel esquerdo do Workbench e expanda o banco `fitinity_community`.

**Importante:** configure as credenciais de acesso ao banco no arquivo `.env`, conforme as instruções deste README.

## Variáveis de ambiente

Na raiz do projeto, crie um arquivo chamado `.env`.

Utilize o arquivo `.env.example` como modelo:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_do_mysql
DB_NAME=fitinity_community
JWT_SECRET=sua_chave_secreta
```

**Importante:**

- Substitua `DB_PASSWORD` pela senha do seu MySQL.
- Configure `JWT_SECRET` com uma chave aleatória e segura.
- Não compartilhe o arquivo `.env`.
- O arquivo `.env` não deve ser enviado ao GitHub.

## Executando o projeto

Para iniciar a API em ambiente de desenvolvimento:

```bash
npm run dev
```

Após iniciar, a API estará disponível em:

```text
http://localhost:3000
```

A porta pode ser alterada por meio da variável `PORT` no arquivo `.env`.

## Endpoints da API

Todas as rotas utilizam o prefixo `/api`.

### Autenticação

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/api/auth/register` | Cadastrar usuário |
| POST | `/api/auth/login` | Realizar login |

### Usuários

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/users/me` | Consultar perfil do usuário autenticado |
| PATCH | `/api/users/me` | Atualizar perfil |
| POST | `/api/users/me/avatar` | Enviar foto de perfil |

### Publicações

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/api/posts` | Criar publicação |
| GET | `/api/posts` | Listar publicações |
| GET | `/api/posts/:id` | Consultar publicação específica |
| PATCH | `/api/posts/:id` | Atualizar publicação |
| DELETE | `/api/posts/:id` | Excluir publicação |

### Curtidas

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/api/posts/:id/likes` | Curtir publicação |
| DELETE | `/api/posts/:id/likes` | Remover curtida |

### Comentários

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/api/posts/:id/comments` | Criar comentário |
| GET | `/api/posts/:id/comments` | Listar comentários de uma publicação |

## Autenticação e segurança

A API utiliza JSON Web Token (JWT) para autenticação dos usuários.

Após realizar o login, o usuário recebe um token que deve ser enviado nas requisições às rotas protegidas.

No Postman, configure o cabeçalho:

```http
Authorization: Bearer SEU_TOKEN_JWT
```

As senhas dos usuários são armazenadas com hash gerado pelo Bcrypt, evitando o armazenamento de senhas em texto puro.

As rotas protegidas verificam a autenticação do usuário. Também existem verificações de autorização para impedir alterações em publicações pertencentes a outros usuários.

## Upload de arquivos

A API utiliza Multer para receber arquivos enviados pelos usuários.

Os campos utilizados nas requisições multipart/form-data são:

| Funcionalidade | Campo |
|---|---|
| Foto de perfil | `avatar` |
| Imagem de publicação | `image` |

## Testes

Os testes da API foram realizados utilizando o Postman.

Foram verificadas as seguintes funcionalidades:

1. Cadastro de usuário.
2. Tentativa de cadastro com e-mail já existente.
3. Login com credenciais válidas.
4. Login com credenciais inválidas.
5. Acesso a rotas privadas com e sem token JWT.
6. Upload de foto de perfil.
7. Criação, listagem, consulta, edição e exclusão de publicações.
8. Tentativa de edição de publicação pertencente a outro usuário.
9. Curtidas em publicações.
10. Remoção de curtidas.
11. Criação e listagem de comentários.

Os testes também verificam o comportamento da API diante de requisições inválidas e situações de acesso não autorizado.

## Estrutura do projeto

A aplicação está organizada em camadas, separando responsabilidades como:

- **Routes:** definição dos endpoints.
- **Controllers:** tratamento das requisições e respostas.
- **Services:** regras de negócio.
- **Repositories:** comunicação com o banco de dados.
- **Middlewares:** autenticação e outras validações.
- **Config:** configurações da aplicação e conexão com o banco.

## Autores

Projeto desenvolvido como parte de atividade acadêmica, com o objetivo de aplicar conhecimentos de desenvolvimento de APIs REST, banco de dados, autenticação e segurança.

---

**Fitinity Community — API REST**

