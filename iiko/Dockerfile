FROM node:16.13.1

WORKDIR /usr/local/app

COPY ./package*.json .
COPY ./tsconfig.json .
COPY ./src ./src
COPY ./.env .
COPY ./favorite.png .

RUN npm install
RUN npm install -g ts-node

CMD ["ts-node", "./src/polling.ts"]