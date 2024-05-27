<h1 align="center">
     <a href="https://mydindin.netlify.app/" alt="site do ecoleta"> Ecommerce Básico </a>
</h1>

<p align="center">
  <img alt="typescript logo" src="https://img.shields.io/badge/-TypeScript-grey?style=flat-square&logo=typescript">
  <img alt="node logo" src="https://img.shields.io/badge/-Nodejs-grey?style=flat-square&logo=Node.js">
  <img alt="postgresql logo" src="https://img.shields.io/badge/-PostgreSQL-grey?style=flat-square&logo=postgresql">    
  <img alt="prisma logo" src="https://img.shields.io/badge/-Prisma-grey?style=flat-square&logo=prisma">   
</p>

## Sobre o projeto

O projeto foi desenvolvido como solução de um desafio técnico no qual foi solicitado uma aplicação com as seguintes necessidades:

> - Poderá ser utilizado o SGBD da minha preferência
> - Backend escrito preferencialmente em fastify
> - Implementar controle de segurança para acesso aos endpoints
> - Ser possível no frontend realizar todas as operações CRUD
> - Layou e bibliotecas/componentes a escolha do candidato

---

## Funcionalidades

Segue abaixo todas as funcionalidades listadas para o projeto e as que foram implementadas.

- [x] Boas práticas de programação
- [x] Organização do código-fonte
- [x] Funcionamento da aplicação (parcial)
- [x] Clareza do código fonte.
- [x] Atendimento aos requisitos técnicos. (parcial)
- [x] Arquivo SQL (foi criada um migration no banco)
- [ ] Swagger
- [ ] Coleção Postman/Insomnia

---

### Considerações

- Infelizmente não consegui finalizar todos os pontos em tempo devido ao prazo apertado para realizar a tarefa e algumas questões pessoais que enfrentei durante a execução. Porém, desde o início do projeto dediquei minha atenção numa boa estruturação do código, organização e boas práticas ao invés das funcionalidades em si. O escopo do projeto era razoavelmente grande para o tempo de execução proposto, e jullguei esses pontos como mais signficativos para a avaliação.

- Faltou também um pouco de clareza em relação as orientações do teste. Não foi definido um contexto, se deveria ser um sistema de uma franquia ou algo tipo um e-commerce. Daí acabei tendo que escolher um caminho a seguir que não sei ao certo se foi o correto por acabar ferindo algumas regras em relação ao que foi solicitado

---

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).

A versão utilizada do [Node.js](https://nodejs.org/en/) foi a v20.0.0 e a comunicação com o banco de dados PostgresSQL foi feita através do [Prisma](https://www.prisma.io/).

> Ver documentação [Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres)

O [schema](backend/database/prisma/schema.prisma) segue o seguinte padrâo:

- Category
- Customer
- Address
- Order
- Product
- ProductOrder

#### Rodando o projeto

- Backend

```bash

# Migrar para a pasta backend

# Instale as dependências
$ npm install

# Criar um banco do postgres no docker
$ docker run -d --name postgresChallenge -p 5432:5432 -e POSTGRES_PASSWORD=pass123 postgres

# Configurar as variáveis de ambiente nos arquivos .env
## A referência de como preencher está no ./env.example

# Rodar o prisma para criar o banco de dados e gerar as tabelas
$ npx run prisma migrate dev

# Rodar o projeto backend
$ npm run dev

# O servidor inciará na porta:3333 - acesse http://localhost:3333

```

---

- FrontEnd

```bash
# Migrar para a pasta backend

# Instale as dependências
$ npm install

# Rodar o projeto
$ npm run dev

# O servidor inciará na porta:3000 - acesse http://localhost:3000

```

---

---

## Rotas

Devido ao tempo escasso, como citado acima, e apesar da experiência utilizando swagger, bem como o insomnia e o postman, não consegui implementar em tempo o swagger nem o JSON do insomnia, pois respeitei o prazo final de entrega. Porém, segue abaixo as rotas base para cada entidade, modificando os devidos verbos. Os testes podem ser feito do front end, e os dados iniciais estão sendo gerados via migration.

> baseUrld = localhost:3333
> /login
> /register
> /customers
> /customer-address
> /products
> /categories
> /orders

```

## Autor

<a href="https://blog.rocketseat.com.br/author/thiago/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/68557347?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Rafael Barros</b></sub></a>

[![Linkedin Badge](https://img.shields.io/badge/-Rafael-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/rafabarros1/)](https://www.linkedin.com/in/rafabarros1/)
[![Gmail Badge](https://img.shields.io/badge/-rafabarros.com@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:rafabarros.com@gmail.com)](mailto:rafabarros.com@gmail.com)

---
```
