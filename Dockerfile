# Stage 1: Install deps
FROM node:22-slim AS deps

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile


# Stage 2: Build app
FROM node:22-slim AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN yarn build

#  Stage 3: Production runtime
FROM node:22-slim AS runner

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production --ignore-scripts --prefer-offline


COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD ["sh", "-c", "yarn migrate:run:prod && yarn seed:run:prod && node dist/src/main.js"]
