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
      npm start
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


## Project Structure

