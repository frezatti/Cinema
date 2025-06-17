FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# Command to run the Vite dev server
# The --host flag is important to expose the server to other containers
CMD ["npm", "run", "dev", "--", "--host"]
