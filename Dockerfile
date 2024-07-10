FROM node:latest AS fronted-builder
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM node:latest AS backend-builder
WORKDIR /server
COPY /server/package*.json ./
RUN npm install
COPY /server ./

FROM node:latest
WORKDIR /app

COPY --from=fronted-builder /src/dist ./public
COPY --from=backend-builder /server ./

CMD [ "node", "index.js" ]

EXPOSE 5173
EXPOSE 1234