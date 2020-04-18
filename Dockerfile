FROM node:12.13.1

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

COPY . /app

WORKDIR /app

RUN yarn --pure-lockfile && \
    yarn cache clean

RUN yarn

ENTRYPOINT ["yarn", "start"]
