FROM node:16-alpine

WORKDIR /usr/app/cx

COPY package*.json ./
# COPY tsconfig.json ./

RUN npm install --silent


CMD ["npm", "start"]