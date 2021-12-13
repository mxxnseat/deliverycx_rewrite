FROM node:16.13.1

WORKDIR /usr/node/app

COPY package*.json ./

RUN npm install
RUN npm run build

COPY ./dist .

EXPOSE 5000

CMD ["node", "./main.js"]
