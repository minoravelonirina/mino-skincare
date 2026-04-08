# syntax=docker/dockerfile:1

ARG NODE_IMAGE_VERSION=24.12.0-alpine
ARG PNPM_VERSION=10.33.0

# ─── Stage 1 : Builder ───────────────────────────────────────────────────────
FROM node:${NODE_IMAGE_VERSION} AS builder

ENV NODE_ENV=development

RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY prisma ./prisma
RUN pnpm db:generate

COPY . .

# ─── Stage 2 : Runner ────────────────────────────────────────────────────────
FROM node:${NODE_IMAGE_VERSION} AS runner

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

WORKDIR /usr/src/app

# Copier tout depuis le builder (structure classique Next.js)
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/app ./app
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/next.config.* ./
COPY --from=builder /usr/src/app/tsconfig.json ./

RUN chown -R node:node /usr/src/app

USER node

EXPOSE 3000

CMD ["pnpm", "dev"]