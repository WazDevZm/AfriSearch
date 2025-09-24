# Afrisearch Project

This guide explains how to set up and run both the backend and frontend for the Afrisearch MVP.

---

## Prerequisites
- **Node.js** (v16 or higher recommended)
- **npm** (comes with Node.js)

---

## 1. Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd afrisearch/backend
   ```
2. **Install backend dependencies:**
   ```bash
   npm install
   ```
3. **Check environment variables:**
   - The `.env` file should exist with:
     ```env
     MONGODB_URI=mongodb://localhost:27017/afrisearch
     ELASTICSEARCH_URL=http://localhost:9200
     REDIS_URL=redis://localhost:6379
     PORT=5000
     ```
   - For MVP/demo, the backend will run with mock search results even if these services are not running.
4. **Start the backend server:**
   ```bash
   npm start
   ```
   The backend runs at [http://localhost:5000](http://localhost:5000)

---

## 2. Frontend Setup

1. **Open a new terminal and navigate to the frontend directory:**
   ```bash
   cd afrisearch/frontend
   ```
2. **Install frontend dependencies:**
   ```bash
   npm install
   ```
3. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   The frontend runs at [http://localhost:3000](http://localhost:3000)

---

## 3. Using the App

- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Enter any search query and submit.
- You will see mock results returned from the backend.

---

## Project Structure
- `afrisearch/backend/` — Node.js/Express backend API
- `afrisearch/frontend/` — Next.js + Tailwind CSS frontend

---

## Notes
- The backend `/api/search` endpoint currently returns mock data for all queries.
- You can customize the backend and frontend logic as needed for your MVP or production use.

---

© Afrisearch, 2025
