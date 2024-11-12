This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Setup and how to run the application

1. Install PostgreSQL to your local machine from https://www.enterprisedb.com/downloads/postgres-postgresql-downloads.
2. Setup the PostgreSQL software by creating a default user & password (from the installer), server and database (using UI tool PgAdmin).
3. Clone this repository.
4. Create a ```.env``` file in the root of the project files to contain the following data:
```
# APP VARIABLES
PORT=5001
# DATABASE VARIABLES
DB_USER=YOUR_USERNAME
DB_HOST=localhost
DB_DATABASE=YOUR_DATABSE
DB_PASSWORD=YOUR_PASSWORD
DB_PORT=YOUR_PORT
```
5. Run the command ```npm install``` to install the necessary packages used to run this application.

6. Finally, run the application using ```npm run dev``` and the application will run at the address [http://localhost:3000](http://localhost:3000) where you can access the landing page.

7. Buttons can be used to access all of the other UI pages, and [http://localhost:3000/api](http://localhost:3000/api) provides access to all of the API REST endpoints.

## Getting Started with NextJS

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.