FROM node:12.16.2-alpine

RUN apk add --no-cache yarn

COPY . /app

WORKDIR /app

RUN yarn --pure-lockfile --production=true && \
    yarn cache clean

ENTRYPOINT ["yarn", "start"]
