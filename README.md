# Stock Management API

A simple Order Management API built with **Node.js**, **Express**, **MongoDB**, **Mongoose**, and **Joi** for validation. This project demonstrates atomic operations using transactions for stock management.

---

## Features

* **Products:** Add and list products.
* **Orders:** Create orders with multiple products.
* **Stock Management:** Stock is decremented atomically when orders are placed.
* **Validation:** Request body validation using Joi.
* **Transactions:** Ensures order creation and stock updates are atomic.

---

## Installation

1. Clone the repository:

```bash
git clone <your-github-repo-url>
cd stock-management
```

2. Install dependencies:

```bash
npm install
```

3. Ensure MongoDB is running locally (default port 27017).

4. Start the server:

```bash
node index.js
```

Server will run on `http://localhost:3000`.

---

## API Endpoints

### Products

* **POST /api/products** - Add a new product

```json
{
  "name": "Pen",
  "price": 10,
  "stock": 50
}
```

* **GET /api/products** - List all products

### Orders

* **POST /api/orders** - Create a new order

```json
{
  "userName": "Alice",
  "products": [
    { "productId": "<product-id>", "qty": 5 }
  ]
}
```

* **GET /api/orders** - List all orders with product details

---

## Validation

* **Products:** name (string, required), price (positive number, required), stock (integer >= 0, required)
* **Orders:** userName (string, required), products array (each with productId and qty >=1)

---

## Notes

* Uses **MongoDB transactions** to ensure stock is updated atomically.
* If any product in an order fails (not enough stock), the entire order is rolled back.
* Error responses use HTTP status 400 with descriptive messages.

---

## Postman Collection

Export your API requests from Postman and include the JSON file in the repo for testing all endpoints.

---
