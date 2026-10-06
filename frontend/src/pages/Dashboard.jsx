import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  Clock3,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Play,
  Brain,
  Trophy,
  Target,
  ChevronRight,
  Zap,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const studentName =
    user?.name ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "Student";

  const firstName = studentName.split(" ")[0];

  const subjects = [
    {
      name: "Computer Organization & Assembly Language",
      shortName: "COAL",
      progress: 78,
      topics: "12 / 15 topics",
      color: "indigo",
    },
    {
      name: "Information & Communication Technology",
      shortName: "ICT",
      progress: 65,
      topics: "10 / 15 topics",
      color: "cyan",
    },
    {
      name: "Programming Fundamentals",
      shortName: "PF",
      progress: 52,
      topics: "8 / 15 topics",
      color: "violet",
    },
  ];

  const recentActivity = [
    {
      title: "COAL - Memory Organization",
      type: "Study Session",
      time: "Today, 10:30 AM",
      icon: BookOpen,
    },
    {
      title: "ICT - Networking Basics",
      type: "Quiz Completed",
      time: "Yesterday, 4:15 PM",
      icon: CheckCircle2,
    },
    {
      title: "PF - Functions",
      type: "Study Session",
      time: "Yesterday, 11:20 AM",
      icon: Brain,
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
    {
      title: "PF Functions Quiz",
      questions: 10,
      score: "82%",
    },
  ];

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
      special: true,
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

  return (
    <div className="dashboard-shell">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="dashboard-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`dashboard-sidebar ${
          sidebarOpen ? "dashboard-sidebar-open" : ""
        }`}
      >
        <div className="sidebar-brand">
          <div className="brand-icon">
            <Bot size={23} />
          </div>

          <div>
            <h1>AI Study</h1>
            <span>Assistant</span>
          </div>

          <button
            className="mobile-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={21} />
          </button>
        </div>

        <div className="sidebar-label">MAIN MENU</div>

        <nav className="sidebar-nav">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`sidebar-link ${
                  active ? "sidebar-link-active" : ""
                } ${item.special ? "sidebar-ai-link" : ""}`}
              >
                <span className="sidebar-link-icon">
                  <Icon size={19} />
                </span>

                <span>{item.name}</span>

                {item.special && <Sparkles size={14} />}
              </button>
            );
          })}
        </nav>

        {/* AI promo */}
        <div className="sidebar-ai-card">
          <div className="sidebar-ai-sparkle">
            <Sparkles size={17} />
          </div>

          <h3>Study smarter</h3>

          <p>
            Get help from your AI study companion anytime.
          </p>

          <button onClick={() => handleNavigation("/ai-assistant")}>
            Try AI Assistant
            <ArrowRight size={15} />
          </button>
        </div>

        {/* User */}
        <div className="sidebar-bottom">
          <button
            className="sidebar-user"
            onClick={() => handleNavigation("/profile")}
          >
            <div className="user-avatar">
              {studentName.charAt(0).toUpperCase()}
            </div>

            <div className="sidebar-user-info">
              <strong>{studentName}</strong>
              <span>Student</span>
            </div>

            <ChevronRight size={16} />
          </button>

          <button className="logout-button" onClick={handleLogout}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <button
              className="mobile-menu"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={23} />
            </button>

            <div>
              <span className="header-overline">STUDENT PORTAL</span>
              <h2>Dashboard</h2>
            </div>
          </div>

          <div className="header-right">
            <div className="notification-wrapper">
              <button
                className="notification-button"
                onClick={() =>
                  setShowNotifications(!showNotifications)
                }
              >
                <Bell size={19} />
                <span className="notification-dot" />
              </button>

              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="notification-heading">
                    <strong>Notifications</strong>
                    <span>3</span>
                  </div>

                  <div className="notification-item">
                    <div className="notification-icon">
                      <Trophy size={15} />
                    </div>

                    <div>
                      <strong>Great progress!</strong>
                      <p>You completed a quiz.</p>
                    </div>
                  </div>

                  <div className="notification-item">
                    <div className="notification-icon">
                      <Target size={15} />
                    </div>

                    <div>
                      <strong>Keep your streak</strong>
                      <p>Study today to stay on track.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              className="header-profile"
              onClick={() => navigate("/profile")}
            >
              <div className="header-avatar">
                {studentName.charAt(0).toUpperCase()}
              </div>

              <div className="header-profile-text">
                <strong>{studentName}</strong>
                <span>Student</span>
              </div>
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          {/* ================= HERO ================= */}
          <section className="dashboard-hero">
            <div className="hero-decoration hero-decoration-one" />
            <div className="hero-decoration hero-decoration-two" />

            <div className="hero-content">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                Your learning journey
              </div>

              <h1>
                Welcome back,{" "}
                <span>{firstName}!</span>
              </h1>

              <p>
                Continue your learning journey and keep building
                your knowledge one step at a time.
              </p>

              <div className="hero-actions">
                <button
                  className="hero-primary-button"
                  onClick={() => navigate("/subjects")}
                >
                  <Play size={17} fill="currentColor" />
                  Continue Learning
                </button>

                <button
                  className="hero-secondary-button"
                  onClick={() => navigate("/ai-assistant")}
                >
                  <Sparkles size={17} />
                  Ask AI
                </button>
              </div>
            </div>

            <div className="hero-illustration">
              <div className="hero-orbit orbit-one" />
              <div className="hero-orbit orbit-two" />

              <div className="hero-brain">
                <Brain size={65} />
              </div>

              <div className="floating-card floating-card-one">
                <CheckCircle2 size={17} />
                <span>68% Progress</span>
              </div>

              <div className="floating-card floating-card-two">
                <Zap size={16} />
                <span>Keep going!</span>
              </div>
            </div>
          </section>

          {/* ================= STATS ================= */}
          <section className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-icon stat-icon-indigo">
                <BookOpen size={21} />
              </div>

              <div>
                <span>Subjects</span>
                <strong>3</strong>
              </div>

              <div className="stat-trend">
                <ArrowRight size={15} />
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-icon-green">
                <CheckCircle2 size={21} />
              </div>

              <div>
                <span>Quizzes Completed</span>
                <strong>12</strong>
              </div>

              <div className="stat-trend">
                <ArrowRight size={15} />
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-icon-orange">
                <Clock3 size={21} />
              </div>

              <div>
                <span>Study Hours</span>
                <strong>28.5</strong>
              </div>

              <div className="stat-trend">
                <ArrowRight size={15} />
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-icon-purple">
                <BarChart3 size={21} />
              </div>

              <div>
                <span>Overall Progress</span>
                <strong>68%</strong>
              </div>

              <div className="stat-trend">
                <ArrowRight size={15} />
              </div>
            </div>
          </section>

          {/* ================= QUICK ACTIONS ================= */}
          <section className="section-block">
            <div className="section-heading">
              <div>
                <span className="section-kicker">GET STARTED</span>
                <h2>Quick Actions</h2>
              </div>

              <p>Jump into your study tools</p>
            </div>

            <div className="quick-actions">
              <button
                className="quick-action quick-action-ai"
                onClick={() => navigate("/ai-assistant")}
              >
                <div className="quick-action-icon">
                  <Sparkles size={22} />
                </div>

                <div>
                  <strong>Ask AI Assistant</strong>
                  <span>Get instant study help</span>
                </div>

                <ArrowRight size={18} />
              </button>

              <button
                className="quick-action"
                onClick={() => navigate("/subjects")}
              >
                <div className="quick-action-icon">
                  <BookOpen size={22} />
                </div>

                <div>
                  <strong>Explore Subjects</strong>
                  <span>Continue your courses</span>
                </div>

                <ArrowRight size={18} />
              </button>

              <button
                className="quick-action"
                onClick={() => navigate("/quizzes")}
              >
                <div className="quick-action-icon">
                  <ClipboardList size={22} />
                </div>

                <div>
                  <strong>Take a Quiz</strong>
                  <span>Test your knowledge</span>
                </div>

                <ArrowRight size={18} />
              </button>

              <button
                className="quick-action"
                onClick={() => navigate("/progress")}
              >
                <div className="quick-action-icon">
                  <BarChart3 size={22} />
                </div>

                <div>
                  <strong>View Progress</strong>
                  <span>Track your performance</span>
                </div>

                <ArrowRight size={18} />
              </button>
            </div>
          </section>

          {/* ================= SUBJECTS + PROGRESS ================= */}
          <section className="dashboard-grid-two">
            {/* Subjects */}
            <div className="dashboard-card">
              <div className="card-heading">
                <div>
                  <span className="section-kicker">YOUR COURSES</span>
                  <h2>My Subjects</h2>
                </div>

                <button onClick={() => navigate("/subjects")}>
                  View all <ArrowRight size={15} />
                </button>
              </div>

              <div className="subject-list">
                {subjects.map((subject) => (
                  <button
                    key={subject.shortName}
                    className="subject-row"
                    onClick={() => navigate("/subjects")}
                  >
                    <div className={`subject-avatar ${subject.color}`}>
                      {subject.shortName}
                    </div>

                    <div className="subject-information">
                      <div className="subject-title-row">
                        <strong>{subject.name}</strong>
                        <span>{subject.progress}%</span>
                      </div>

                      <div className="subject-progress">
                        <div
                          style={{
                            width: `${subject.progress}%`,
                          }}
                        />
                      </div>

                      <small>{subject.topics}</small>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="dashboard-card progress-card">
              <div className="card-heading">
                <div>
                  <span className="section-kicker">PERFORMANCE</span>
                  <h2>Progress Overview</h2>
                </div>

                <div className="progress-icon">
                  <Target size={18} />
                </div>
              </div>

              <div className="progress-main">
                <div
                  className="progress-ring"
                  style={{
                    "--progress": "68%",
                  }}
                >
                  <div className="progress-ring-inner">
                    <strong>68%</strong>
                    <span>Overall</span>
                  </div>
                </div>

                <div className="progress-message">
                  <strong>You're doing great!</strong>
                  <p>
                    Keep studying consistently to reach your
                    academic goals.
                  </p>

                  <button onClick={() => navigate("/progress")}>
                    Detailed analytics
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>

              <div className="progress-metrics">
                <div>
                  <strong>24</strong>
                  <span>Topics</span>
                </div>

                <div>
                  <strong>12</strong>
                  <span>Quizzes</span>
                </div>

                <div>
                  <strong>82%</strong>
                  <span>Avg. Score</span>
                </div>
              </div>
            </div>
          </section>

          {/* ================= QUIZZES + ACTIVITY ================= */}
          <section className="dashboard-grid-two">
            <div className="dashboard-card">
              <div className="card-heading">
                <div>
                  <span className="section-kicker">TEST YOURSELF</span>
                  <h2>Recent Quizzes</h2>
                </div>

                <button onClick={() => navigate("/quizzes")}>
                  View all <ArrowRight size={15} />
                </button>
              </div>

              <div className="quiz-list">
                {quizzes.map((quiz) => (
                  <div className="quiz-row" key={quiz.title}>
                    <div className="quiz-icon">
                      <ClipboardList size={18} />
                    </div>

                    <div className="quiz-information">
                      <strong>{quiz.title}</strong>
                      <span>{quiz.questions} questions</span>
                    </div>

                    <div className="quiz-score">
                      {quiz.score}
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="card-bottom-link"
                onClick={() => navigate("/quizzes")}
              >
                Browse all quizzes
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="dashboard-card">
              <div className="card-heading">
                <div>
                  <span className="section-kicker">YOUR JOURNEY</span>
                  <h2>Recent Activity</h2>
                </div>
              </div>

              <div className="activity-list">
                {recentActivity.map((activity) => {
                  const ActivityIcon = activity.icon;

                  return (
                    <div
                      className="activity-row"
                      key={activity.title}
                    >
                      <div className="activity-icon">
                        <ActivityIcon size={17} />
                      </div>

                      <div className="activity-information">
                        <strong>{activity.title}</strong>

                        <span>
                          {activity.type} <b>•</b>{" "}
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="dashboard-footer">
            <span>AI Study Assistant</span>
            <span>Keep learning. Keep growing. 🚀</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;