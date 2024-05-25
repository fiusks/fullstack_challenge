FROM node:20-alpine as build

WORKDIR /usr/app

# Copiar apenas os arquivos de configuração necessários
COPY package.json ./
RUN yarn install --production
COPY . .
RUN npx prisma generate && yarn build

# Etapa final
FROM node:20-alpine as main

WORKDIR /usr/app
COPY --from=build /usr/app/package.json package.json
COPY --from=build /usr/app/node_modules node_modules
COPY --from=build /usr/app/build build
COPY --from=build /usr/app/database database
COPY --from=build /usr/app/.env .env

CMD yarn run start:prod
