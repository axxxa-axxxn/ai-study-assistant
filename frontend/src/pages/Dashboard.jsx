import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Home,
  Bot,
  BookOpen,
  ClipboardList,
  BarChart3,
  User,
  LogOut,
  Menu,
  X,
  Bell,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const studentName =
    user?.name ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "Student";

  // --------------------------------------------------
  // Dummy frontend data
  // --------------------------------------------------

  const subjects = [
    {
      name: "Computer Organization & Assembly Language",
      shortName: "COAL",
      progress: 78,
      topics: "12 / 15 topics",
    },
    {
      name: "Information & Communication Technology",
      shortName: "ICT",
      progress: 65,
      topics: "10 / 15 topics",
    },
    {
      name: "Programming Fundamentals",
      shortName: "PF",
      progress: 52,
      topics: "8 / 15 topics",
    },
  ];

  const recentActivity = [
    {
      title: "COAL - Memory Organization",
      type: "Study Session",
      time: "Today, 10:30 AM",
    },
    {
      title: "ICT - Networking Basics",
      type: "Quiz Completed",
      time: "Yesterday, 4:15 PM",
    },
    {
      title: "PF - Functions",
      type: "Study Session",
      time: "Yesterday, 11:20 AM",
    },
  ];

  const quizzes = [
    {
      title: "COAL Chapter 3 Quiz",
      questions: 15,
      score: "85%",
    },
    {
      title: "ICT Networking Quiz",
      questions: 20,
      score: "78%",
    },
  ];

  // --------------------------------------------------
  // Sidebar navigation
  // --------------------------------------------------

  const navigation = [
    {
      name: "Dashboard",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "AI Study Assistant",
      icon: Bot,
      path: "/ai-assistant",
    },
    {
      name: "Subjects",
      icon: BookOpen,
      path: "/subjects",
    },
    {
      name: "Quizzes",
      icon: ClipboardList,
      path: "/quizzes",
    },
    {
      name: "Progress",
      icon: BarChart3,
      path: "/progress",
    },
    {
      name: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  // --------------------------------------------------
  // Navigation handler
  // --------------------------------------------------

  const handleNavigation = (path) => {
    setSidebarOpen(false);
    navigate(path);
  };

  // --------------------------------------------------
  // Logout
  // --------------------------------------------------

  const handleLogout = () => {
    setSidebarOpen(false);
    logout();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* ==================================================
          MOBILE OVERLAY
      ================================================== */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Bot size={25} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                AI Study
              </h1>

              <p className="text-xs text-slate-500">
                Assistant
              </p>
            </div>
          </div>

          {/* Mobile close */}
          <button
            className="text-slate-500 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={23} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-6">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className="flex w-full items-center gap-3 rounded-xl bg-transparent px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
              >
                <Icon size={20} />

                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* User / Logout */}
        <div className="border-t border-slate-200 p-4">
          <button
            onClick={() => handleNavigation("/profile")}
            className="mb-3 flex w-full items-center gap-3 rounded-xl bg-slate-50 p-3 text-left transition hover:bg-indigo-50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
              {studentName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">
                {studentName}
              </p>

              <p className="truncate text-xs text-slate-500">
                Student
              </p>
            </div>
          </button>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={20} />

            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <main className="lg:ml-72">
        {/* ==================================================
            TOP HEADER
        ================================================== */}

        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {/* Mobile menu */}
            <button
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>

            <div>
              <p className="text-sm text-slate-500">
                Student Dashboard
              </p>

              <h2 className="font-semibold text-slate-900">
                AI Study Assistant
              </h2>
            </div>
          </div>

          {/* Notification */}
          <button
            className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell size={21} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* ==================================================
              WELCOME
          ================================================== */}

          <section className="mb-8">
            <p className="mb-1 text-sm font-medium text-indigo-600">
              Welcome back 👋
            </p>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Hello, {studentName}!
            </h1>

            <p className="mt-2 text-slate-500">
              Keep learning and make progress toward your
              academic goals.
            </p>
          </section>

          {/* ==================================================
              STATS
          ================================================== */}

          <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Subjects */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                  <BookOpen size={22} />
                </div>
              </div>

              <p className="text-sm text-slate-500">
                Subjects
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                3
              </h3>
            </div>

            {/* Quizzes */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-xl bg-green-50 p-3 text-green-600">
                  <CheckCircle size={22} />
                </div>
              </div>

              <p className="text-sm text-slate-500">
                Quizzes Completed
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                12
              </h3>
            </div>

            {/* Study Hours */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                  <Clock size={22} />
                </div>
              </div>

              <p className="text-sm text-slate-500">
                Study Hours
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                28.5
              </h3>
            </div>

            {/* Overall Progress */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                  <BarChart3 size={22} />
                </div>
              </div>

              <p className="text-sm text-slate-500">
                Overall Progress
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                68%
              </h3>
            </div>
          </section>

          {/* ==================================================
              AI ASSISTANT
          ================================================== */}

          <section className="mb-8 overflow-hidden rounded-2xl bg-indigo-600 p-6 text-white shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles size={20} />

                  <span className="text-sm font-semibold">
                    AI STUDY ASSISTANT
                  </span>
                </div>

                <h2 className="text-2xl font-bold sm:text-3xl">
                  Need help with your studies?
                </h2>

                <p className="mt-3 text-indigo-100">
                  Ask questions, understand difficult concepts,
                  generate study material, or prepare for your
                  next quiz.
                </p>
              </div>

              <button
                onClick={() => navigate("/ai-assistant")}
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-600 shadow-sm transition hover:bg-indigo-50"
              >
                <Bot size={20} />

                Ask AI Assistant

                <ArrowRight size={18} />
              </button>
            </div>
          </section>

          {/* ==================================================
              SUBJECTS + PROGRESS
          ================================================== */}

          <section className="mb-8 grid gap-6 xl:grid-cols-2">
            {/* Subjects */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    My Subjects
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Track your learning progress
                  </p>
                </div>

                <button
                  onClick={() => navigate("/subjects")}
                  className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
                >
                  View all
                </button>
              </div>

              <div className="space-y-5">
                {subjects.map((subject) => (
                  <div key={subject.shortName}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600">
                          {subject.shortName}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-800">
                            {subject.name}
                          </p>

                          <p className="text-xs text-slate-500">
                            {subject.topics}
                          </p>
                        </div>
                      </div>

                      <span className="text-sm font-semibold text-slate-700">
                        {subject.progress}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                        style={{
                          width: `${subject.progress}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Progress Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your overall academic performance
                </p>
              </div>

              <div className="flex flex-col items-center justify-center py-3">
                <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[14px] border-indigo-100">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-slate-900">
                      68%
                    </p>

                    <p className="text-xs text-slate-500">
                      Overall
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid w-full grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-lg font-bold text-slate-900">
                      24
                    </p>

                    <p className="text-xs text-slate-500">
                      Topics
                    </p>
                  </div>

                  <div>
                    <p className="text-lg font-bold text-slate-900">
                      12
                    </p>

                    <p className="text-xs text-slate-500">
                      Quizzes
                    </p>
                  </div>

                  <div>
                    <p className="text-lg font-bold text-slate-900">
                      82%
                    </p>

                    <p className="text-xs text-slate-500">
                      Avg. Score
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/progress")}
                  className="mt-6 flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
                >
                  View detailed progress
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* ==================================================
              QUIZZES + ACTIVITY
          ================================================== */}

          <section className="grid gap-6 xl:grid-cols-2">
            {/* Quizzes */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Recent Quizzes
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Your latest quiz performance
                  </p>
                </div>

                <button
                  onClick={() => navigate("/quizzes")}
                  className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
                >
                  View all
                </button>
              </div>

              <div className="space-y-3">
                {quizzes.map((quiz) => (
                  <div
                    key={quiz.title}
                    className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="rounded-lg bg-indigo-100 p-2.5 text-indigo-600">
                        <ClipboardList size={19} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {quiz.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {quiz.questions} questions
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-lg bg-green-100 px-3 py-1 text-sm font-bold text-green-600">
                      {quiz.score}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/quizzes")}
                className="mt-5 flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
              >
                Browse all quizzes
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Activity */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Study Activity
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your latest learning activity
                </p>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.title}
                    className="flex gap-3"
                  >
                    <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-indigo-500" />

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-800">
                        {activity.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {activity.type} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;