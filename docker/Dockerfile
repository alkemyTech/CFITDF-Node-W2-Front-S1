FROM node:22.14.0-alpine3.21 AS base

RUN apk update && apk add --no-cache git
RUN rm -rf /tmp/* /var/cache/apk/*

WORKDIR /app
COPY package.json /app/
RUN npm install --unsafe-perm && npm cache clean --force
RUN npm install -g sequelize-cli

FROM base AS dev


CMD [ "tail", "-f", "/dev/null" ]

FROM base AS staging

COPY src/. /app/src/

CMD [ "npm", "run", "start" ]