# Simple GraphQL Authentication with NodeJS and MySQL

A project that implement NodeJS and MySQL to build GraphQL Authentication such as Sign-up and Sign-in

## How to run this project

- Run this command to install the required modules:

```bash
  npm run i
```

- Create `.env` file based on `.env.example` file on this repository. Fill the environment based on your machine.
- Create database on your MySQL server. Keep in mind that the database name must be the same as the one in the `.env` file.
- After that run this command to Create table in database:

```bash
  npm run migrate
```

- To run this project, run this command:

```bash
  npm run dev
```

- You can access the GraphiQL to assess this project at `localhost:{your_port}/graphql`
