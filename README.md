# AI Study Assistant

An intelligent web-based study assistant designed to help students organize their learning, manage study resources, take quizzes, track progress, and eventually interact with AI-powered learning features.

This project is currently under active development as a deployment project.

## 🚀 Current Project Status

The current version includes a working React frontend connected to a Flask backend with PostgreSQL/Supabase database integration and JWT-based authentication.

### Implemented

* React frontend
* Flask backend
* REST API development
* PostgreSQL database
* Supabase PostgreSQL integration
* SQLAlchemy ORM
* User registration
* User login
* Password hashing
* JWT access-token authentication
* Protected API endpoint
* React authentication context
* Local storage authentication state
* Frontend ↔ backend integration
* Responsive authentication UI
* Dashboard and study-related frontend pages

### Currently Available Frontend Pages

* Login
* Register
* Dashboard
* Subjects
* Subject Details
* Study Assistant
* Quizzes
* Quiz
* Quiz Result
* Progress
* Profile

## 🏗️ Project Architecture

```text
AI Study Assistant
│
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
│
├── backend/                  # Flask REST API
│   ├── app/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── models.py
│   │   └── routes.py
│   ├── run.py
│   └── requirements.txt
│
├── docker/                   # Docker configuration
├── nginx/                    # Nginx configuration
├── .github/                  # GitHub configuration
├── .gitignore
└── README.md
```

## 🛠️ Technology Stack

### Frontend

* React
* Vite
* React Router
* JavaScript
* CSS
* Lucide React

### Backend

* Python
* Flask
* Flask-CORS
* Flask-SQLAlchemy
* Flask-JWT-Extended
* Werkzeug

### Database

* PostgreSQL
* Supabase
* SQLAlchemy

### Authentication

* JWT access tokens
* Password hashing
* Protected API routes
* React authentication context
* Browser local storage

## 🔐 Authentication Flow

The current authentication flow works as follows:

```text
React Login Page
       ↓
POST /api/auth/login
       ↓
Flask Backend
       ↓
PostgreSQL / Supabase
       ↓
Validate User Credentials
       ↓
Generate JWT Access Token
       ↓
React AuthContext
       ↓
Store Token in localStorage
       ↓
Access Protected Pages / APIs
```

## 🔌 Current API Endpoints

### Health Check

```http
GET /api/health
```

Returns the current backend health status.

### Register

```http
POST /api/auth/register
```

Example request:

```json
{
  "name": "Test Student",
  "email": "student@example.com",
  "password": "password123"
}
```

### Login

```http
POST /api/auth/login
```

Example request:

```json
{
  "email": "student@example.com",
  "password": "password123"
}
```

The endpoint returns a JWT access token after successful authentication.

### Current User

```http
GET /api/auth/me
```

Requires:

```http
Authorization: Bearer <access_token>
```

Returns the authenticated user's information.

## 💻 Running the Project Locally

### Backend

Navigate to the backend directory:

```bash
cd backend
```

Activate the Python virtual environment.

On Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Run the Flask application:

```bash
python run.py
```

The backend runs at:

```text
http://127.0.0.1:5000
```

### Frontend

Open another terminal and navigate to:

```bash
cd frontend
```

Install dependencies if required:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at the URL shown by Vite in the terminal.

## 🔑 Environment Variables

The backend uses environment variables for configuration.

Example:

```env
FLASK_DEBUG=True
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
DATABASE_URL=your-postgresql-database-url
```

**Important:** Never commit the actual `.env` file, database password, JWT secret, or other private credentials to GitHub.

The `.gitignore` file is configured to exclude `.env`.

## 📊 Database

The project currently uses PostgreSQL through Supabase.

The initial implemented database model is the `User` model.

### User

```text
id
name
email
password_hash
created_at
```

Passwords are stored as hashes rather than plain text.

## 🧪 Current Testing

The following functionality has been tested successfully:

* Backend starts successfully
* PostgreSQL/Supabase connection works
* User registration works
* Duplicate email validation works
* User login works
* JWT access token is generated
* Protected `/api/auth/me` endpoint works
* React frontend communicates with Flask backend
* Successful login redirects the user to the dashboard

## 🔄 Current Development Progress

```text
Frontend
   ✅ React UI
   ✅ Routing
   ✅ Login/Register
   ✅ Dashboard
   ✅ Study pages
   ✅ Quiz pages
   ✅ Progress/Profile pages

Backend
   ✅ Flask
   ✅ REST APIs
   ✅ PostgreSQL connection
   ✅ SQLAlchemy
   ✅ User model
   ✅ Registration
   ✅ Login
   ✅ JWT access authentication
   ✅ Protected API

AI Features
   ⬜ AI API integration
   ⬜ RAG
   ⬜ LangChain
   ⬜ LangGraph

Deployment
   ⬜ VPS deployment
   ⬜ Nginx configuration
   ⬜ Domain/DNS configuration
   ⬜ Production configuration
   ⬜ GitHub Actions / CI/CD
```

## 🗺️ Future Development

The next stages of development will include:

1. Complete authentication architecture with refresh tokens.
2. Connect the remaining frontend modules to backend APIs.
3. Implement study-material management.
4. Implement quiz data and result storage.
5. Implement progress tracking.
6. Integrate a third-party AI/LLM API.
7. Add AI-powered study assistance.
8. Implement RAG for study materials.
9. Explore LangChain for AI workflows.
10. Explore LangGraph for multi-step AI workflows.
11. Containerize the application for production.
12. Deploy the application to a VPS.
13. Configure Nginx as a reverse proxy.
14. Configure domain and DNS.
15. Create GitHub Actions CI/CD workflows.

## 📌 Development Note

This repository represents the current working development stage of the AI Study Assistant. Features listed under future development are planned and are not yet considered production-ready.

## 👩‍💻 Project

**AI Study Assistant**

Built as a deployment-focused full-stack application using React, Flask, PostgreSQL/Supabase, and JWT authentication.
