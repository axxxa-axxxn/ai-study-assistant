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
  Search,
  Clock,
  HelpCircle,
  Trophy,
  ArrowRight,
  Filter,
  Sparkles,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const quizzes = [
  {
    id: 1,
    title: "COAL Fundamentals Quiz",
    subject: "Computer Organization & Assembly Language",
    shortSubject: "COAL",
    description:
      "Test your understanding of computer organization, CPU architecture, memory, and assembly language.",
    difficulty: "Medium",
    questions: 15,
    duration: "20 min",
    progress: 60,
    attempts: 2,
    bestScore: 78,
  },
  {
    id: 2,
    title: "ICT Basics Quiz",
    subject: "Information & Communication Technology",
    shortSubject: "ICT",
    description:
      "Practice questions covering computer systems, networking, internet technologies, and communication.",
    difficulty: "Easy",
    questions: 10,
    duration: "15 min",
    progress: 80,
    attempts: 3,
    bestScore: 85,
  },
  {
    id: 3,
    title: "Programming Fundamentals",
    subject: "Programming Fundamentals",
    shortSubject: "PF",
    description:
      "Check your programming knowledge with questions about variables, conditions, loops, functions, and arrays.",
    difficulty: "Medium",
    questions: 20,
    duration: "25 min",
    progress: 40,
    attempts: 1,
    bestScore: 65,
  },
  {
    id: 4,
    title: "Assembly Language Challenge",
    subject: "Computer Organization & Assembly Language",
    shortSubject: "COAL",
    description:
      "Challenge yourself with assembly instructions, registers, addressing modes, and low-level programming.",
    difficulty: "Hard",
    questions: 15,
    duration: "25 min",
    progress: 0,
    attempts: 0,
    bestScore: null,
  },
  {
    id: 5,
    title: "Networking Basics",
    subject: "Information & Communication Technology",
    shortSubject: "ICT",
    description:
      "Test your knowledge of networks, communication systems, internet protocols, and basic networking concepts.",
    difficulty: "Easy",
    questions: 12,
    duration: "18 min",
    progress: 0,
    attempts: 0,
    bestScore: null,
  },
  {
    id: 6,
    title: "Programming Logic Challenge",
    subject: "Programming Fundamentals",
    shortSubject: "PF",
    description:
      "Solve conceptual programming questions involving logic, loops, functions, arrays, and problem solving.",
    difficulty: "Hard",
    questions: 15,
    duration: "20 min",
    progress: 0,
    attempts: 0,
    bestScore: null,
  },
];

function Quizzes() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const studentName =
    user?.name || user?.username || user?.email?.split("@")[0] || "Student";

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSubject =
      selectedSubject === "All" || quiz.shortSubject === selectedSubject;

    const matchesDifficulty =
      selectedDifficulty === "All" ||
      quiz.difficulty === selectedDifficulty;

    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const getDifficultyClass = (difficulty) => {
    if (difficulty === "Easy") {
      return "bg-green-100 text-green-700";
    }

    if (difficulty === "Medium") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-red-100 text-red-700";
  };

  const handleStartQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 transform border-r border-gray-200 bg-white transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
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
                <p className="text-xs text-gray-500">Study smarter</p>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="ml-auto rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              <X size={20} />
            </button>
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
              className="flex w-full items-center gap-3 rounded-xl bg-indigo-50 px-4 py-3 font-medium text-indigo-600"
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
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-600 transition hover:bg-gray-50 hover:text-indigo-600"
            >
              <User size={20} />
              <span>Profile</span>
            </button>
          </nav>

          {/* User section */}
          <div className="border-t border-gray-100 p-4">
            <button
              onClick={() => navigate("/profile")}
              className="mb-3 flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-gray-50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
                {studentName.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {studentName}
                </p>
                <p className="text-xs text-gray-500">Student</p>
              </div>
            </button>

            <button
              onClick={logout}
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
        <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
          <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
              >
                <Menu size={22} />
              </button>

              <div>
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  Quizzes
                </h2>
                <p className="hidden text-sm text-gray-500 sm:block">
                  Test your knowledge and improve your skills
                </p>
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
              {studentName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="px-4 py-6 sm:px-6 lg:px-8">
          {/* Welcome card */}
          <section className="mb-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white shadow-sm">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Trophy size={20} />
                  <span className="text-sm font-medium text-indigo-100">
                    Challenge yourself
                  </span>
                </div>

                <h3 className="text-2xl font-bold">
                  Ready for your next quiz, {studentName}?
                </h3>

                <p className="mt-2 max-w-2xl text-sm text-indigo-100">
                  Practice what you have learned, identify weak areas, and
                  track your performance.
                </p>
              </div>

              <button
                onClick={() => navigate("/ai-assistant")}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-50"
              >
                <Sparkles size={18} />
                Ask AI for Help
              </button>
            </div>
          </section>

          {/* Stats */}
          <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <ClipboardList size={20} />
              </div>
              <p className="text-sm text-gray-500">Available Quizzes</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {quizzes.length}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <Trophy size={20} />
              </div>
              <p className="text-sm text-gray-500">Quizzes Attempted</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">6</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <BarChart3 size={20} />
              </div>
              <p className="text-sm text-gray-500">Average Score</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">76%</p>
            </div>
          </section>

          {/* Search and filters */}
          <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row">
              {/* Search */}
              <div className="relative flex-1">
                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search quizzes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {/* Subject */}
                <div className="relative">
                  <Filter
                    size={17}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3 pl-9 pr-9 text-sm outline-none focus:border-indigo-500 sm:w-40"
                  >
                    <option value="All">All Subjects</option>
                    <option value="COAL">COAL</option>
                    <option value="ICT">ICT</option>
                    <option value="PF">PF</option>
                  </select>
                </div>

                {/* Difficulty */}
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 sm:w-40"
                >
                  <option value="All">All Levels</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>
          </section>

          {/* Quiz list */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Available Quizzes
                </h3>
                <p className="text-sm text-gray-500">
                  {filteredQuizzes.length} quiz
                  {filteredQuizzes.length !== 1 ? "zes" : ""} found
                </p>
              </div>
            </div>

            {filteredQuizzes.length === 0 ? (
              <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <Search size={25} />
                </div>

                <h4 className="font-semibold text-gray-900">
                  No quizzes found
                </h4>

                <p className="mt-1 text-sm text-gray-500">
                  Try changing your search or filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                {filteredQuizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
                  >
                    {/* Top */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 font-bold text-indigo-600">
                          {quiz.shortSubject}
                        </div>

                        <div>
                          <p className="text-xs font-medium text-gray-500">
                            {quiz.subject}
                          </p>
                          <h4 className="mt-1 font-bold text-gray-900">
                            {quiz.title}
                          </h4>
                        </div>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getDifficultyClass(
                          quiz.difficulty
                        )}`}
                      >
                        {quiz.difficulty}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-sm leading-6 text-gray-600">
                      {quiz.description}
                    </p>

                    {/* Info */}
                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      <div className="rounded-xl bg-gray-50 p-3">
                        <div className="flex items-center gap-2 text-gray-500">
                          <HelpCircle size={16} />
                          <span className="text-xs">Questions</span>
                        </div>
                        <p className="mt-1 font-semibold text-gray-900">
                          {quiz.questions}
                        </p>
                      </div>

                      <div className="rounded-xl bg-gray-50 p-3">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock size={16} />
                          <span className="text-xs">Duration</span>
                        </div>
                        <p className="mt-1 font-semibold text-gray-900">
                          {quiz.duration}
                        </p>
                      </div>

                      <div className="rounded-xl bg-gray-50 p-3">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Trophy size={16} />
                          <span className="text-xs">Best Score</span>
                        </div>
                        <p className="mt-1 font-semibold text-gray-900">
                          {quiz.bestScore !== null
                            ? `${quiz.bestScore}%`
                            : "Not attempted"}
                        </p>
                      </div>
                    </div>

                    {/* Progress */}
                    {quiz.progress > 0 && (
                      <div className="mt-5">
                        <div className="mb-2 flex justify-between text-xs">
                          <span className="text-gray-500">
                            Previous attempt
                          </span>
                          <span className="font-medium text-gray-700">
                            {quiz.progress}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full bg-indigo-600 transition-all"
                            style={{ width: `${quiz.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                      <div className="text-xs text-gray-500">
                        {quiz.attempts === 0
                          ? "Not attempted yet"
                          : `${quiz.attempts} attempt${
                              quiz.attempts !== 1 ? "s" : ""
                            }`}
                      </div>

                      <button
                        onClick={() => handleStartQuiz(quiz.id)}
                        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                      >
                        {quiz.attempts === 0 ? "Start Quiz" : "Try Again"}
                        <ArrowRight size={17} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Bottom AI card */}
          <section className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  <Sparkles size={21} />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Need help preparing?
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Ask the AI Study Assistant to explain difficult concepts
                    or generate practice questions.
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/ai-assistant")}
                className="whitespace-nowrap rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm transition hover:bg-indigo-100"
              >
                Open AI Assistant
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Quizzes;