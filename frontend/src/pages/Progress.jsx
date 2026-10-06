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
  Clock,
  Trophy,
  Target,
  CheckCircle,
  TrendingUp,
  Award,
  Flame,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Progress() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const studentName =
    user?.name ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "Student";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const subjects = [
    {
      name: "Computer Organization & Assembly Language",
      shortName: "COAL",
      progress: 78,
      completed: 12,
      total: 15,
    },
    {
      name: "Information & Communication Technology",
      shortName: "ICT",
      progress: 65,
      completed: 10,
      total: 15,
    },
    {
      name: "Programming Fundamentals",
      shortName: "PF",
      progress: 52,
      completed: 8,
      total: 15,
    },
  ];

  const weeklyActivity = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 3.5 },
    { day: "Wed", hours: 1.5 },
    { day: "Thu", hours: 4 },
    { day: "Fri", hours: 3 },
    { day: "Sat", hours: 5 },
    { day: "Sun", hours: 2 },
  ];

  const achievements = [
    {
      title: "First Quiz",
      description: "Completed your first quiz",
      icon: Trophy,
    },
    {
      title: "10 Quiz Milestone",
      description: "Completed 10 quizzes",
      icon: Award,
    },
    {
      title: "Consistent Learner",
      description: "Studied for 7 days",
      icon: Flame,
    },
    {
      title: "COAL Mastery",
      description: "Reached 75% progress in COAL",
      icon: Target,
    },
  ];

  const quizPerformance = [
    {
      name: "COAL Fundamentals Quiz",
      subject: "COAL",
      score: 78,
      questions: 15,
    },
    {
      name: "ICT Basics Quiz",
      subject: "ICT",
      score: 85,
      questions: 10,
    },
    {
      name: "Programming Fundamentals",
      subject: "PF",
      score: 65,
      questions: 20,
    },
    {
      name: "Computer Architecture",
      subject: "COAL",
      score: 76,
      questions: 15,
    },
  ];

  const maxHours = Math.max(
    ...weeklyActivity.map((item) => item.hours)
  );

  return (
    <div className="progress-page">
      {/* Sidebar */}
      <aside className="progress-sidebar">
        <div className="progress-sidebar-inner">

          {/* Brand */}
          <div className="progress-sidebar-brand">
            <div className="progress-brand-icon">
              <BookOpen size={21} />
            </div>

            <div>
              <h1 className="progress-brand-title">
                StudyAI
              </h1>

              <p className="progress-brand-subtitle">
                Study smarter
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="progress-nav">

            <button
              onClick={() => navigate("/dashboard")}
              className="progress-nav-item"
            >
              <Home size={20} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigate("/ai-assistant")}
              className="progress-nav-item"
            >
              <Bot size={20} />
              <span>AI Assistant</span>
            </button>

            <button
              onClick={() => navigate("/subjects")}
              className="progress-nav-item"
            >
              <BookOpen size={20} />
              <span>Subjects</span>
            </button>

            <button
              onClick={() => navigate("/quizzes")}
              className="progress-nav-item"
            >
              <ClipboardList size={20} />
              <span>Quizzes</span>
            </button>

            <button
              onClick={() => navigate("/progress")}
              className="progress-nav-item progress-nav-item-active"
            >
              <BarChart3 size={20} />
              <span>Progress</span>
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="progress-nav-item"
            >
              <User size={20} />
              <span>Profile</span>
            </button>

          </nav>

          {/* Logout */}
          <div className="progress-logout-wrap">
            <button
              onClick={handleLogout}
              className="progress-logout"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </aside>

      {/* Main Content */}
      <main className="progress-main">

        {/* Content */}
        <div className="progress-content">

          {/* Welcome */}
          <div className="progress-welcome">
            <div>
              <p className="progress-welcome-kicker">
                KEEP GOING
              </p>

              <h1 className="progress-welcome-title">
                {studentName}'s Learning Progress
              </h1>

              <p className="progress-welcome-text">
                Here's a snapshot of your study activity and
                achievements.
              </p>
            </div>

            <div className="progress-welcome-badge">
              <TrendingUp size={17} />
              <span>You're improving</span>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="progress-summary-grid">

            <div className="progress-summary-card">
              <div className="progress-summary-top">
                <div className="progress-summary-icon progress-icon-indigo">
                  <TrendingUp size={21} />
                </div>

                <span className="progress-summary-trend">
                  +8%
                </span>
              </div>

              <p className="progress-summary-label">
                Overall Progress
              </p>

              <h3 className="progress-summary-value">
                68%
              </h3>
            </div>

            <div className="progress-summary-card">
              <div className="progress-summary-top">
                <div className="progress-summary-icon progress-icon-blue">
                  <Clock size={21} />
                </div>

                <span className="progress-summary-trend">
                  +4.5h
                </span>
              </div>

              <p className="progress-summary-label">
                Study Hours
              </p>

              <h3 className="progress-summary-value">
                28.5
              </h3>
            </div>

            <div className="progress-summary-card">
              <div className="progress-summary-top">
                <div className="progress-summary-icon progress-icon-purple">
                  <ClipboardList size={21} />
                </div>

                <span className="progress-summary-trend">
                  Active
                </span>
              </div>

              <p className="progress-summary-label">
                Quizzes Completed
              </p>

              <h3 className="progress-summary-value">
                12
              </h3>
            </div>

            <div className="progress-summary-card">
              <div className="progress-summary-top">
                <div className="progress-summary-icon progress-icon-green">
                  <Target size={21} />
                </div>

                <span className="progress-summary-trend">
                  Good
                </span>
              </div>

              <p className="progress-summary-label">
                Average Quiz Score
              </p>

              <h3 className="progress-summary-value">
                76%
              </h3>
            </div>

          </div>

          {/* Overall Progress + Weekly Activity */}
          <div className="progress-grid-two">

            {/* Overall Progress */}
            <section className="progress-card">
              <div className="progress-card-header">
                <div>
                  <h2 className="progress-card-title">
                    Overall Progress
                  </h2>

                  <p className="progress-card-subtitle">
                    Your overall course completion
                  </p>
                </div>
              </div>

              <div className="progress-overall-body">

                <div className="progress-ring">
                  <div className="progress-ring-inner">
                    <strong>68%</strong>
                    <span>Complete</span>
                  </div>
                </div>

                <div className="progress-course">

                  <div className="progress-course-row">
                    <span>Course completion</span>
                    <strong>68%</strong>
                  </div>

                  <div className="progress-course-track">
                    <div
                      className="progress-course-fill"
                      style={{ width: "68%" }}
                    />
                  </div>

                  <div className="progress-mini-grid">

                    <div className="progress-mini-stat">
                      <strong className="progress-mini-value">
                        30
                      </strong>

                      <span className="progress-mini-label">
                        Completed Topics
                      </span>
                    </div>

                    <div className="progress-mini-stat">
                      <strong className="progress-mini-value">
                        15
                      </strong>

                      <span className="progress-mini-label">
                        Remaining
                      </span>
                    </div>

                    <div className="progress-mini-stat">
                      <strong className="progress-mini-value">
                        3
                      </strong>

                      <span className="progress-mini-label">
                        Subjects
                      </span>
                    </div>

                  </div>
                </div>
              </div>
            </section>

            {/* Weekly Activity */}
            <section className="progress-card">

              <div className="progress-card-header">
                <div>
                  <h2 className="progress-card-title">
                    Weekly Activity
                  </h2>

                  <p className="progress-card-subtitle">
                    Hours studied this week
                  </p>
                </div>

                <div className="progress-activity-total">
                  21.5h
                </div>
              </div>

              <div className="progress-chart">

                {weeklyActivity.map((item) => (
                  <div
                    className="progress-bar-column"
                    key={item.day}
                  >
                    <span className="progress-bar-value">
                      {item.hours}h
                    </span>

                    <div className="progress-bar-track">
                      <div
                        className="progress-bar-fill"
                        style={{
                          height: `${(item.hours / maxHours) * 100}%`,
                        }}
                      />
                    </div>

                    <span className="progress-day">
                      {item.day}
                    </span>
                  </div>
                ))}

              </div>
            </section>

          </div>

          {/* Subject Progress */}
          <section className="progress-section-card">

            <div className="progress-section-header">
              <div>
                <h2 className="progress-section-title">
                  Subject Progress
                </h2>

                <p className="progress-section-subtitle">
                  See how you're progressing in each subject
                </p>
              </div>

              <button
                onClick={() => navigate("/subjects")}
                className="progress-section-link"
              >
                View Subjects
                <ArrowLeft size={16} />
              </button>
            </div>

            <div className="progress-subject-list">

              {subjects.map((subject) => (
                <div
                  className="progress-subject-row"
                  key={subject.shortName}
                >

                  <div className="progress-subject-info">

                    <div className="progress-subject-icon">
                      <BookOpen size={18} />
                    </div>

                    <div>
                      <h3 className="progress-subject-name">
                        {subject.shortName}
                      </h3>

                      <p className="progress-subject-full">
                        {subject.name}
                      </p>
                    </div>

                  </div>

                  <div className="progress-subject-progress">

                    <div className="progress-subject-meta">
                      <span>
                        {subject.completed}/{subject.total} topics
                      </span>

                      <strong>
                        {subject.progress}%
                      </strong>
                    </div>

                    <div className="progress-subject-track">
                      <div
                        className="progress-subject-fill"
                        style={{
                          width: `${subject.progress}%`,
                        }}
                      />
                    </div>

                  </div>

                  <div className="progress-subject-score">
                    {subject.progress}%
                  </div>

                </div>
              ))}

            </div>
          </section>

          {/* Quiz Performance */}
          <section className="progress-section-card">

            <div className="progress-section-header">
              <div>
                <h2 className="progress-section-title">
                  Quiz Performance
                </h2>

                <p className="progress-section-subtitle">
                  Your recent quiz scores
                </p>
              </div>

              <button
                onClick={() => navigate("/quizzes")}
                className="progress-section-link"
              >
                All Quizzes
                <ArrowLeft size={16} />
              </button>
            </div>

            <div className="progress-quiz-list">

              {quizPerformance.map((quiz) => (
                <div
                  className="progress-quiz-item"
                  key={quiz.name}
                >

                  <div className="progress-quiz-icon">
                    <CheckCircle size={19} />
                  </div>

                  <div className="progress-quiz-info">
                    <h3 className="progress-quiz-title">
                      {quiz.name}
                    </h3>

                    <p className="progress-quiz-meta">
                      {quiz.subject} • {quiz.questions} questions
                    </p>
                  </div>

                  <div className="progress-quiz-score-wrap">

                    <div className="progress-quiz-score-bar">
                      <div
                        style={{
                          width: `${quiz.score}%`,
                        }}
                      />
                    </div>

                    <strong className="progress-quiz-score">
                      {quiz.score}%
                    </strong>

                  </div>

                </div>
              ))}

            </div>
          </section>

          {/* Achievements */}
          <section className="progress-section-card">

            <div className="progress-section-header">
              <div>
                <h2 className="progress-section-title">
                  Achievements
                </h2>

                <p className="progress-section-subtitle">
                  Milestones you've reached
                </p>
              </div>
            </div>

            <div className="progress-achievement-grid">

              {achievements.map((achievement) => {
                const Icon = achievement.icon;

                return (
                  <div
                    className="progress-achievement-card"
                    key={achievement.title}
                  >

                    <div className="progress-achievement-icon">
                      <Icon size={22} />
                    </div>

                    <div>
                      <h3 className="progress-achievement-title">
                        {achievement.title}
                      </h3>

                      <p className="progress-achievement-text">
                        {achievement.description}
                      </p>
                    </div>

                  </div>
                );
              })}

            </div>
          </section>

          {/* AI Assistant CTA */}
          <section className="progress-ai-cta">

            <div className="progress-ai-decoration" />

            <div className="progress-ai-content">

              <div className="progress-ai-icon">
                <Bot size={24} />
              </div>

              <div>
                <h2 className="progress-ai-title">
                  Need help improving your progress?
                </h2>

                <p className="progress-ai-text">
                  Ask your AI Study Assistant for personalized
                  explanations, study tips, and exam preparation.
                </p>
              </div>

              <button
                onClick={() => navigate("/ai-assistant")}
                className="progress-ai-button"
              >
                Open AI Assistant
                <ArrowLeft size={17} />
              </button>

            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default Progress;