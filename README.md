# E-commerce API

This is a simple e-commerce API built with Express, TypeScript, MongoDB, Mongoose, and Zod.

## Prerequisites

- Node.js
- MongoDB

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/ctafsiras/ecommerce-api.git
    cd ecommerce-api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:

    ```env
    MONGO_URI=your_mongodb_connection_string
    PORT=3000
    ```

4. Start the server:

    ```bash
    npm run dev
    ```

The server will start on `http://localhost:3000`.

## API Endpoints

### Products

- **Create Product**: `POST /api/products`
- **Get All Products**: `GET /api/products`
- **Get Product by ID**: `GET /api/products/:productId`
- **Update Product**: `PUT /api/products/:productId`
- **Delete Product**: `DELETE /api/products/:productId`
- **Search Product**: `GET /api/products?searchTerm=term`

### Orders

- **Create Order**: `POST /api/orders`
- **Get All Orders**: `GET /api/orders`
- **Get Orders by Email**: `GET /api/orders?email=user@example.com`

## Validation

This API uses Zod for validation. Make sure to provide data that adheres to the defined schemas.

## Error Handling

The API provides meaningful error messages for validation and other errors.

- **Insufficient Quantity Error**
- **Not Found Error**
- **Not Found Route**
