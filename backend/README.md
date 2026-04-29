# Backend API README

## Overview
This backend is an Express application that serves user authentication and note management endpoints.
The API uses JWT authentication for protected note routes.

## Getting Started

### Install dependencies

```bash
cd backend
npm install
```

### Environment variables
Create a `.env` file in the `backend` folder with at least the following values:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_here
```

### Start the server

```bash
npm start
```

The server will start on the port defined in `PORT` and sync the database with `sequelize.sync({ force: true })`.
> Note: `force: true` recreates tables on every start, so data is reset each time.

## Base URL

```text
http://localhost:<PORT>
```

If `PORT=3000`, the base URL is:

```text
http://localhost:3000
```

## Authentication Routes

### Sign up

- Method: `POST`
- URL: `/user/signup`
- Body:
  - `username` (string)
  - `email` (string)
  - `password` (string)

Example request body:

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

- Method: `POST`
- URL: `/user/login`
- Body:
  - `email` (string)
  - `password` (string)

Example request body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Example success response:

```json
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>",
  "user": {
    "uid": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

## Notes API
All `/api/notes` routes require authentication.

### Authorization header
Include the JWT token in the request headers:

```http
Authorization: Bearer <JWT_TOKEN>
```

### Get all notes

- Method: `GET`
- URL: `/api/notes/`
- Headers: `Authorization`

### Create a note

- Method: `POST`
- URL: `/api/notes/`
- Headers: `Authorization`
- Body:
  - `title` (string)
  - `description` (string)

Example request body:

```json
{
  "title": "Meeting notes",
  "description": "Discuss project milestones"
}
```

### Delete a note

- Method: `DELETE`
- URL: `/api/notes/:id`
- Headers: `Authorization`

Example:

```http
DELETE /api/notes/123
```

### Update a note

- Method: `PUT`
- URL: `/api/notes/:id`
- Headers: `Authorization`
- Body:
  - `title` (string)
  - `description` (string)

Example request body:

```json
{
  "title": "Updated title",
  "description": "Updated description"
}
```

## Notes

- The backend uses Sequelize with PostgreSQL.
- Protected note routes validate the JWT token using `process.env.JWT_SECRET`.
- If the token is missing or invalid, the API returns `401` or `403`.
- Make sure the `.env` file and database connection are correctly configured before starting the server.
