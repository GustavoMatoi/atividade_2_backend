# Atividade 2 - Descrição da API

Para rodar o projeto, é necessário possuir previamente instalado: 
 - Node.js
 - TS
 - Express
 - Prisma ORM
 - PostgreSQL
 - Docker
 - Docker Compose

Após clonar o repositório, utilize: 

npm i 

Para baixar as dependências do projeto (TS, express, ...) 

## Configuração do PostgreSQL 
Após instalar as dependências, suba o container do banco de dados com  :

docker compose up -d 

E verifique se o container está em execução: 

docker ps 

## Configuração do Prisma 
Para rodar o prisma, rexecute as migrações: 

npx prisma migrate dev

E gere o Prisma Client: 

npx prisma generate 

## Seed 
Para inserir os produtos iniciais no banco de dados, execute: 

npx prisma db seed 

## API 
Para rodar o projeto, utilize: 

npm run dev 

E a API estará disponível em :  http://localhost:3000

## Endpoints disponíveis 
GET, GET BY ID, POST, PUT e DELETE

A API pode ser testada tanto no Thunder Client do VSCode, quanto no Insomnia ou Postman. 


## Cors
Comunicação entre o backend e forntend. No backend, ele só aceita chamadas do localhost:5173, enquanto no frontend, ele linka diretamente no localhost:3000
