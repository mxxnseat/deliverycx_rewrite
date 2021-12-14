# FROM node:16.13.1 as prod

# WORKDIR /usr/node/app

# COPY package*.json ./

# RUN npm install
# RUN npm run build

# COPY . .

# COPY /usr/node/app/dist ./dist

# EXPOSE 5000

# CMD ["node", "./dist/main.js"]

FROM node:16.13.1 AS development

WORKDIR /usr/node/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:16.13.1 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/node/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/node/app/dist ./dist

EXPOSE 5000

CMD ["node", "dist/main"]