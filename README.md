# 📌 **README.md (complete & ready to use)**

```md
# 🌾 AgriVault – Digital Farm Receipts Platform  
A full-stack web application for farmers, warehouses, banks, and traders to manage **digital warehouse receipts**, **commodity storage**, **loans**, and **marketplace trading**.

Built using:

- **React + TypeScript + Vite** (frontend)
- **Node.js + Express + TypeScript** (backend)
- **MongoDB + Mongoose** (database)
- **JWT Authentication**
- **ShadCN UI + TailwindCSS**

---

## 🚀 Features

### 👤 Multi-role System (Authentication)
Users can create accounts and login using:

- **Farmer**
- **Warehouse Operator**
- **Bank**
- **Trader**

Auth includes:
- Register with name + mobile + password + role
- Login using mobile + password
- JWT-based authentication
- Role-based redirection (dashboards)

---

### 📄 Digital Warehouse Receipts
Farmers can:

- Create digital receipts for stored commodities  
- View their own receipts  
- Track status (`stored`, `pledged`, `sold`, etc.)

Backend automatically links receipts → farmer account via `farmerId`.

---

### 🏦 Bank Integration
Banks can:

- View pledged receipts  
- Initiate loan approvals (coming next)

---

### 🏭 Warehouse Integration
Warehouse operators can:

- Create intake entries
- Approve or update stored goods

---

### 📈 Trader Marketplace
Traders can:

- Browse receipts available for sale
- Initiate buying/selling flows

---

## 🗂 Project Structure

```

agrivault-digital-farm/
│
├── backend/              # Express + MongoDB API
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── dist/             # Compiled JS
│   ├── server.ts
│   └── package.json
│
├── src/                  # React + TS frontend
│   ├── pages/
│   ├── components/
│   ├── assets/
│   └── App.tsx
│
├── public/               # Static files (favicon, etc.)
├── package.json
└── README.md

````

---

# 🛠 Backend Setup

## 1️⃣ Install dependencies

```bash
cd backend
npm install
````

## 2️⃣ Create `.env`

Inside `backend/.env`:

```
MONGO_URI=mongodb://127.0.0.1:27017/agrivault
JWT_SECRET=supersecretdevkey123
PORT=4000
```

## 3️⃣ Build backend

```bash
npm run build
```

## 4️⃣ Start backend

```bash
npm start
```

Backend runs on:

```
http://localhost:4000
```

---

# 🖥 Frontend Setup

```bash
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:8080
```

---

# 📡 API Endpoints

## 🔐 Authentication

### Register

```
POST /api/auth/register
```

Body:

```json
{
  "name": "Affan",
  "mobile": "9999999999",
  "password": "1234",
  "role": "farmer",
  "village": "X",
  "district": "Y"
}
```

### Login

```
POST /api/auth/login
```

Body:

```json
{
  "mobile": "9999999999",
  "password": "1234"
}
```

Returns JWT.

---

## 📄 Receipts

### Get All Receipts (public)

```
GET /api/receipts
```

### Create Receipt (auth required)

```
POST /api/receipts
```

Headers:

```
Authorization: Bearer <token>
```

---

# 📦 Database Guide (MongoDB)

### Open shell:

```
mongosh
use agrivault
```

### View users

```
db.users.find().pretty()
```

### View receipts

```
db.receipts.find().pretty()
```

### Delete a user

```
db.users.deleteOne({ mobile: "9999999999" })
```

---

# 🌐 Deployment (coming soon)

I'll help you deploy when you're ready:

* **Render / Railway** for backend
* **Vercel / Netlify** for frontend
* **MongoDB Atlas** for database

---

# 🤝 Contributing

Pull requests are welcome.
For major changes, open an issue first.

---

# 📝 License

MIT License © 2025 Affan Malik

```

---

## 👍 Done!

### Your README is now:
- clean
- professional
- matches your exact backend + frontend
- GitHub-friendly
- deploy-ready

If you want, I can also create:

✔ `.env.example`  
✔ full API documentation  
✔ database schema diagrams  
✔ postman collection  
✔ deployment instructions  

Just tell me!
```
