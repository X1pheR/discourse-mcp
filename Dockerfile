FROM node:24.21.0-bookworm-slim AS build

RUN npm install --global pnpm@10.14.0
WORKDIR /src
COPY . /src

WORKDIR /src
RUN pnpm install --frozen-lockfile \
    && pnpm build \
    && pnpm prune --prod

FROM node:24.21.0-bookworm-slim

ENV NODE_ENV=production \
    HOME=/tmp/home

RUN apt-get update \
    && apt-get install -y --no-install-recommends --only-upgrade libpcre2-8-0="10.42-1+deb12u1" \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack

COPY --from=build /src/package.json /opt/discourse-mcp/package.json
COPY --from=build /src/dist /opt/discourse-mcp/dist
COPY --from=build /src/node_modules /opt/discourse-mcp/node_modules

USER node
WORKDIR /tmp

ENTRYPOINT ["node", "/opt/discourse-mcp/dist/index.js"]
