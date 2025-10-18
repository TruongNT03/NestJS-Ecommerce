# Stage 1: Base dependencies 
FROM node:22-slim AS base

# Giảm kích thước image bằng cách tắt cache và xóa metadata không cần
ENV NODE_ENV=production \
    YARN_CACHE_FOLDER=/usr/local/share/.cache/yarn \
    PATH=/app/node_modules/.bin:$PATH

WORKDIR /app

# Chỉ copy file cần cho dependency install để tận dụng layer cache
COPY package.json yarn.lock ./

# Cài dependencies tạm để build
RUN yarn install --frozen-lockfile --production=false

# Stage 2: Build app
FROM node:22-slim AS builder

WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY . .

RUN yarn build

# Stage 3: Final production image
FROM node:22-slim AS runner

WORKDIR /app

# Cài production deps (chỉ những gì cần chạy, bỏ devDeps)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production --ignore-scripts --prefer-offline \
  && yarn cache clean

# Copy dist đã build từ stage trước
COPY --from=builder /app/dist ./dist

# Dọn dẹp cache, giảm kích thước
RUN rm -rf /usr/local/share/.cache /tmp/*

# Expose cổng
EXPOSE 8080

# Lệnh chạy production
CMD ["sh", "-c", "yarn migrate:run:prod && yarn seed:run:prod && node dist/src/main.js"]
