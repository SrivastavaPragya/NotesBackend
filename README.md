# Note-Taking Backend Application

## Overview
This project is a backend service for a note-taking application. It is designed to provide secure and efficient API endpoints for managing notes. The application allows users to create, read, update, and delete notes. It also includes user authentication to ensure secure access to personal notes.

### Features
- User Authentication: Secure signup and login process.
- CRUD Operations: Create, read, update, and delete notes.
- Secure: Passwords are hashed, and access to certain endpoints is restricted to authenticated users.
- JSON Web Tokens (JWT): Used for maintaining session state and securing endpoints.

## Technologies Used
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database for handling application data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **bcryptjs**: A library to hash passwords.
- **JSON Web Tokens (JWT)**: For secure transmission of information as JSON objects.

## Getting Started

### Prerequisites
- Install [Node.js](https://nodejs.org/)
- Install [MongoDB](https://www.mongodb.com/)
- Basic understanding of JavaScript and Node.js

### Installation
1. Clone the repository from GitHub:
   ```bash
   git clone [repository URL]
Navigate to the project directory:

bash
Copy code
cd notebackend
Install dependencies:

bash
Copy code
npm install
Setting Up Environment Variables
Create a .env file in the root directory of the project and set the following variables:

PORT: The port number for the server (e.g., 3000).
MONGO_URI: MongoDB connection URI.
JWT_SECRET: Secret key for signing JWT tokens.
Running the Server
Run the following command to start the server:

bash
Copy code
npm start


API Documentation
User Endpoints
POST /users/signup: Register a new user.
Body: { "username": "user", "password": "password" }
POST /users/login: Authenticate and login a user.
Body: { "username": "user", "password": "password" }
Note Endpoints
POST /notes: Create a new note. Requires authentication.
Body: { "title": "Note Title", "description": "Note Description" }
GET /notes: Retrieve all notes.
GET /notes/:id: Retrieve a specific note by ID.
PUT /notes/:id: Update a note by ID. Requires authentication.
Body: { "title": "New Title", "description": "New Description" }
DELETE /notes/:id: Delete a note by ID. Requires authentication.
