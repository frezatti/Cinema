FROM node:lts-alpine

WORKDIR /app

ARG PORT

ENV PORT=${PORT}

COPY package*.json ./
RUN npm install

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]
