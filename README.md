# Scalable MERN Stack Application

A premium, scalable web application featuring secure authentication, a user dashboard, and task management capabilities, built with the MERN stack (MongoDB, Express, React, Node.js) and Tailwind CSS.

## Features

- **Authentication**: Secure Signup & Login with JWT and Bcrypt.
- **Dashboard**: Interactive task management with animations.
- **Task Management**: Create, Read, Update, and Delete (CRUD) tasks.
- **Search & Filter**: Real-time filtering and searching of tasks.
- **Profile**: View user profile details.
- **Responsive Design**: Fully responsive UI driven by Tailwind CSS.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide React, Axios.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, BcryptJS.

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (Local or Atlas URI)

### Installation

1.  **Clone the repository** (if applicable)
2.  **Install Backend Dependencies**:
    ```bash
    cd server
    npm install
    ```
3.  **Install Frontend Dependencies**:
    ```bash
    cd client
    npm install
    ```

### Configuration

1.  **Backend Environment**:
    Create `server/.env` and add:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    ```

### Running the Application

1.  **Start Backend**:
    ```bash
    cd server
    npm run dev
    ```
    (Server runs on http://localhost:5000)

2.  **Start Frontend**:
    ```bash
    cd client
    npm run dev
    ```
    (Client runs on http://localhost:5173)

3.  Open http://localhost:5173 to view the app.
