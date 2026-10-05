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
  Search,
  ArrowRight,
  CheckCircle,
  Clock,
  BookMarked,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Subjects() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const studentName =
    user?.name ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "Student";

  // --------------------------------------------------
  // Subjects Data
  // --------------------------------------------------

  const subjects = [
    {
      id: 1,
      name: "Computer Organization & Assembly Language",
      shortName: "COAL",
      description:
        "Learn computer organization, assembly language, memory, CPU architecture, and low-level programming.",
      progress: 78,
      completedTopics: 12,
      totalTopics: 15,
      studyHours: 10.5,
      color: "indigo",
      topics: [
        "Computer Organization",
        "CPU Architecture",
        "Memory Organization",
        "Assembly Language",
        "Instruction Set",
        "Addressing Modes",
        "I/O Organization",
      ],
      nextTopic: "Memory Organization",
    },
    {
      id: 2,
      name: "Information & Communication Technology",
      shortName: "ICT",
      description:
        "Explore information technology, communication systems, networking, databases, and digital technologies.",
      progress: 65,
      completedTopics: 10,
      totalTopics: 15,
      studyHours: 8.5,
      color: "blue",
      topics: [
        "Introduction to ICT",
        "Computer Networks",
        "Internet",
        "Communication Systems",
        "Databases",
        "Cyber Security",
        "Cloud Computing",
      ],
      nextTopic: "Networking Basics",
    },
    {
      id: 3,
      name: "Programming Fundamentals",
      shortName: "PF",
      description:
        "Build programming fundamentals using variables, conditions, loops, functions, arrays, and problem solving.",
      progress: 52,
      completedTopics: 8,
      totalTopics: 15,
      studyHours: 9.5,
      color: "purple",
      topics: [
        "Programming Basics",
        "Variables & Data Types",
        "Conditional Statements",
        "Loops",
        "Functions",
        "Arrays",
        "Pointers",
      ],
      nextTopic: "Functions",
    },
  ];

  // --------------------------------------------------
  // Navigation
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

  const handleNavigation = (path) => {
    setSidebarOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setSidebarOpen(false);
    logout();
  };

  // --------------------------------------------------
  // Search
  // --------------------------------------------------

  const filteredSubjects = subjects.filter((subject) => {
    const search = searchTerm.toLowerCase();

    return (
      subject.name.toLowerCase().includes(search) ||
      subject.shortName.toLowerCase().includes(search) ||
      subject.description.toLowerCase().includes(search)
    );
  });

  // --------------------------------------------------
  // Subject Colors
  // --------------------------------------------------

  const getColorClasses = (color) => {
    const colors = {
      indigo: {
        icon: "bg-indigo-100 text-indigo-600",
        badge: "bg-indigo-50 text-indigo-600",
        progress: "bg-indigo-600",
        button: "bg-indigo-600 hover:bg-indigo-700",
      },

      blue: {
        icon: "bg-blue-100 text-blue-600",
        badge: "bg-blue-50 text-blue-600",
        progress: "bg-blue-600",
        button: "bg-blue-600 hover:bg-blue-700",
      },

      purple: {
        icon: "bg-purple-100 text-purple-600",
        badge: "bg-purple-50 text-purple-600",
        progress: "bg-purple-600",
        button: "bg-purple-600 hover:bg-purple-700",
      },
    };

    return colors[color] || colors.indigo;
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
            const active = item.path === "/subjects";

            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                }`}
              >
                <Icon size={20} />

                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* User */}
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
          MAIN
      ================================================== */}

      <main className="lg:ml-72">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>

            <div>
              <p className="text-sm text-slate-500">
                Learning
              </p>

              <h2 className="font-semibold text-slate-900">
                My Subjects
              </h2>
            </div>
          </div>

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
              PAGE INTRO
          ================================================== */}

          <section className="mb-8">
            <p className="mb-1 text-sm font-medium text-indigo-600">
              Your Learning Space
            </p>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              My Subjects
            </h1>

            <p className="mt-2 max-w-2xl text-slate-500">
              Explore your subjects, track completed topics,
              and continue learning from where you left off.
            </p>
          </section>

          {/* ==================================================
              SUMMARY
          ================================================== */}

          <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <BookOpen size={22} />
              </div>

              <p className="text-sm text-slate-500">
                Total Subjects
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                3
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <CheckCircle size={22} />
              </div>

              <p className="text-sm text-slate-500">
                Topics Completed
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                30
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <Clock size={22} />
              </div>

              <p className="text-sm text-slate-500">
                Study Hours
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                28.5
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <BarChart3 size={22} />
              </div>

              <p className="text-sm text-slate-500">
                Average Progress
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                65%
              </p>
            </div>
          </section>

          {/* ==================================================
              SEARCH
          ================================================== */}

          <section className="mb-6">
            <div className="relative max-w-xl">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </section>

          {/* ==================================================
              SUBJECT CARDS
          ================================================== */}

          <section className="grid gap-6 xl:grid-cols-2">
            {filteredSubjects.map((subject) => {
              const colors = getColorClasses(subject.color);

              return (
                <div
                  key={subject.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="p-6">
                    {/* Subject Header */}
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-sm font-bold ${colors.icon}`}
                      >
                        {subject.shortName}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h2 className="text-lg font-bold text-slate-900">
                            {subject.name}
                          </h2>

                          <span
                            className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${colors.badge}`}
                          >
                            {subject.progress}% Complete
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {subject.description}
                        </p>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mt-6">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-700">
                          Course Progress
                        </span>

                        <span className="text-sm font-bold text-slate-900">
                          {subject.progress}%
                        </span>
                      </div>

                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${colors.progress}`}
                          style={{
                            width: `${subject.progress}%`,
                          }}
                        />
                      </div>

                      <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                        <span>
                          {subject.completedTopics} of{" "}
                          {subject.totalTopics} topics completed
                        </span>

                        <span>
                          {subject.studyHours} hours
                        </span>
                      </div>
                    </div>

                    {/* Next Topic */}
                    <div className="mt-6 rounded-xl bg-slate-50 p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-white p-2 text-indigo-600 shadow-sm">
                          <BookMarked size={18} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-slate-500">
                            Continue studying
                          </p>

                          <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                            {subject.nextTopic}
                          </p>
                        </div>

                        <ArrowRight
                          size={18}
                          className="shrink-0 text-slate-400"
                        />
                      </div>
                    </div>

                    {/* Topics */}
                    <div className="mt-6">
                      <h3 className="mb-3 text-sm font-bold text-slate-800">
                        Topics
                      </h3>

                      <div className="flex flex-wrap gap-2">
                        {subject.topics.map((topic, index) => {
                          const completed =
                            index <
                            Math.round(
                              (subject.completedTopics /
                                subject.totalTopics) *
                                subject.topics.length
                            );

                          return (
                            <span
                              key={topic}
                              className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                                completed
                                  ? "border-green-200 bg-green-50 text-green-700"
                                  : "border-slate-200 bg-white text-slate-500"
                              }`}
                            >
                              {completed && "✓ "}
                              {topic}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Button */}
                    <button
                      onClick={() =>
                        navigate(`/subjects/${subject.id}`)
                      }
                      className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${colors.button}`}
                    >
                      Open Subject

                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </section>

          {/* No Results */}
          {filteredSubjects.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Search size={24} />
              </div>

              <h2 className="mt-4 text-lg font-bold text-slate-900">
                No subjects found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Try searching with a different subject name or
                abbreviation.
              </p>
            </div>
          )}

          {/* ==================================================
              BOTTOM AI CARD
          ================================================== */}

          <section className="mt-8 overflow-hidden rounded-2xl bg-indigo-600 p-6 text-white shadow-sm sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-indigo-200">
                  NEED HELP?
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Stuck on a difficult topic?
                </h2>

                <p className="mt-2 max-w-2xl text-sm text-indigo-100">
                  Ask the AI Study Assistant to explain a concept,
                  create examples, or help you prepare for a quiz.
                </p>
              </div>

              <button
                onClick={() => navigate("/ai-assistant")}
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-50"
              >
                <Bot size={19} />

                Ask AI Assistant

                <ArrowRight size={18} />
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Subjects;