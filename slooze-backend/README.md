# Slooze Backend API

GraphQL backend built with **NestJS + GraphQL + Prisma + PostgreSQL + JWT Authentication**.

This backend provides:

- User Registration
- Login with JWT
- Role-Based Access Control (RBAC)
- Product CRUD (Manager & Store Keeper)
- Manager Dashboard (Statistics)

---

## Tech Stack

- NestJS
- GraphQL
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt (password hashing)

---

## 📂 Project Structure

This backend exists inside:

front-end-challenge/
└── slooze-backend/

The frontend assignment repository remains untouched.  
This folder contains the complete backend implementation.

---

# ⚙️ Setup Instructions

## 1️⃣ Install Dependencies

```bash
cd slooze-backend
npm install
```

---

## 2️⃣ Setup Environment Variables

Create a `.env` file inside `slooze-backend`:

```env
DATABASE_URL="your_postgres_connection_string"
JWT_SECRET="your_secret_key"
PORT=4000
```

---

## 3️⃣ Run Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

---

## 4️⃣ Start Server

```bash
npm run start:dev
```

GraphQL Playground will be available at:

```
http://localhost:4000/graphql
```

---

# 🔐 Authentication Flow

## 1️⃣ Register Users

### Register Manager

```graphql
mutation {
  register(
    name: "Manager"
    email: "manager@slooze.com"
    password: "123456"
    role: MANAGER
  )
}
```

### Register Store Keeper

```graphql
mutation {
  register(
    name: "Store User"
    email: "store@slooze.com"
    password: "12345678"
    role: STORE_KEEPER
  )
}
```

---

## 2️⃣ Login

### Login as Manager

```graphql
mutation {
  login(
    email: "manager@slooze.com"
    password: "123456"
  )
}
```

### Login as Store Keeper

```graphql
mutation {
  login(
    email: "store@slooze.com"
    password: "12345678"
  )
}
```

You will receive:

```json
{
  "data": "JWT_TOKEN"
}
```

---

# 🔑 Using Authorization Header

In GraphQL Playground:

Click **HTTP HEADERS** (bottom-left) and paste:

```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```

Replace with your actual token.

All protected routes require this header.

---

# 📦 Product Management

Both **MANAGER** and **STORE_KEEPER** can:

- Create Product
- Update Product
- Delete Product
- View Products

---

## ➕ Create Product

```graphql
mutation {
  createProduct(
    input: {
      name: "Rice"
      description: "Basmati"
      price: 50
      quantity: 100
    }
  ) {
    id
    name
    price
    quantity
  }
}
```

---

## ✏️ Update Product

```graphql
mutation {
  updateProduct(
    id: "PRODUCT_ID"
    input: {
      price: 60
    }
  ) {
    id
    price
  }
}
```

---

## ❌ Delete Product

```graphql
mutation {
  deleteProduct(id: "PRODUCT_ID") {
    id
    name
  }
}
```

---

## 📋 Get All Products

```graphql
query {
  products {
    id
    name
    price
    quantity
  }
}
```

---

# 📊 Dashboard (Manager Only)

Accessible only by users with role `MANAGER`.

```graphql
query {
  dashboard {
    totalProducts
    totalQuantity
    totalInventoryValue
  }
}
```

If a Store Keeper tries to access this endpoint:

```
Forbidden resource
```

---

# 🔒 Role-Based Access Control

| Feature | Manager | Store Keeper |
|----------|----------|--------------|
| Create Product | ✅ | ✅ |
| Update Product | ✅ | ✅ |
| Delete Product | ✅ | ✅ |
| View Products | ✅ | ✅ |
| Dashboard | ✅ | ❌ |

---

# 🛡 Security Features

- Passwords hashed using bcrypt
- JWT-based authentication
- Role stored inside JWT
- Route-level role guards
- Protected GraphQL resolvers

---

# ❗ Error Handling

Common errors:

- Invalid credentials → `Unauthorized`
- Missing token → `Unauthorized`
- Accessing Manager route as Store Keeper → `Forbidden`
- Invalid product ID → Prisma error

---

# ✅ Backend Status

✔ Authentication  
✔ JWT Protection  
✔ Role-Based Access  
✔ Product CRUD  
✔ Manager Dashboard  
✔ GraphQL API  

Backend is fully functional and ready to integrate with frontend.

---

# 🎯 Summary

This backend implements:

- Secure login system
- Role-based authorization
- Fully protected product management
- Manager-only analytics dashboard
- Clean GraphQL API structure

The backend is complete and production-structured for the assignment requirements.
