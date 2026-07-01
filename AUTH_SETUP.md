# MongoDB Authentication Setup

## 1. Configure the backend

Copy `backend/.env.example` to `backend/.env` and update these values:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio_auth
CLIENT_URL=http://localhost:5173
ADMIN_NAME=Portfolio Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change-this-admin-password
```

For MongoDB Atlas, put the Atlas connection string in `MONGODB_URI`.

The admin account is created automatically on the first backend startup. Public registration always creates a `user` account and cannot create an admin.

## 2. Start the backend

```powershell
cd backend
npm install
npm run dev
```

The API runs at `http://localhost:5000`.

## 3. Start the frontend

In another terminal:

```powershell
cd frontend
npm run dev
```

Open `http://localhost:5173/login`.

## Routes

- `/register`: create a user account
- `/login`: choose user or admin login
- `/dashboard/user`: protected user dashboard
- `/dashboard/admin`: protected admin dashboard

Passwords are hashed with Node's `scrypt` and never stored as plain text. Authentication uses a random HTTP-only session cookie; only its SHA-256 hash is stored in MongoDB. Backend role checks protect both dashboard APIs.
