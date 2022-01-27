FROM node:16-alpine

WORKDIR /usr/app/cx

COPY package*.json ./
# COPY tsconfig.json ./

RUN npm ci --silent


CMD ["npm", "start"]