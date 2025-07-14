# Real-Time Collaborative Drawing App

![License](https://img.shields.io/badge/license-ISC-blue) ![Version](https://img.shields.io/badge/version-1.0.0-green)

## Overview

This project is a **Real-Time Collaborative Drawing App** that allows users to draw together on a shared canvas in real time. It features user authentication, room management, and interactive drawing tools, providing a seamless collaborative experience.

## Features

* **User Authentication**: Sign up and log in using JWT-based authentication.
* **Room Management**: Create new drawing rooms or join existing public rooms.
* **Real-Time Drawing**: Draw freehand strokes with Konva; all strokes are broadcast instantly to other participants via Socket.IO.
* **Form Handling & Validation**: Robust forms powered by React Hook Form and Yup.
* **State Management**: Application state managed with Redux Toolkit.
* **Responsive UI**: Styled with Tailwind CSS for a clean and adaptive interface.

## Tech Stack

### Frontend

* **React** & **Vite**
* **Redux Toolkit** for state management
* **React Router** for client-side routing
* **React-Konva** & **Konva** for canvas drawing
* **Socket.IO Client** for WebSocket communication
* **Axios** for HTTP requests
* **React Hook Form** for form handling
* **Tailwind CSS** for utility-first styling
* **Lucide React** for icons

### Backend

* **Node.js** & **Express**
* **Socket.IO** for real-time communication
* **MongoDB** with **Mongoose** ODM
* **JSON Web Tokens (JWT)** for authentication
* **bcrypt** for password hashing
* **CORS** & **dotenv** for environment configuration
* **Validator** for input validation

## Installation

### Prerequisites

* Node.js v18 or higher
* MongoDB (local or Atlas)
* npm (or Yarn)

### Backend Setup

```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create a .env file based on .env.example
# Example .env:
# PORT=3000
# MONGODB_URI=mongodb://localhost:27017/realtime-draw
# JWT_SECRET=your_jwt_secret

# Start the backend server
npm start
```

### Frontend Setup

```bash
# Navigate to the client directory
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open your browser and visit `http://localhost:5173` to access the app.

## Folder Structure

```
project-root/
├── server/           # Express backend
│   ├── controllers/  # Route handlers
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API endpoints
│   ├── socket.js     # Socket.IO setup
│   ├── index.js      # Server entry point
│   └── utils.js/     # Error handling & helpers
└── client/           # React frontend
    ├── public/       # Static assets
    ├── src/
    │   ├── api/      # Axios instance
    │   ├── app/      # Redux store & hooks
    │   ├── components/ # UI components
    │   ├── context/  # Socket context
    │   ├── features/ # Redux slices
    │   ├── layout/   # Layout components
    │   ├── pages/    # Page views
    │   ├── routes/   # React Router setup
    │   └── service/  # API service functions
    └── vite.config.js
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for bug fixes and enhancements.

## License

This project is licensed under the ISC License. Feel free to use and modify it freely.
