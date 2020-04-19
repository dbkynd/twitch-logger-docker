FROM alpine

RUN apk add curl
RUN apk add yarn

COPY . /app

WORKDIR /app

RUN yarn --pure-lockfile && \
    yarn cache clean

ENTRYPOINT ["yarn", "start"]
