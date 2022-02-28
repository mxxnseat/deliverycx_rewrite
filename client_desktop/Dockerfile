FROM node:16-alpine

WORKDIR /usr/apps/cx
COPY . .

RUN npm install
RUN npm install @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties @babel/plugin-transform-flow-strip-types --sav
RUN npm run build

CMD ["npm", "run", "start"]