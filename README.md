#Demo Link
https://project-todo-phi.vercel.app/


# Todo List Application

A simple todo list application built with the MERN stack. This project demonstrates the use of Redux Toolkit for state management, Zod for validation, Axios for API requests, JWT for authentication, and bcryptjs for password encryption. The frontend uses Vite for fast development and Tailwind CSS for styling.

## Features

- **User Authentication**: Secure login and registration with JWT and password encryption using bcryptjs.
- **State Management**: Efficient state management using Redux Toolkit.
- **Validation**: Form validation with Zod.
- **Responsive Design**: Styled with Tailwind CSS for a modern and responsive UI.
- **Fast Development**: Leveraging Vite for a speedy development experience.

## Tech Stack

- **Frontend**:
  - React
  - Vite
  - Tailwind CSS
  - Redux Toolkit
  - Axios
  - React Icons

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JWT (JSON Web Tokens)
  - bcryptjs

## Getting Started

### Prerequisites

- Node.js (>=16.x.x)
- npm or Yarn


## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/todo-app.git
    cd todo-app
    ```

2. **Install dependencies for the frontend**:

    ```bash
    cd frontend
    npm install
    ```

3. **Install dependencies for the backend**:

    ```bash
    cd ../backend
    npm install
    ```

### Configuration

1. **Create a `.env` file in the `backend` directory** and add the following environment variables:

    ```env
    MONGO_URI=mongodb://localhost:27017/yourdbname
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

2. **Create a `.env` file in the `frontend` directory** (if needed) to configure environment variables for the frontend.

### Running the Application

1. **Start the backend server**:

    ```bash
    cd backend
    npm run dev
    ```

2. **Start the frontend development server**:

    ```bash
    cd ../frontend
    npm run dev
    ```

### Building for Production

1. **Build the frontend application**:

    ```bash
    cd frontend
    npm run build
    ```

2. **Start the production server** (you may need to serve the built frontend with the backend or use a static file server):

    ```bash
    npm run preview
    ```

### API Endpoints

- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Authenticate a user and get a JWT.
- **GET /api/todos**: Get all todos.
- **POST /api/todos**: Create a new todo.
- **PUT /api/todos/:id**: Update a todo.
- **DELETE /api/todos/:id**: Delete a todo.

### Contributing

Feel free to open issues or submit pull requests to contribute to the project.

