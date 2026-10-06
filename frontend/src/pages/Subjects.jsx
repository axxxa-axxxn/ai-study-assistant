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

  const filteredSubjects = subjects.filter((subject) => {
    const search = searchTerm.toLowerCase();

    return (
      subject.name.toLowerCase().includes(search) ||
      subject.shortName.toLowerCase().includes(search) ||
      subject.description.toLowerCase().includes(search)
    );
  });

  const getColorClasses = (color) => {
    const colors = {
      indigo: {
        icon: "subjects-color-indigo-icon",
        badge: "subjects-color-indigo-badge",
        progress: "subjects-color-indigo-progress",
        button: "subjects-color-indigo-button",
      },

      blue: {
        icon: "subjects-color-blue-icon",
        badge: "subjects-color-blue-badge",
        progress: "subjects-color-blue-progress",
        button: "subjects-color-blue-button",
      },

      purple: {
        icon: "subjects-color-purple-icon",
        badge: "subjects-color-purple-badge",
        progress: "subjects-color-purple-progress",
        button: "subjects-color-purple-button",
      },
    };

    return colors[color] || colors.indigo;
  };

  return (
    <div className="subjects-page">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="subjects-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`subjects-sidebar ${
          sidebarOpen ? "subjects-sidebar-open" : ""
        }`}
      >
        <div className="subjects-sidebar-inner">

          {/* Brand */}
          <div className="subjects-sidebar-brand">
            <div className="subjects-brand-icon">
              <Bot size={23} />
            </div>

            <div className="subjects-brand-copy">
              <h1 className="subjects-brand-title">
                AI Study
              </h1>

              <p className="subjects-brand-subtitle">
                Assistant
              </p>
            </div>

            <button
              className="subjects-sidebar-close"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="subjects-nav">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = item.path === "/subjects";

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={`subjects-nav-item ${
                    active ? "subjects-nav-item-active" : ""
                  }`}
                >
                  <Icon size={19} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* User */}
          <div className="subjects-sidebar-bottom">

            <button
              onClick={() => handleNavigation("/profile")}
              className="subjects-user-card"
            >
              <div className="subjects-user-avatar">
                {studentName.charAt(0).toUpperCase()}
              </div>

              <div className="subjects-user-info">
                <p className="subjects-user-name">
                  {studentName}
                </p>

                <p className="subjects-user-role">
                  Student
                </p>
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="subjects-logout"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>

          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="subjects-main">

        {/* Header */}
        <header className="subjects-header">

          <div className="subjects-header-left">

            <button
              className="subjects-mobile-menu"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={23} />
            </button>

            <div>
              <p className="subjects-header-overline">
                LEARNING
              </p>

              <h2 className="subjects-header-title">
                My Subjects
              </h2>
            </div>

          </div>

          <button
            className="subjects-notification"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span />
          </button>

        </header>

        {/* Content */}
        <div className="subjects-content">

          {/* Page Intro */}
          <section className="subjects-intro">

            <div>
              <p className="subjects-intro-kicker">
                YOUR LEARNING SPACE
              </p>

              <h1 className="subjects-intro-title">
                My Subjects
              </h1>

              <p className="subjects-intro-text">
                Explore your subjects, track completed topics,
                and continue learning from where you left off.
              </p>
            </div>

          </section>

          {/* Summary */}
          <section className="subjects-summary-grid">

            <div className="subjects-summary-card">
              <div className="subjects-summary-icon subjects-summary-indigo">
                <BookOpen size={21} />
              </div>

              <p className="subjects-summary-label">
                Total Subjects
              </p>

              <p className="subjects-summary-value">
                3
              </p>
            </div>

            <div className="subjects-summary-card">
              <div className="subjects-summary-icon subjects-summary-green">
                <CheckCircle size={21} />
              </div>

              <p className="subjects-summary-label">
                Topics Completed
              </p>

              <p className="subjects-summary-value">
                30
              </p>
            </div>

            <div className="subjects-summary-card">
              <div className="subjects-summary-icon subjects-summary-orange">
                <Clock size={21} />
              </div>

              <p className="subjects-summary-label">
                Study Hours
              </p>

              <p className="subjects-summary-value">
                28.5
              </p>
            </div>

            <div className="subjects-summary-card">
              <div className="subjects-summary-icon subjects-summary-purple">
                <BarChart3 size={21} />
              </div>

              <p className="subjects-summary-label">
                Average Progress
              </p>

              <p className="subjects-summary-value">
                65%
              </p>
            </div>

          </section>

          {/* Search */}
          <section className="subjects-search-section">
            <div className="subjects-search">

              <Search
                size={19}
                className="subjects-search-icon"
              />

              <input
                type="text"
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

            </div>
          </section>

          {/* Subject Cards */}
          <section className="subjects-card-grid">

            {filteredSubjects.map((subject) => {
              const colors = getColorClasses(subject.color);

              return (
                <div
                  key={subject.id}
                  className="subject-card"
                >

                  <div className="subject-card-body">

                    {/* Subject Header */}
                    <div className="subject-card-header">

                      <div
                        className={`subject-code ${colors.icon}`}
                      >
                        {subject.shortName}
                      </div>

                      <div className="subject-card-heading">

                        <div className="subject-title-row">

                          <h2 className="subject-card-title">
                            {subject.name}
                          </h2>

                          <span
                            className={`subject-badge ${colors.badge}`}
                          >
                            {subject.progress}% Complete
                          </span>

                        </div>

                        <p className="subject-card-description">
                          {subject.description}
                        </p>

                      </div>

                    </div>

                    {/* Progress */}
                    <div className="subject-progress">

                      <div className="subject-progress-header">
                        <span>
                          Course Progress
                        </span>

                        <strong>
                          {subject.progress}%
                        </strong>
                      </div>

                      <div className="subject-progress-track">
                        <div
                          className={`subject-progress-fill ${colors.progress}`}
                          style={{
                            width: `${subject.progress}%`,
                          }}
                        />
                      </div>

                      <div className="subject-progress-meta">
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
                    <div className="subject-next-topic">

                      <div className="subject-next-icon">
                        <BookMarked size={18} />
                      </div>

                      <div className="subject-next-info">
                        <p>
                          Continue studying
                        </p>

                        <strong>
                          {subject.nextTopic}
                        </strong>
                      </div>

                      <ArrowRight
                        size={18}
                        className="subject-next-arrow"
                      />

                    </div>

                    {/* Topics */}
                    <div className="subject-topics">

                      <h3>
                        Topics
                      </h3>

                      <div className="subject-topic-list">

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
                              className={`subject-topic ${
                                completed
                                  ? "subject-topic-completed"
                                  : "subject-topic-pending"
                              }`}
                            >
                              {completed && "✓ "}
                              {topic}
                            </span>
                          );
                        })}

                      </div>
                    </div>

                    {/* Open Subject */}
                    <button
                      onClick={() =>
                        navigate(`/subjects/${subject.id}`)
                      }
                      className={`subject-open-button ${colors.button}`}
                    >
                      <span>
                        Open Subject
                      </span>

                      <ArrowRight size={18} />
                    </button>

                  </div>
                </div>
              );
            })}

          </section>

          {/* No Results */}
          {filteredSubjects.length === 0 && (
            <div className="subjects-no-results">

              <div className="subjects-no-results-icon">
                <Search size={24} />
              </div>

              <h2>
                No subjects found
              </h2>

              <p>
                Try searching with a different subject name or
                abbreviation.
              </p>

            </div>
          )}

          {/* Bottom AI Card */}
          <section className="subjects-ai-card">

            <div className="subjects-ai-content">

              <div>
                <p className="subjects-ai-kicker">
                  NEED HELP?
                </p>

                <h2 className="subjects-ai-title">
                  Stuck on a difficult topic?
                </h2>

                <p className="subjects-ai-text">
                  Ask the AI Study Assistant to explain a concept,
                  create examples, or help you prepare for a quiz.
                </p>
              </div>

              <button
                onClick={() => navigate("/ai-assistant")}
                className="subjects-ai-button"
              >
                <Bot size={19} />
                <span>Ask AI Assistant</span>
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