# Cinema

## How to run:

### Migrations

    Making sure the migrations have been made before start up other wise new fields will not be deteted
    by the database.

    ````
        docker compose up -d postgres
        ```
    then:
    ````

         npx prisma migrate dev --name name --create-only

    ```

### Actually Running the Program

    ```
    docker-compose up --build

    ```

    to remove it all:

    ```
    docker-compose down -v
    ```
