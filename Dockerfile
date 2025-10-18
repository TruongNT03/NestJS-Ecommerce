# Stage 1: Base dependencies 
FROM node:22-alpine AS base

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false && yarn cache clean

# Stage 2: Build
FROM node:22-alpine AS builder

WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Stage 3: Production
FROM node:22-alpine AS runner

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production --ignore-scripts && yarn cache clean

COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD ["sh", "-c", "yarn migrate:run:prod && yarn seed:run:prod && node dist/src/main.js"]