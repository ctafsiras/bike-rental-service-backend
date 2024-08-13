# E-commerce API

This is a simple e-commerce API built with Express, TypeScript, MongoDB, Mongoose, and Zod.

## Prerequisites

- Node.js
- MongoDB

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/ctafsiras/bike-rental-service-backend
    cd bike-rental-service-backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:

    ```env
    MONGO_URI=your_mongodb_connection_string
    PORT=3000
    JWT_SECRET=secret
    ```

4. Start the server:

    ```bash
    npm run dev
    ```

The server will start on `http://localhost:3000`.

## Validation

This API uses Zod for validation. Make sure to provide data that adheres to the defined schemas.

## Error Handling

The API provides meaningful error messages for validation and other errors.

- **Insufficient Quantity Error**
- **Not Found Error**
- **Not Found Route**
