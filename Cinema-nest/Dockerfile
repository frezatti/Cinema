FROM node:lts-alpine

ARG PORT                      
ENV PORT=$PORT

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY prisma ./prisma
RUN npx prisma generate

COPY tsconfig*.json ./
COPY src ./src
RUN npm run build                

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE $PORT
ENTRYPOINT ["docker-entrypoint.sh"]
