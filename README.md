# Gerenciamento de clientes para empresa de limpeza

## Requisitos funcionais
- [ ] Cliente deve ser cadastrado com Nome, E-mail e Telefone
- [ ] Deve ser possível consultar os clientes cadastrados
- [ ] Deve ser possível consultar os clientes cadastrados por filtro
- [ ] O endereço do cliente deverá ser cadastrado com coordenada X,Y (longitude, latitude)
- [ ] Deve ser possível consultar rota de clientes com menor distância possível
- [ ] O operador deve ter a capacidade de fazer a autenticação no sistema 

## Requisitos não-funcionais
- [x] Banco de dados PostgreSQL
- [x] API REST em Node.js
- [x] Interface Web em React.js (Next.js)
- [ ] Endpoint da API para consulta da menor rota possível
- [ ] Autenticação por JWT
- [ ] Os endpoints da API devem fazer o controle de acesso
- [ ] As rotas da Interface Web devem fazer o controle de acesso


## Executando o sistema

Para executar o projeto, copie o repositório para a seu computador, em seguida execute o seguintes passos:


### 1. Instalando dependencias

Na raiz do projeto, com o `npm` instalado em seu computador, execute o comando:

```bash
npm i
```

### 2. Instalando e rodando o banco de dados com Docker Compose

Para executar o banco de dados, com o Docker Compose instalado em seu computador, pelo terminal, acesse a pasta do servidor `packages\server` e execute o seguinte comando:

```bash
docker-compose up -d
```

Verifique se o container do banco de dados está devidamente rodando com o comando:

```bash
docker-compose ps
```


### 3. Iniciando servidor da API

Para executar o servidor da API, a partir da raiz do projeto execute o seguinte comando:

```bash
npm run server
```

Se preferir acesso a pasta do pacote web em `packages\server` e execute o comando:

```bash
npm run dev
```

### 4. Iniciando a aplicação Web

Em um novo terminal, a partir da raiz do projeto execute o seguinte comando:

```bash
npm run web
```

Se preferir acesso a pasta do pacote web em `packages\web` e execute o comando:

```bash
npm run dev
```