FROM node:16-alpine

WORKDIR /usr/apps/cx
COPY . .

RUN yarn install
RUN yarn add @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties @babel/plugin-transform-flow-strip-types @babel/core --save
RUN yarn build

CMD ["yarn", "start"]