# Expense Tracker App

A full-stack Expense Tracker application built with React (Vite) and Node.js (Express, MongoDB). Effortlessly manage, track, and edit your daily expenses with a beautiful, responsive UI and a robust backend.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [1. Prerequisites](#1-prerequisites)
  - [2. Clone the Repository](#2-clone-the-repository)
  - [3. Backend Setup (server)](#3-backend-setup-server)
  - [4. Frontend Setup (client)](#4-frontend-setup-client)
  - [5. Running the Application](#5-running-the-application)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
---

## Features

- Add, edit, and delete your expenses.
- View a list of all expenses with title, amount, description, and date.
- Instant updates with a seamless user experience.
- Responsive design using Tailwind CSS.
- Backend REST API with validation and error handling.
- MongoDB for persistent storage.

---



## Project Structure

```
Expense-Tracker-App/
│
├── client/   # React frontend (Vite)
│
└── server/   # Node.js backend (Express, MongoDB)
```

---

## Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) database (local or Atlas cloud)

---

### 2. Clone the Repository

```bash
git clone https://github.com/VidhitSikri/Expense-Tracker-App.git
cd Expense-Tracker-App
```

---

### 3. Backend Setup (`server`)

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
```

**Variables:**
- `PORT`: The port for the backend server (default: 3000)
- `MONGO_URL`: MongoDB connection string (e.g., from MongoDB Atlas or local MongoDB)

Start the backend server:

```bash
npm start
# or
node app.js
```

---

### 4. Frontend Setup (`client`)

```bash
cd ../client
npm install
```

Start the React frontend (Vite):

```bash
npm run dev
```

The app will run at [http://localhost:5173](http://localhost:5173) (default Vite port).

---

### 5. Running the Application

- **Backend**: [http://localhost:3000](http://localhost:3000)
- **Frontend**: [http://localhost:5173](http://localhost:5173)

Open the frontend URL in your browser. All API requests are proxied to the backend (`http://localhost:3000/api`).

---

## API Endpoints

Base URL: `http://localhost:3000/api`

### **Expenses**

| Method | Endpoint            | Description            | Body (JSON)                             |
|--------|---------------------|------------------------|-----------------------------------------|
| GET    | `/expenses`         | Get all expenses       | —                                       |
| POST   | `/expenses`         | Add new expense        | `{ title, amount, description? }`       |
| PUT    | `/expenses/:id`     | Update an expense      | `{ title?, amount?, description? }`     |
| DELETE | `/expenses/:id`     | Delete an expense      | —                                       |

#### **Request/Response Examples**

- **Add Expense**
  - `POST /api/expenses`
  - Body:
    ```json
    {
      "title": "Groceries",
      "amount": 1000,
      "description": "Weekly supplies"
    }
    ```
- **Update Expense**
  - `PUT /api/expenses/60f1b8...`
  - Body:
    ```json
    {
      "title": "Dinner",
      "amount": 800
    }
    ```

#### **Validation**
- `title`: required (string)
- `amount`: required (number)
- `description`: optional (string)
- Returns errors as `{ errors: [ ... ] }` if validation fails.

---

## Environment Variables

**Backend (`server/.env`):**
- `PORT` - Port for the Express server (default: 3000)
- `MONGO_URL` - MongoDB connection URI

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose, express-validator
- **Dev Tools:** ESLint, Prettier

---

## Contributing

1. Fork this repository.
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a pull request.

---


---

## Author

[Vidhit Sikri](https://github.com/VidhitSikri)
