![Grey Youtube Tumbnail Travel](https://github.com/user-attachments/assets/b71b46d9-086d-4b5a-89cc-dcb62dfa043f)
# Employee Shift Tracker Web Application

## Overview
The **Employee Shift Management Web Application** allows employees to log in, track their working hours, record their check-in/check-out times, and manage breaks during their shift. It uses browser geolocation to track the employee's location during check-in and check-out. The application also features a dashboard for employees to see their current shift status and total hours worked.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Geolocation**: Browser's Geolocation API
- **Additional Libraries**: 
  - Axios for HTTP requests
  - Tailwind CSS for styling
  - Google Maps or Leaflet for map preview 
  
## Key Features

### 1. Authentication System
- **Employee login** using JWT-based authentication.
- Optional **registration** functionality for new employees.
  
### 2. Shift Management
- **Start Shift**: Records the start time and geolocation.
- **Pause Shift**: Allows for lunch breaks and short breaks.
- **Resume Shift**: Resumes the shift after a break.
- **End Shift**: Records the end time and geolocation.
- **Total Hours Worked**: Displays total hours worked for the current day, excluding break time.

### 3. Location Tracking
- Tracks **geolocation** (latitude & longitude) at:
  - Check-In
  - Check-Out
  
### 4. Dashboard
- Displays the **current shift status** (e.g., Working, Not Working).
- Shows **total hours worked** for the current day.
- **Shift history** for past shifts .
  

### 6. Bonus Features 
- **Responsive design** to support both mobile and desktop devices.
- **Map preview** of employee location using Google Maps or Leaflet.
- **Email notifications** for forget Password.
- Employee shift **statistics**: weekly/monthly total hours worked.
- Comprehensive **error handling** and **form validation**.

## Getting Started

### Prerequisites
- Node.js installed on your local machine.
- MongoDB set up (local or MongoDB Atlas).
- A modern web browser for geolocation functionality.

### Installation

1. **Frontend**:
    - Navigate to the `client` directory.
    - Install dependencies:
      ```bash
      cd client
      npm install
      ```
    - Start the React development server:
      ```bash
      npm run dev
      ```

2. **Backend**:
    - Navigate to the `server` directory.
    - Install dependencies:
      ```bash
      cd server
      npm install
      ```
    - Start the backend server:
      ```bash
      npm run server
      ```


### Environment Variables
The application uses the following environment variables:
- `MONGODB_URI`: MongoDB connection URI.
- `JWT_SECRET`: Secret key for JWT authentication.


### Running the Application
After installing dependencies, the application can be run locally:
1. Start the **backend** (Node.js Express server).
2. Start the **frontend** (React development server).
3. Open your browser and navigate to `http://localhost:3000` to view the app.


   
## 🚀 Live Demo

Check out the live demo of the project hosted on Netlify:

🔗 [View Live Demo](https://profound-daifuku-b10d06.netlify.app/)


## 📁 Folder Structure

```bash
employee-shift-Management/
├── client/                         # Frontend (React + Vite + Tailwind)
│   ├── public/                     # Public assets
│   └── src/                        # Main source code
│       ├── assets/                 # Images, icons, and other static assets
│       ├── components/             # Reusable UI components
│       │   ├── dashboardComponents/
│       │   │   ├── loader/         # Loader spinner component
│       │   │   │   ├── Loader.jsx
│       │   │   │   └── Loader.css
│       │   │   ├── DashboardReader.jsx
│       │   │   ├── HourToday.jsx
│       │   │   ├── LocationLog.jsx
│       │   │   ├── MapDisplay.jsx
│       │   │   ├── MapSection.jsx
│       │   │   ├── MonthlyReport.jsx
│       │   │   ├── ShiftStatus.jsx
│       │   │   └── location/
│       │   │       └── CheckLocationButtons.jsx
│       │   └── Panel/              # Admin/User Panel components
│       │       ├── AllUser.jsx
│       │       ├── Monthly.jsx
│       │       ├── MyShift.jsx
│       │       ├── ProfileSetting.jsx
│       │       ├── ShiftDetails.jsx
│       │       └── ShiftOperation.jsx
│       ├── context/                # Global context using React Context API
│       │   └── AppContext.jsx
│       ├── pages/                  # Application pages/routes
│       │   ├── Dashboard.jsx
│       │   ├── EmailVerify.jsx
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   └── ResetPassword.jsx
│       ├── Header.jsx              # Top navigation bar
│       ├── Navbar.jsx              # Side navigation menu
│       ├── Sidebar.jsx             # Sidebar for dashboard
│       ├── App.jsx                 # Main React component
│       ├── main.jsx                # App entry point
│       ├── index.css               # Global styles (Tailwind CSS)
├── .env                            # Environment variables for frontend
├── tailwind.config.js              # Tailwind CSS configuration
├── vite.config.js                  # Vite build configuration
├── package.json                    # Frontend dependencies
└── README.md

server/                             # Backend (Node.js + Express + MongoDB)
├── config/                         # Configuration files
│   ├── mongodb.js                  # MongoDB connection setup
│   └── nodemailer.js               # Email service setup
├── controllers/                    # Business logic for routes
│   ├── authController.js
│   ├── locationController.js
│   ├── shiftController.js
│   └── userController.js
├── middleware/                     # Custom middleware (e.g., authentication)
│   └── userAuth.js
├── models/                         # Mongoose models
│   ├── locationLog.js
│   ├── shiftModel.js
│   └── userModel.js
├── routes/                         # API routes
│   ├── authRoutes.js
│   ├── locationRoutes.js
│   ├── shiftRoutes.js
│   └── userRoutes.js
├── .env                            # Backend environment variables
├── server.js                       # Entry point of the server
├── package.json                    # Backend dependencies
└── README.md
```




