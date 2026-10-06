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
  Zap,
  Target,
  ChevronDown,
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
    user?.name ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "Student";

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
    if (difficulty === "Easy") return "quiz-difficulty easy";
    if (difficulty === "Medium") return "quiz-difficulty medium";
    return "quiz-difficulty hard";
  };

  const handleStartQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="quizzes-page">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`dashboard-sidebar ${
          sidebarOpen ? "sidebar-mobile-open" : ""
        }`}
      >
        <div className="dashboard-sidebar-inner">
          {/* Brand */}
          <div className="sidebar-brand">
            <div className="brand-icon">
              <BookOpen size={21} strokeWidth={2.3} />
            </div>

            <div>
              <h1>StudyAI</h1>
              <p>Learn smarter</p>
            </div>

            <button
              onClick={closeSidebar}
              className="mobile-close"
              aria-label="Close menu"
            >
              <X size={19} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="sidebar-nav">
            <button
              onClick={() => navigate("/dashboard")}
              className="sidebar-link"
            >
              <Home size={19} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigate("/ai-assistant")}
              className="sidebar-link"
            >
              <Bot size={19} />
              <span>AI Assistant</span>
            </button>

            <button
              onClick={() => navigate("/subjects")}
              className="sidebar-link"
            >
              <BookOpen size={19} />
              <span>Subjects</span>
            </button>

            <button
              onClick={() => navigate("/quizzes")}
              className="sidebar-link sidebar-link-active"
            >
              <ClipboardList size={19} />
              <span>Quizzes</span>
            </button>

            <button
              onClick={() => navigate("/progress")}
              className="sidebar-link"
            >
              <BarChart3 size={19} />
              <span>Progress</span>
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="sidebar-link"
            >
              <User size={19} />
              <span>Profile</span>
            </button>
          </nav>

          {/* User */}
          <div className="sidebar-user">
            <button
              onClick={() => navigate("/profile")}
              className="sidebar-user-button"
            >
              <div className="user-avatar">
                {studentName.charAt(0).toUpperCase()}
              </div>

              <div className="sidebar-user-info">
                <p>{studentName}</p>
                <span>Student account</span>
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="logout-button"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="quizzes-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <button
              onClick={() => setSidebarOpen(true)}
              className="mobile-menu"
              aria-label="Open menu"
            >
              <Menu size={21} />
            </button>

            <div className="quizzes-heading">
              <div className="quizzes-heading-icon">
                <ClipboardList size={19} />
              </div>

              <div>
                <h1>Quizzes</h1>
                <p>Test your knowledge and improve your skills</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="header-avatar"
          >
            {studentName.charAt(0).toUpperCase()}
          </button>
        </header>

        <div className="quizzes-content">
          {/* ================= HERO ================= */}
          <section className="quizzes-hero">
            <div className="quiz-hero-decoration quiz-hero-decoration-one" />
            <div className="quiz-hero-decoration quiz-hero-decoration-two" />

            <div className="quizzes-hero-layout">
              <div className="quizzes-hero-content">
                <div className="quizzes-hero-badge">
                  <Trophy size={13} />
                  <span>Challenge yourself</span>
                </div>

                <h2>Ready for your next quiz, {studentName}?</h2>

                <p>
                  Practice what you have learned, identify weak areas, and
                  track your performance as you improve.
                </p>

                <div className="quizzes-hero-chips">
                  <span className="quizzes-hero-chip">
                    {quizzes.length} quizzes available
                  </span>

                  <span className="quizzes-hero-chip">
                    Multiple subjects
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate("/ai-assistant")}
                className="quizzes-ai-button"
              >
                <Sparkles size={15} />
                <span>Ask AI for Help</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </section>

          {/* ================= STATS ================= */}
          <section className="quizzes-stats">
            <div className="quizzes-stat">
              <div>
                <div className="quizzes-stat-label">Available</div>
                <div className="quizzes-stat-value">{quizzes.length}</div>
                <div className="quizzes-stat-description">
                  Quizzes ready to take
                </div>
              </div>

              <div className="quizzes-stat-icon indigo">
                <ClipboardList size={20} />
              </div>
            </div>

            <div className="quizzes-stat">
              <div>
                <div className="quizzes-stat-label">Attempted</div>
                <div className="quizzes-stat-value">6</div>
                <div className="quizzes-stat-description">
                  Total quiz attempts
                </div>
              </div>

              <div className="quizzes-stat-icon green">
                <Trophy size={20} />
              </div>
            </div>

            <div className="quizzes-stat">
              <div>
                <div className="quizzes-stat-label">Average Score</div>
                <div className="quizzes-stat-value">76%</div>
                <div className="quizzes-stat-description">
                  Overall performance
                </div>
              </div>

              <div className="quizzes-stat-icon violet">
                <BarChart3 size={20} />
              </div>
            </div>
          </section>

          {/* ================= SEARCH / FILTERS ================= */}
          <section className="quizzes-filter">
            <div className="quizzes-filter-heading">
              <div className="quizzes-filter-icon">
                <Search size={15} />
              </div>

              <div>
                <strong>Find a quiz</strong>
                <span>Search or filter your practice quizzes</span>
              </div>
            </div>

            <div className="quizzes-filter-row">
              {/* Search */}
              <div className="quizzes-search">
                <Search size={16} />

                <input
                  type="text"
                  placeholder="Search by quiz title or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Subject */}
              <div className="quizzes-select-wrapper">
                <Filter size={14} />

                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="quizzes-select"
                >
                  <option value="All">All Subjects</option>
                  <option value="COAL">COAL</option>
                  <option value="ICT">ICT</option>
                  <option value="PF">PF</option>
                </select>

                <ChevronDown size={14} />
              </div>

              {/* Difficulty */}
              <div className="quizzes-select-wrapper">
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="quizzes-select"
                >
                  <option value="All">All Levels</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>

                <ChevronDown size={14} />
              </div>
            </div>
          </section>

          {/* ================= QUIZ LIST ================= */}
          <section>
            <div className="quizzes-list-heading">
              <div>
                <h2>
                  Available Quizzes
                  <span className="quizzes-count">
                    {filteredQuizzes.length}
                  </span>
                </h2>

                <p>Choose a quiz and test your knowledge</p>
              </div>
            </div>

            {filteredQuizzes.length === 0 ? (
              <div className="quizzes-empty">
                <div className="quizzes-empty-icon">
                  <Search size={25} />
                </div>

                <h3>No quizzes found</h3>

                <p>Try changing your search or filters.</p>
              </div>
            ) : (
              <div className="quizzes-grid">
                {filteredQuizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="quiz-list-card"
                  >
                    <div className="quiz-list-accent" />

                    {/* Top */}
                    <div className="quiz-list-top">
                      <div className="quiz-list-title-area">
                        <div className="quiz-list-avatar">
                          {quiz.shortSubject}

                          <Zap
                            size={10}
                            fill="currentColor"
                          />
                        </div>

                        <div style={{ minWidth: 0 }}>
                          <div className="quiz-list-subject">
                            {quiz.subject}
                          </div>

                          <h3 className="quiz-list-title">
                            {quiz.title}
                          </h3>
                        </div>
                      </div>

                      <span
                        className={getDifficultyClass(quiz.difficulty)}
                      >
                        {quiz.difficulty}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="quiz-list-description">
                      {quiz.description}
                    </p>

                    {/* Info */}
                    <div className="quiz-info-grid">
                      <div className="quiz-info-item">
                        <div className="quiz-info-item-label">
                          <HelpCircle size={12} />
                          <span>Questions</span>
                        </div>

                        <div className="quiz-info-item-value">
                          {quiz.questions}
                        </div>
                      </div>

                      <div className="quiz-info-item">
                        <div className="quiz-info-item-label">
                          <Clock size={12} />
                          <span>Duration</span>
                        </div>

                        <div className="quiz-info-item-value">
                          {quiz.duration}
                        </div>
                      </div>

                      <div className="quiz-info-item">
                        <div className="quiz-info-item-label">
                          <Trophy size={12} />
                          <span>Best</span>
                        </div>

                        <div className="quiz-info-item-value">
                          {quiz.bestScore !== null
                            ? `${quiz.bestScore}%`
                            : "—"}
                        </div>
                      </div>
                    </div>

                    {/* Progress */}
                    {quiz.progress > 0 && (
                      <div className="quiz-card-progress">
                        <div className="quiz-card-progress-top">
                          <div className="quiz-card-progress-label">
                            <Target size={12} />
                            <span>Previous attempt</span>
                          </div>

                          <span className="quiz-card-progress-value">
                            {quiz.progress}%
                          </span>
                        </div>

                        <div className="quiz-card-progress-track">
                          <div
                            className="quiz-card-progress-fill"
                            style={{ width: `${quiz.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="quiz-list-footer">
                      <div>
                        <div className="quiz-list-attempts">
                          {quiz.attempts === 0
                            ? "Ready to start"
                            : `${quiz.attempts} attempt${
                                quiz.attempts !== 1 ? "s" : ""
                              }`}
                        </div>

                        {quiz.bestScore !== null && (
                          <div className="quiz-list-best">
                            Best score: {quiz.bestScore}%
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleStartQuiz(quiz.id)}
                        className="quiz-start-button"
                      >
                        <span>
                          {quiz.attempts === 0
                            ? "Start Quiz"
                            : "Try Again"}
                        </span>

                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ================= AI CARD ================= */}
          <section className="quizzes-ai-card">
            <div className="quizzes-ai-content">
              <div className="quizzes-ai-icon">
                <Sparkles size={19} />
              </div>

              <div>
                <h3>
                  Need help preparing?
                  <span
                    style={{
                      marginLeft: "6px",
                      padding: "2px 5px",
                      borderRadius: "999px",
                      background: "#e7e4ff",
                      color: "#5b5cf0",
                      fontSize: "7px",
                      fontWeight: 800,
                    }}
                  >
                    AI
                  </span>
                </h3>

                <p>
                  Ask the AI Study Assistant to explain difficult concepts
                  or generate practice questions for you.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/ai-assistant")}
              className="quizzes-ai-link"
            >
              <span>Open AI Assistant</span>
              <ArrowRight size={14} />
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Quizzes;