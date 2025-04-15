# 🚀 Project Name

A full-stack web application built with **React.js (Vite)** for the frontend and **Laravel** for the backend.

---

## 📁 Project Structure


**Developer Info
This project is Created by Dhrubajit Das
Design inspired by multiple website
coding is fully unique and Developed by Dhrubajit Das


**Requirements

---

## 🔧 Tech Stack

- Frontend: React.js, Vite, Axios, react icons etc
- Backend: Laravel (version), RESTful API, MySQL
- Authentication: Laravel Passport (if used)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

cd backend

# Install dependencies
composer install

# Copy .env and generate key
cp .env.example .env
php artisan key:generate

# Set DB credentials in .env
# Run migrations
php artisan migrate

# (Optional) Seed data
php artisan db:seed

# Start Laravel server
php artisan serve


cd frontend

# Install dependencies
npm install

# Start frontend dev server
npm run dev

DB_DATABASE=your_db
DB_USERNAME=your_user
DB_PASSWORD=your_password

VITE_API_BASE_URL=http://localhost:8000/api


