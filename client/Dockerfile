FROM node:16.13.1

WORKDIR /client

COPY ./package*.json .
RUN npm install

COPY . .

RUN npm run build

RUN mv /client/build /build