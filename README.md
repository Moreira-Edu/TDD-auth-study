# FinManager

<fig>
<img src="https://rockcontent.com/br/wp-content/uploads/sites/2/elementor/thumbs/modelo-de-projeto-p2he6clp7uhmwqd16ikv9jgz30a5liixoon908hej0.png" alt="Uma imagem relacionada ao projeto">
<figcaption>Uma imagem relacionada ao projeto</figcaption>
</fig>

## Inicialização

Para executar o projeto, utilize as ferramentas descritas na sessão _Ferramentas_.

## Ferramentas

- [VsCode](https://code.visualstudio.com/) - IDE para desenvolvimento.
- [Git](https://git-scm.com/) - Ferramenta de versionamento de código
- [Nodejs](https://nodejs.org/en/) - Ambiente de execução do Javascript

## Links importantes

- [Rest API with Javascript](https://medium.com/quick-code/building-a-simple-rest-api-introduction-to-nodejs-and-express-fc25daf57baf) - API com Javascript.

# FinManager

## Introdução

> Projeto de gerenciamento de contas e transações financeiras com o objetivo de estudar TDD e Auth.

Este projeto possui o objetivo principal de estudar e compreender o desenvolvimento de uma aplicação web com conceitos sobre TDD e Auth.

## Análise técnica

### Descrição do ambiente técnico

O sistema é composto por um banco de dados, uma interface web e um sistema embarcado. Funcionalidades principais:

- Gerenciamento de saldo de contas.
- Cadastramento e listagem de contas do usuário.
- gerenciamento de transferências entre conta.

As ferramentas utilizadas para o desenvolvimento incluem JavaScript que é uma linguagem de programação utilizada para desenvolvimento web principalmente, seja backend ou frontend. O query builder utilizado para a integração com o banco de dados foi o Knex . Postgresql atuando como sistema gerenciador de banco de dados relacional.

## Regras de Negócio

_Solicitação_
O cliente só fará o cadastramento e solicitação se estiver cadastrado e logado.

_Alteração e deleção_
O cliente só fará a alteração e deleção das contas e transações relacionadas ao seu cadastro.

_leitura do saldo_
O cliente só fará a leitura do saldo se estiver cadastrado e logado.

## Casos de Uso

_Login no sistema_

Ao entrar no sistema pela primeira vez o usuário deve cadastrar suas informações. O usuário deverá informar seu e-mail e senha.

### Mensagens internas

Rotas utilizadas pela aplicação web para executar metodos de **POST** e **GET** no banco de dados. Onde o retorno de cada uma das funções estara contido em uma sessão para renderização de páginas web.

> Endpoints da aplicação.

| `accounts`            | Funcionalidade                                           |
| --------------------- | -------------------------------------------------------- |
| `GET` /accounts       | Informa todas as contas do usuário cadastradas no banco. |
| `GET` /accounts/:id   | Informa uma conta do usuário cadastrada no banco         |
| `POST` /accounts      | Insere uma nova conta do usuário.                        |
| `PUT` /accounts/:id   | Atualiza uma conta do usuário cadastrada.                |
| `DELETE`/accounts/:id | deleta uma conta do usuário cadastrada                   |

| `Transactions`            | Funcionalidade                                               |
| ------------------------- | ------------------------------------------------------------ |
| `GET` /transactions       | Informa todas as transações do usuário cadastradas no banco. |
| `GET` /transactions/:id   | Informa uma transação do usuário cadastrada no banco         |
| `POST` /transactions      | Insere uma nova transação do usuário.                        |
| `PUT` /transactions/:id   | Atualiza uma transação do usuário cadastrada.                |
| `DELETE`/transactions/:id | deleta uma transação do usuário cadastrada                   |

| `Transfers`            | Funcionalidade                                                   |
| ---------------------- | ---------------------------------------------------------------- |
| `GET` /transfers       | Informa todas as transferências do usuário cadastradas no banco. |
| `GET` /transfers/:id   | Informa uma transferência do usuário cadastrada no banco         |
| `POST` /transfers      | Insere uma nova transferência do usuário.                        |
| `PUT` /transfers/:id   | Atualiza uma transferência do usuário cadastrada.                |
| `DELETE`/transfers/:id | deleta uma transferência do usuário cadastrada                   |

| `Users`          | Funcionalidade                                  |
| ---------------- | ----------------------------------------------- |
| `GET` /users     | Informa todos os usuários cadastrados no banco. |
| `GET` /users/:id | Informa um usuário cadastrada no banco          |
| `POST` /users    | Insere um usuário.                              |

| `Auth`         | Funcionalidade                |
| -------------- | ----------------------------- |
| `POST` /signin | Cadastra um usuário no banco. |
| `POST` /signup | Loga um usuário no Sistema.   |

## Modelos de entidade

- ### _Users_

```
{
  id: int,
  name: string,
  email: string,
  password: string,
}
```

- ### _Accounts_

```
{
  id: int,
  name: string,
  user_id: int
}
```

- ### _Transactions_

```
{
  id: int,
  description: string,
  type: enu[I || O],
  date: DATE,
  amount: decimal,
  status: boolean,
  acc_id int
}
```

- ### _Transactions_

```
{
  id: int,
  description: string,
  date: Date,
  amount: decimal,
  acc_origin_id: int,
  acc_destiny_id: int,
  user_id: int
}
```

## Script

```
start: start app server
test: run automatized tests
secure-mode: run automatized tests in watch mode
lint: warn and fix identation and code write rules

```

## Conceitos básicos

- [TDD](https://www.devmedia.com.br/test-driven-development-tdd-simples-e-pratico/18533#:~:text=Basicamente%20o%20TDD%20se%20baseia,para%20fazer%20o%20teste%20passar!) - TDD é um conceito que vem com a prática de desenvolvimento orientado a testes.
- [Auth](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API) - Conjunto de métodos e práticas que visam aumentar a segurança da API, protegendo o usuário e as regras de negócio.
