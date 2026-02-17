# Slooze Frontend

Frontend built with **React + TypeScript + Apollo Client + Tailwind CSS** for the take-home assignment.

Implements:

- User Registration & Login (JWT)
- Role-Based Access Control (MANAGER / STORE_KEEPER)
- Product CRUD
- Manager-Only Dashboard
- Protected Routes
- Responsive UI

---

## Tech Stack

- NextJs
- TypeScript
- Apollo Client (GraphQL)
- Tailwind CSS
- Context API
- JWT Authentication
- Session Storage

---

## 📂 Project Structure

```

front-end-challenge/
└── slooze-frontend/

````

This folder contains the complete frontend implementation.

---

# ⚙️ Setup

## 1️⃣ Install

```bash
cd slooze-frontend
npm install
````

## 2️⃣ Environment

Create `.env`:

```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
```

## 3️⃣ Run

```bash
npm run dev
```

App runs at:

```
http://localhost:3000
```

---

# 🔐 Authentication

* Users register as `MANAGER` or `STORE_KEEPER`
* Login returns JWT
* Token stored in localStorage
* Automatically sent in header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Protected routes require valid token.

---

# 📦 Product Management

Both **MANAGER** and **STORE_KEEPER** can:

* Create Product
* Update Product
* Delete Product
* View Products

Includes form validation, loading states, and error handling.

---

# 📊 Dashboard (Manager Only)

Accessible only to `MANAGER`.

Displays:

* Total Products
* Total Quantity
* Total Inventory Value

Store Keeper attempting access → **Access Denied**

---

# 🔒 Role Access

| Feature        | Manager | Store Keeper |
| -------------- | ------- | ------------ |
| Create Product | ✅       | ✅            |
| Update Product | ✅       | ✅            |
| Delete Product | ✅       | ✅            |
| View Products  | ✅       | ✅            |
| Dashboard      | ✅       | ❌            |

---

# ✅ Requirements Covered

✔ JWT Authentication
✔ Authorization Header
✔ Role-Based Access
✔ Protected Routes
✔ Product CRUD
✔ Manager Dashboard
✔ Responsive UI
✔ Proper Error Handling

Frontend is complete and aligned with assignment requirements.
