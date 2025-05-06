FROM node:22-alpine AS base

WORKDIR /app


FROM  base AS production
COPY package*.json .

RUN  npm ci --only=production

COPY . ./

FROM  base AS dev

EXPOSE 5000

COPY --from=production /app /app

CMD [ "node","app.js"]






