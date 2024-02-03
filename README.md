# Gerenciamento de clientes para empresa de limpeza

Este é um sistema de gerenciamento de clientes para uma empresa de limpeza. No sistema o operador pode cadastrar os clientes com as informações `name`, `email`, `phone`, além da localização do cliente em `lon` e `lat`. Permitindo assim a: a) consulta dos clientes; b) a utilização de filtros para a consulta do cliente; e c) a vizualização da rota mais curta para a visitação dos clientes.

O sistema é composto de 3 camadas: banco de dados PostgreSQl, back-end Node.js (v. 20.11.0) e front-end React.Js.

**Trata-se de sistema criado para avaliação da equipe da Facilíta Jurídico.**

---

# Justificativa de decisões 


### - Estrutura do repositório em Monorepo

Como se trata de uma aplicação fullstack, preferiu-se a utilização de um monorepo para estruturação de todo o projeto, permitindo rápido acesso aos compenentes do backend e frontend, conferindo uma visão global do projeto além do compartilhamento de recursos comuns.

### - ExpressJs para o servidor

O [ExpressJs](https://expressjs.com/pt-br/) é um dos principais frameworks para web disponível para Node.Js, sendo extremanente leve para o objetivo pretendido. Considerando o nível de complexidade e requisitos do projeto trata-se de uma opção adequada.

### - Node-Postgres para manipulação de banco de dados

Para a conexão com o banco de dados se optou pela utilização da biblioteca [node-postgres](https://node-postgres.com/). Trata-se de uma uma biblioteca para `pg` para o gerenciamento do banco de dados de mais baixo nível, dispensando-se, assim, a utilização de ORMs como o Prisma.

### - NextJs para o front-end

O [NextJs](https://nextjs.org/) é um dos principais frameworks React atualmente disponíveis. Considerando que as atuais diretrizes do ReactJs para a criação de novos projetos é a utilização de um framework optou-se pelo NextJs.

### - Shadcn/ui para componentes da interface web

O [shadcn/ui](https://ui.shadcn.com/) é um repositório de implementação de componentes do [Radix-UI](https://www.radix-ui.com/). Ele permite a cópia de componenetes usuais e a total personalização dos mesmos. Considerando a qualidade do projeto e o tempo disponível, se entendeu ser conveniente a utilização deste recurso.

---

# Executando o sistema

Para executar o projeto, copie o repositório para a seu computador. Todo o código está um um monorepo. Acesse a pasta do repositório e execute o seguintes passos:


### 1. Instalando dependencias

Na raiz do projeto, com o `npm` instalado em seu computador, execute o comando:

```bash
npm i
```

### 2. Instalando e rodando o banco de dados com Docker Compose

**Importante:** é necessário ter o `Docker Compose` instalado em seu computador.

Para executar o banco de dados, pelo terminal, acesse a pasta do servidor `packages\server` e execute o seguinte comando:

```bash
docker-compose up -d
```

Verifique se o container do banco de dados está devidamente rodando com o comando:

```bash
docker-compose ps
```

### 3 Iniciando a aplicação

Para executar a aplicação completa (Web+API), a partir da raiz do projeto execute o seguinte comando:

```bash
npm run all
```

**Se preferir, inicie separadamente cada uma das camadas:**

Para executar o **servidor da API**, acesse a pasta do pacote web em `packages\server` e execute o comando:

```bash
npm run dev
```

Para a **aplicação Web**, em um novo terminal, a partir da pasta do pacote web em `packages\web` e execute o comando:

```bash
npm run dev
```

---

# Requisitos

## Requisitos funcionais
Obrigatórios:
- [x] Cliente deve ser cadastrado com Nome, E-mail e Telefone
- [x] Deve ser possível consultar os clientes cadastrados
- [x] Deve ser possível consultar os clientes cadastrados por filtro
- [x] O endereço do cliente deverá ser cadastrado com coordenada X,Y (longitude, latitude)
- [x] Deve ser possível consultar a rota de visita aos clientes com menor distância possível

Extras:
- [x] As rotas criadas podem ser persistidas para consulta posterior
- [ ] O operador deve ter a capacidade de fazer a autenticação no sistema
- [ ] Deve ser possível editar as informações de um cliente 
- [ ] Deve ser possível excluir um cliente  

## Requisitos não-funcionais
Obrigatórios:
- [x] Banco de dados PostgreSQL
- [x] API REST em Node.js
- [x] Interface Web em React.js (Next.js)
- [x] Endpoint da API para consulta da menor rota possível

Extras:
- [ ] Autenticação por JWT
- [ ] Os endpoints da API devem fazer o controle de acesso
- [ ] As rotas da Interface Web devem fazer o controle de acesso
