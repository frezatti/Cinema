# Cinema Full-Stack Application
---
This project is a full-stack web application for a cinema, including a frontend, backend, database, and reverse proxy, all orchestrated with Docker.

## Table of Contents

  - [Architecture Overview](https://www.google.com/search?q=%23architecture-overview)
  - [Prerequisites](https://www.google.com/search?q=%23prerequisites)
  - [Getting Started](https://www.google.com/search?q=%23getting-started)
      - [1. Environment Configuration](https://www.google.com/search?q=%231-environment-configuration)
      - [2. Running the Application](https://www.google.com/search?q=%232-running-the-application)
  - [Service Details](https://www.google.com/search?q=%23service-details)
  - [Development](https://www.google.com/search?q=%23development)
      - [Backend Database Migrations](https://www.google.com/search?q=%23backend-database-migrations)

## Architecture Overview

The entire application is managed by Docker Compose and consists of the following services:

  - **`frontend`**: A React application built with Vite, located in the `Cinema-tec` directory.
  - **`backend`**: A REST API built with NestJS and Prisma, located in the `Cinema-nest` directory.
  - **`postgres`**: A PostgreSQL database for data persistence.
  - **`pgadmin`**: A web-based GUI for managing the PostgreSQL database.
  - **`nginx`**: A reverse proxy that routes traffic to the frontend and backend services.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

  - [Docker](https://www.docker.com/get-started)
  - [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

Follow these steps to get the entire application stack running.

### 1\. Environment Configuration

The project uses a single `.env` file at the root of the repository to configure all services.

First, create a `.env` file in the same directory as the `docker-compose.yml` file. Then, copy the following content into it and adjust the values as needed.

```env
# Main Nginx Port
NGINX_PORT=80

# Frontend Configuration
FRONTEND_PORT=5173

# Backend Configuration
BACKEND_PORT=3000

# PostgreSQL Database Configuration
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=cinema_db
POSTGRES_PORT=5432

# PGAdmin Configuration
PGADMIN_PORT=5050

# Database URL for the NestJS Backend (Prisma)
# Note: The host is 'postgres', which is the service name in docker-compose
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:${POSTGRES_PORT}/${POSTGRES_DB}"
```

### 2\. Running the Application

With the `.env` file in place, you can build and run all the services with a single command:

```bash
docker-compose up --build
```

The first time you run this, Docker will download the necessary images and build the frontend and backend containers. The backend service is configured to automatically run database migrations on startup.

Once all services are running, you can access them at:

  - **Application**: `http://localhost` (or `http://localhost:${NGINX_PORT}`)
  - **pgAdmin**: `http://localhost:${PGADMIN_PORT}`

To stop and completely remove all containers, networks, and data volumes, run:

```bash
docker-compose down -v
```

## Service Details

  - **nginx**: The main entry point for the application. It serves the frontend application and forwards API requests starting with `/api` to the backend service.
  - **frontend (`Cinema-tec`)**: The user interface. For more details on the frontend code, see the `Cinema-tec` directory.
  - **backend (`Cinema-nest`)**: The API that handles business logic and database interactions. For more details, see the `Cinema-nest` directory.
  - **postgres**: The database. Its data is stored in a Docker volume named `postgres-data` to ensure persistence across container restarts.

## Development

While the entire application runs via Docker Compose, you may need to perform specific development tasks, such as creating database migrations.

### Backend Database Migrations

The `docker-entrypoint.sh` script for the backend service automatically applies existing migrations (`prisma migrate deploy`) every time the container starts.

To **create a new migration**, you need to run Prisma's `migrate dev` command against the running database container.

1.  **Ensure the database is running:**

    ```bash
    docker-compose up -d postgres
    ```

2.  **Navigate to the backend directory and run the command:**
    From the `Cinema-nest` directory, run the following command. This will create a new SQL migration file inside `Cinema-nest/prisma/migrations/`.

    ```bash
    npx prisma migrate dev --name your-descriptive-migration-name --create-only
    ```

3.  **Restart the services:**
    The new migration file is now part of your codebase. The next time you run `docker-compose up --build`, it will be applied automatically.
