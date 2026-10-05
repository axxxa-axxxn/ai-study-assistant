import { useNavigate } from "react-router-dom";
import {
  Home,
  Bot,
  BookOpen,
  ClipboardList,
  BarChart3,
  User,
  LogOut,
  ArrowLeft,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const studentName =
    user?.name ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "Student";

  const email = user?.email || "student@example.com";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-gray-200 bg-white lg:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-20 items-center border-b border-gray-100 px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <BookOpen size={21} />
              </div>

              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  StudyAI
                </h1>

                <p className="text-xs text-gray-500">
                  Study smarter
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-4 py-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-600 transition hover:bg-gray-50 hover:text-indigo-600"
            >
              <Home size={20} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigate("/ai-assistant")}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-600 transition hover:bg-gray-50 hover:text-indigo-600"
            >
              <Bot size={20} />
              <span>AI Assistant</span>
            </button>

            <button
              onClick={() => navigate("/subjects")}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-600 transition hover:bg-gray-50 hover:text-indigo-600"
            >
              <BookOpen size={20} />
              <span>Subjects</span>
            </button>

            <button
              onClick={() => navigate("/quizzes")}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-600 transition hover:bg-gray-50 hover:text-indigo-600"
            >
              <ClipboardList size={20} />
              <span>Quizzes</span>
            </button>

            <button
              onClick={() => navigate("/progress")}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-600 transition hover:bg-gray-50 hover:text-indigo-600"
            >
              <BarChart3 size={20} />
              <span>Progress</span>
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="flex w-full items-center gap-3 rounded-xl bg-indigo-50 px-4 py-3 font-medium text-indigo-600"
            >
              <User size={20} />
              <span>Profile</span>
            </button>
          </nav>

          {/* Logout */}
          <div className="border-t border-gray-100 p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-600 transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-64">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="flex h-20 items-center px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => navigate("/dashboard")}
              className="mr-4 rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            >
              <ArrowLeft size={21} />
            </button>

            <div>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Profile
              </h2>

              <p className="text-sm text-gray-500">
                Manage your student profile
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Profile card */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Banner */}
            <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600" />

            {/* User information */}
            <div className="px-6 pb-8 sm:px-8">
              <div className="-mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-indigo-100 text-3xl font-bold text-indigo-600 shadow-sm">
                  {studentName.charAt(0).toUpperCase()}
                </div>

                <div className="pb-1">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {studentName}
                  </h1>

                  <p className="text-sm text-gray-500">
                    Student
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900">
                  Personal Information
                </h3>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Full Name
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {studentName}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Email
                    </p>

                    <p className="mt-1 break-all font-semibold text-gray-900">
                      {email}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Account Type
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      Student
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Learning Platform
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      AI Study Assistant
                    </p>
                  </div>
                </div>
              </div>

              {/* Study statistics */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900">
                  Study Statistics
                </h3>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-gray-100 p-4">
                    <p className="text-sm text-gray-500">
                      Subjects
                    </p>

                    <p className="mt-1 text-2xl font-bold text-gray-900">
                      3
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-100 p-4">
                    <p className="text-sm text-gray-500">
                      Quizzes
                    </p>

                    <p className="mt-1 text-2xl font-bold text-gray-900">
                      12
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-100 p-4">
                    <p className="text-sm text-gray-500">
                      Study Hours
                    </p>

                    <p className="mt-1 text-2xl font-bold text-gray-900">
                      28.5
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
                >
                  Back to Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;