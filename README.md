# Gerenciamento de clientes para empresa de limpeza

Para executar o projeto, copie o repositório para a seu computador, em seguida execute o seguintes passos:


## 1. Instalando dependencias

Na raiz do projeto, com o `npm`` instalado em seu computador, execute o comando:

```bash
npm i
```

## 2. Instalando o banco de dados com Docker Compose

Para executar o banco de dados, com o Docker Compose instalado em seu computador, pelo terminal, acesse a pasta do servidor `packages\server` e execute o seguinte comando:

```bash
docker-compose up -d
```

Verifique se o container do banco de dados está devidamente rodando com o comando:

```bash
docker-compose ps
```
