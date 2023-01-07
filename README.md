# FoodCourt addon API

## Introduction

This is an API for a meal management application that allows users to create, read, update, and delete
meal addons. [here](https://fctest-production.up.railway.app/healthcheck).

This api was developed using

- NodeJs (LTS version 18.3.0)
- KnesJS ORM | ObjectionJS
- PostgresSQL
- NestJS | TypeScript

## Getting Started

### Prerequisites

The tools listed below are needed to run this application locally:

- Node (LTS Version)
- Npm v8.3.1 or above
- Docker (easier but optional) or PostgreSQL installed locally

You can check the Node.js and npm versions by running the following commands.

### Check node.js version

`node -v`

### Check npm version

`npm -v`

## Installation/setup

- Install project dependencies by running `npm install`.

- If you have docker installed and running, open a new terminal and run
  ```shell
    docker run --name postgres15 -p 5432:5432 -e POSTGRES_USER={{username}} -e POSTGRES_PASSWORD={{password}} -d postgres:15-alpine
  ```
  to spin a postgres container. Then run the following command to create a new database
  ```shell
    docker exec -it postgres15 createdb --username={{username}} --owner={{username}} foodcourt
  ```
- Incase you are NOT using docker, please ensure you have postgres up and running on port 5432 (or any port really) on your device and your connection details ( host, user, password etc), and ensure you ha
- In the root directory of your project create a `.env` file and populate it with the following details:
  ```env
    JWT_SECRET=secretkey
    DB_DATABASE=foodcourt
    DB_HOST=localhost
    DB_PASSWORD={{your postgres password (or the password value you provided if you used the docker approach)}}
    DB_PORT=5432 or {{your configured postgres port }}
    DB_USER={{you postgres user (or the username value you provided if you used the docker approach)}}
  ```
- Run `npm run start:dev` to start the development server and watch for changes.

- Access endpoints on localhost:2121 using any api client of your choice (e.g Postman, Insominia etc).

## Run migration

This can be done before or after successfully starting the development server.

- First, open a new terminal and navigate to your projects root directory.

- Then run `npm run migrateup` to execute the database migrations.
- For convinience, some seed data has been provided for database seeding. Run `npm run seed` to seed in some data to the database (follow ).

# E-R Diagram

![alt text](https://github.com/MrOrero/lendsqr-api/blob/main/er-diagram.PNG?raw=true)

# REST API

The REST API to the _food court app_ is described below.
The base URL for local development is

    http://localhost:2121/

The base URL for the live version is

    https://fctest-production.up.railway.app/

POST `/brands/:brandId/addons`: Create a new meal addon for the specified brand. The request body should contain the following fields:

- name: The name of the meal addon (string, required)
- description: A description of the meal addon (string, optional)
- price: The price of the meal addon (number, required)
- category: The category of the meal addon (string, optional)

GET /brands/:brandId/addons: Retrieve a list of all meal addons for the specified brand.

GET `/brands/:brandId/addons/:addonId`: Retrieve a single meal addon by its ID for the specified brand.

PATCH `/brands/:brandId/addons/:addonId`: Update a single meal addon by its ID for the specified brand. The request body should contain the following fields:

- name: The updated name of the meal addon (string, optional)
- description: The updated description of the meal addon (string, optional)
- price: The updated price of the meal addon (number, optional)
- category: The updated category of the meal addon (string, optional)
- DELETE `/brands/:brandId/addons/:addonId`: Delete a single meal addon by its ID for the specified brand.

POST `/brands/:brandId/addon-categories`: Create a new category for meal addons for the specified
brand. The request body should contain the following field:

- name: The name of the category (string, required)

For convienience, 3 brands currently exist as part of the seed data

```json
    { id: 1, name: 'Wing Kings' },
    { id: 2, name: 'Frankies' },
    { id: 3, name: 'FC Shop' },
```

use any of these 3 brand id's when testing out the API.

## Authentication and Authorisation

The api uses a Bearer authentication to ensure that only Admins can make the above requests. To get your admin Bearer token, make a `POST` request to `/auth` with the following request body

```json
{
  "username": "testuser"
}
```

you should receive a response containing the access token like in the example below.

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.      eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjczMDQyMjYxLCJleHAiOjE2NzMwNDU4NjF9.           3j7njHBfaWvmvW9BFFIGgq1C6LHbE-1_gDGo7KD-Lnw"
}
```

Ensure you pass the `Bearer <token you recieved>` in the `Authorisation` header when making your request else you will not be granted access to the resources.

## Postman documentation

[Click here to get the postman documentation](https://documenter.getpostman.com/view/22009828/2s8Z75RUcz)


#### Deployed Link

You can [click here](https://fctest-production.up.railway.app/healthcheck) to test the api
