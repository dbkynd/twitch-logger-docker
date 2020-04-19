#
# ---- Base Node ----
FROM alpine:3.11.5 AS base
# install nodejs
RUN apk add --no-cache nodejs
# set working directory
WORKDIR /app
# copy project files
COPY . .

#
# ---- Dependencies ----
FROM base AS dependencies
# install yarn pakage manager
RUN apk add yarn
# install only the production node_modules
RUN yarn --pure-lockfile --production=true
# prune unnecessary files from node_modules
RUN yarn modclean
# remove modclean folder from node_modules
RUN rm -R node_modules/modclean
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN yarn --pure-lockfile --production=false

#
# ---- Test ----
FROM dependencies AS test
# prettify and lint
RUN  yarn prettier && yarn lint

#
# ---- Cleanup ----
FROM base as cleanup
# remove unnecessary files
RUN rm .dockerignore && \
    rm .eslintrc.js && \
    rm .gitignore && \
    rm .prettierrc && \
    rm Dockerfile && \
    rm yarn.lock

#
# ---- Release ----
FROM cleanup AS release
# copy production node_modules
COPY --from=dependencies /app/prod_node_modules ./node_modules

ENTRYPOINT ["node", "./src/init.js"]
