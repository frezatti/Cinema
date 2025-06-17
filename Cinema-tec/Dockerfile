FROM node:lts-alpine

WORKDIR /app

ARG PORT

ENV PORT=${PORT}

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE ${PORT}

CMD serve -s dist -l ${PORT}
