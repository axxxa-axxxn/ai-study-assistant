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
  GraduationCap,
  Mail,
  ShieldCheck,
  Sparkles,
  BookMarked,
  Trophy,
  Clock,
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
    <div className="profile-page">
      {/* Sidebar */}
      <aside className="profile-sidebar">
        <div className="profile-sidebar-inner">
          {/* Logo */}
          <div className="profile-sidebar-brand">
            <div className="profile-brand-icon">
              <BookOpen size={21} />
            </div>

            <div>
              <h1 className="profile-brand-title">StudyAI</h1>
              <p className="profile-brand-subtitle">Study smarter</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="profile-nav">
            <button
              onClick={() => navigate("/dashboard")}
              className="profile-nav-item"
            >
              <Home size={20} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigate("/ai-assistant")}
              className="profile-nav-item"
            >
              <Bot size={20} />
              <span>AI Assistant</span>
            </button>

            <button
              onClick={() => navigate("/subjects")}
              className="profile-nav-item"
            >
              <BookOpen size={20} />
              <span>Subjects</span>
            </button>

            <button
              onClick={() => navigate("/quizzes")}
              className="profile-nav-item"
            >
              <ClipboardList size={20} />
              <span>Quizzes</span>
            </button>

            <button
              onClick={() => navigate("/progress")}
              className="profile-nav-item"
            >
              <BarChart3 size={20} />
              <span>Progress</span>
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="profile-nav-item profile-nav-item-active"
            >
              <User size={20} />
              <span>Profile</span>
            </button>
          </nav>

          {/* Logout */}
          <div className="profile-logout-wrap">
            <button
              onClick={handleLogout}
              className="profile-logout"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="profile-main">
        {/* Header */}
        <header className="profile-header">
          <div className="profile-header-inner">
            <button
              onClick={() => navigate("/dashboard")}
              className="profile-back"
              aria-label="Back to dashboard"
            >
              <ArrowLeft size={21} />
            </button>

            <div>
              <p className="profile-header-overline">ACCOUNT</p>

              <h2 className="profile-header-title">
                Profile
              </h2>

              <p className="profile-header-subtitle">
                Manage your student profile
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="profile-content">
          {/* Profile Card */}
          <section className="profile-card">
            {/* Banner */}
            <div className="profile-banner">
              <div className="profile-banner-glow profile-banner-glow-one" />
              <div className="profile-banner-glow profile-banner-glow-two" />

              <div className="profile-banner-pattern">
                <span />
                <span />
                <span />
              </div>
            </div>

            {/* User information */}
            <div className="profile-card-body">
              <div className="profile-identity">
                <div className="profile-avatar">
                  {studentName.charAt(0).toUpperCase()}
                </div>

                <div className="profile-identity-info">
                  <h1>{studentName}</h1>

                  <div className="profile-role">
                    <GraduationCap size={16} />
                    <span>Student</span>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="profile-section">
                <div className="profile-section-heading">
                  <div className="profile-section-icon">
                    <User size={18} />
                  </div>

                  <div>
                    <h3>Personal Information</h3>
                    <p>Your account details</p>
                  </div>
                </div>

                <div className="profile-details-grid">
                  <div className="profile-detail">
                    <div className="profile-detail-icon profile-detail-icon-indigo">
                      <User size={18} />
                    </div>

                    <div>
                      <p className="profile-detail-label">
                        Full Name
                      </p>

                      <p className="profile-detail-value">
                        {studentName}
                      </p>
                    </div>
                  </div>

                  <div className="profile-detail">
                    <div className="profile-detail-icon profile-detail-icon-blue">
                      <Mail size={18} />
                    </div>

                    <div>
                      <p className="profile-detail-label">
                        Email
                      </p>

                      <p className="profile-detail-value profile-detail-email">
                        {email}
                      </p>
                    </div>
                  </div>

                  <div className="profile-detail">
                    <div className="profile-detail-icon profile-detail-icon-purple">
                      <ShieldCheck size={18} />
                    </div>

                    <div>
                      <p className="profile-detail-label">
                        Account Type
                      </p>

                      <p className="profile-detail-value">
                        Student
                      </p>
                    </div>
                  </div>

                  <div className="profile-detail">
                    <div className="profile-detail-icon profile-detail-icon-green">
                      <Sparkles size={18} />
                    </div>

                    <div>
                      <p className="profile-detail-label">
                        Learning Platform
                      </p>

                      <p className="profile-detail-value">
                        AI Study Assistant
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Study Statistics */}
              <div className="profile-section">
                <div className="profile-section-heading">
                  <div className="profile-section-icon">
                    <BarChart3 size={18} />
                  </div>

                  <div>
                    <h3>Study Statistics</h3>
                    <p>A snapshot of your learning activity</p>
                  </div>
                </div>

                <div className="profile-stats">
                  <div className="profile-stat-card">
                    <div className="profile-stat-icon profile-stat-icon-blue">
                      <BookMarked size={19} />
                    </div>

                    <div>
                      <p className="profile-stat-label">
                        Subjects
                      </p>

                      <p className="profile-stat-value">
                        3
                      </p>
                    </div>
                  </div>

                  <div className="profile-stat-card">
                    <div className="profile-stat-icon profile-stat-icon-purple">
                      <Trophy size={19} />
                    </div>

                    <div>
                      <p className="profile-stat-label">
                        Quizzes
                      </p>

                      <p className="profile-stat-value">
                        12
                      </p>
                    </div>
                  </div>

                  <div className="profile-stat-card">
                    <div className="profile-stat-icon profile-stat-icon-green">
                      <Clock size={19} />
                    </div>

                    <div>
                      <p className="profile-stat-label">
                        Study Hours
                      </p>

                      <p className="profile-stat-value">
                        28.5
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="profile-actions">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="profile-dashboard-button"
                >
                  Back to Dashboard
                  <ArrowLeft size={18} />
                </button>

                <button
                  onClick={handleLogout}
                  className="profile-logout-button"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </section>

          {/* Bottom note */}
          <div className="profile-footer-note">
            <div className="profile-footer-icon">
              <Sparkles size={17} />
            </div>

            <div>
              <strong>Keep learning, {studentName}!</strong>
              <span>
                Your progress and study activity will continue to grow as
                you learn.
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;