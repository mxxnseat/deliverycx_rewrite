# Set the base image to Ubuntu
FROM    ubuntu:trusty

# File Author / Maintainer
MAINTAINER Anand Mani Sankar

# Install Node.js and other dependencies
RUN apt-get update && \
    apt-get -y install python build-essential nodejs

# Provides cached layer for node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/

RUN npm run build

# Define working directory
WORKDIR /dist
ADD . /dist

# Expose port
EXPOSE  3000

# Run app using nodemon
CMD ["node", "/dist/main.js"]