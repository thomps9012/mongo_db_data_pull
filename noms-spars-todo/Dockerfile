FROM node:lts AS deps
WORKDIR /noms-spars-todo
COPY package.json yarn.lock ./
RUN yarn install

FROM node:lts AS builder
WORKDIR /noms-spars-todo
COPY . .
COPY --from=deps /noms-spars-todo/node_modules ./node_modules
RUN yarn build

FROM node:lts AS runner
WORKDIR /noms-spars-todo
ENV NODE_ENV production
COPY --from=builder /noms-spars-todo/next.config.js ./
COPY --from=builder /noms-spars-todo/public ./public
COPY --from=builder /noms-spars-todo/.next ./.next
COPY --from=builder /noms-spars-todo/node_modules ./node_modules
COPY --from=builder /noms-spars-todo/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]