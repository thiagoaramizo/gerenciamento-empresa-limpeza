# Gerenciamento de clientes para empresa de limpeza

Este é um sistema de gerenciamento de clientes para uma empresa de limpeza. No sistema o operador pode cadastrar os clientes com as informações `name`, `email`, `phone`, além da localização do cliente em `lon` e `lat`. Permitindo assim a: a) consulta dos clientes; b) a utilização de filtros para a consulta do cliente; e c) a vizualização da rota mais curta para a visitação dos clientes.

Os clientes podem ser consultados a partir de uma tabela dinâmica, que permite o filtro e a ordenação dos elementos:

![Imagem da página de clientes](https://github.com/thiagoaramizo/gerenciamento-empresa-limpeza/blob/main/prints/print1.png?raw=true)

A partir desta tela é possível fazer o cadastro dos clientes:

![Imagem da página de cadastro de clientes](https://github.com/thiagoaramizo/gerenciamento-empresa-limpeza/blob/main/prints/print2.png?raw=true)

A seção de clientes permite ainda a seleção dos clientes desejados para a criação das rotas:

![Imagem da página de clientes com seleção](https://github.com/thiagoaramizo/gerenciamento-empresa-limpeza/blob/main/prints/print3.png?raw=true)

A exibição da rota mais eficiente e apresentada na própria tela, a partir de um modal:

![Imagem da página de clientes](https://github.com/thiagoaramizo/gerenciamento-empresa-limpeza/blob/main/prints/print4.png?raw=true)

Por fim, as rotas calculadas são armazenadas no banco de dados, e podem ser consultadas na seção de rotas:

![Imagem da página de clientes](https://github.com/thiagoaramizo/gerenciamento-empresa-limpeza/blob/main/prints/print5.png?raw=true)

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


### - Cálculo de rotas

Para o cáculo das rotas foi considerado a instrução literal da documentação apresentada, considerando um plano de duas dimensões. Assim para o cálculo de distância foi utilizada o teorema de pitágoras para o cálculo da distância entre dois pontos (d²=( (xb-xa)² + (yb-ya)²).

A função de cálculo de distância consta no arquivo `packages/server/src/controller/route-controller.ts`:

```bash
function calcDistance ( position: { lon: number, lat: number}, client: Client ): number {
    const deltaX = client.lon - position.lon
    const deltay = client.lat - position.lat
    const sqrDistance = (deltaX**2) + (deltay**2)
    const distance = Math.sqrt(sqrDistance)
    return distance
}
```

Esta função é utilizada para a ordenação dos clientes:

```bash

function makeRoute ( clients: Client[] ): RoutePayload {

    const currentLocation = {
        lat: 0,
        lon: 0
    }

    const routed: Client[] = []
    const distances: number[] = []
    const needRoute = JSON.parse( JSON.stringify(clients) ) as Client[]

    while ( routed.length < clients.length ){

        const distancesArray = needRoute.map( (clientNeedRoute) => {
            return calcDistance( currentLocation, clientNeedRoute )
        } )

        const shortest = Math.min(...distancesArray)
        const indexShortest = distancesArray.indexOf( shortest )

        routed.push( needRoute[indexShortest] )
        distances.push( shortest )
        needRoute.splice( indexShortest, 1)

        currentLocation.lat = routed[ routed.length -1 ].lat
        currentLocation.lon = routed[ routed.length -1 ].lon

    }

    return {
        clients: routed as Client[],
        distances: distances
    }
}

```

Explicando a ordenação: inicialmente defininmos a posição inicial na coordenada (0,0)

``` bash
    const currentLocation = {
        lat: 0,
        lon: 0
    }
```

Em seguida criamos os arrays que serão manipulados. Fazemos um cópia total do array de clientes para evitar problemas com a manipulação do objetos:

``` bash

    const routed: Client[] = []
    const distances: number[] = []
    const needRoute = JSON.parse( JSON.stringify(clients) ) as Client[]

```

Em um `while` usamos um `map` para criar um array numérico, `distancesArray`, e armazenar as distâncias de cada cliente que precisa ser ordenado (`needRoute`) com a posição atual (`currentLocation`). Com o `distancesArray` preenchido, encontramos o menor valor e a posição deste valor no array, esta posição tem equivalência com o array de clientes que precisam ser ordenados (`needRoute`).

Uma vez encontrada a posição, o cliente do `needRoute` é transferido (copiado e removido) para o array ordenado da rota, `routed`. Adicionamos ainda a distancia em um array de distancias(`distances`). A posição atual (`currentLocation`) é atulizada para o local deste novo ponto e a lógica se repete até que todos os clientes estejam devidamente ordenados:


```bash

    while ( routed.length < clients.length ){

        const distancesArray = needRoute.map( (clientNeedRoute) => {
            return calcDistance( currentLocation, clientNeedRoute )
        } )

        const shortest = Math.min(...distancesArray)
        const indexShortest = distancesArray.indexOf( shortest )

        routed.push( needRoute[indexShortest] )
        distances.push( shortest )
        needRoute.splice( indexShortest, 1)

        currentLocation.lat = routed[ routed.length -1 ].lat
        currentLocation.lon = routed[ routed.length -1 ].lon
    }

```

Por fim, os arrays de clientes ordenados e distancias é retornado para que a API dê a sequência correta. Com essa lógica evitamos iterações desnecessárias e fornecemos o resultado de forma eficiente.

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

# Requisitos do desenvolvimento da avaliação

## Requisitos funcionais
Obrigatórios:
- [x] Cliente deve ser cadastrado com Nome, E-mail e Telefone
- [x] Deve ser possível consultar os clientes cadastrados
- [x] Deve ser possível consultar os clientes cadastrados por filtro
- [x] O endereço do cliente deverá ser cadastrado com coordenada X,Y (longitude, latitude)
- [x] Deve ser possível consultar a rota de visita aos clientes com menor distância possível

Extras:
- [x] Criar rota a partir de clientes selecionados
- [x] As rotas criadas podem ser persistidas para consulta posterior
- [ ] O operador deve ter a capacidade de fazer a autenticação no sistema
- [ ] Deve ser possível editar as informações de um cliente 
- [ ] Deve ser possível excluir um cliente  

## Requisitos não-funcionais
Obrigatórios:
- [x] Banco de dados PostgreSQL
- [x] API REST em Node.js
- [x] Interface Web em React.js (Next.js)
- [x] Endpoint da API para consulta da menor rota possível dos clientes

Extras:
- [x] Endpoint da API para consulta da menor rota possível com base em lista de clientes enviada
- [ ] Documentação da API
- [ ] Autenticação de rotas por JWT
