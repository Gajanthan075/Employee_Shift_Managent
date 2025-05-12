
![Grey Youtube Tumbnail Travel](https://github.com/user-attachments/assets/aa93afe2-4744-462b-9a47-b9392c2407a9)

# 🕒 # Employee_Shift_Managent Web Application

## 🚀 Overview

The **Employee Shift Tracker** is a full-stack web application that enables employees to manage and track their working hours efficiently. It features a login system, shift management (start, break, resume, end), geolocation-based tracking, and a real-time dashboard to monitor shift status and total hours worked.

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT-based
- **Hosting**: Frontend (Netlify), Backend (local Device)

---

## ✨ Features Implemented

### 1. 🔐 User Authentication System

- Secure **login** functionality with JWT.
- User credentials stored in MongoDB.
- Middleware for protected routes.

### 2. 🕓 Shift Management System

- **Start Shift**: Records start time and current GPS location.
- **Pause Shift**: Allows different types of breaks (e.g., Lunch, Short Break).
- **Resume Shift**: Resumes the shift after a break.
- **End Shift**: Records end time and location, then calculates total working time excluding breaks.
- Stores each shift’s timeline and duration in the database.

### 3. 📍 Location Tracking

- Automatically captures and stores **latitude and longitude** during:
  - Check-In (start)
  - Check-Out (end)

### 4. 📊 Employee Dashboard

- Displays:
  - **Current shift status** (Working, Not Working)
  - **Total hours worked today**
- Responsive design for mobile and desktop.

---

## 🔧 Setup & Installation

-Backend Setup-
-cd server
-npm install
-npm run server

-Frontend Setup-
-cd server
-npm install
-npm run dev

employee/
├── client/ # React frontend
├── server/ # Express backend
├── README.md
