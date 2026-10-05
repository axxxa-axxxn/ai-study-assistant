import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AIStudyAssistant from "./pages/AIStudyAssistant";

import Subjects from "./pages/Subjects";
import SubjectDetails from "./pages/SubjectDetails";

import Quizzes from "./pages/Quizzes";
import Quiz from "./pages/Quiz";
import QuizResult from "./pages/QuizResult";

import Progress from "./pages/Progress";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==================== DEFAULT ==================== */}

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />


        {/* ==================== AUTHENTICATION ==================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ==================== DASHBOARD ==================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* ==================== AI STUDY ASSISTANT ==================== */}

        <Route
          path="/ai-assistant"
          element={
            <ProtectedRoute>
              <AIStudyAssistant />
            </ProtectedRoute>
          }
        />


        {/* ==================== SUBJECTS ==================== */}

        <Route
          path="/subjects"
          element={
            <ProtectedRoute>
              <Subjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subjects/:subjectId"
          element={
            <ProtectedRoute>
              <SubjectDetails />
            </ProtectedRoute>
          }
        />


        {/* ==================== QUIZZES ==================== */}

        <Route
          path="/quizzes"
          element={
            <ProtectedRoute>
              <Quizzes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz/:quizId"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz/:quizId/result"
          element={
            <ProtectedRoute>
              <QuizResult />
            </ProtectedRoute>
          }
        />


        {/* ==================== PROGRESS ==================== */}

        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          }
        />


        {/* ==================== PROFILE ==================== */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


        {/* ==================== UNKNOWN ROUTE ==================== */}

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;