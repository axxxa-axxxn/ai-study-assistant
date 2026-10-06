import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Trophy,
  CheckCircle,
  XCircle,
  ArrowLeft,
  RotateCcw,
  Home,
  Bot,
  BookOpen,
  ClipboardList,
  BarChart3,
  User,
  LogOut,
  Target,
  Award,
  Sparkles,
  AlertCircle,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function QuizResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const { quizId } = useParams();
  const { user, logout } = useAuth();

  const quiz = location.state?.quiz;
  const answers = location.state?.answers || {};

  const studentName =
    user?.name ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "Student";

  const result = useMemo(() => {
    if (!quiz) {
      return {
        correct: 0,
        incorrect: 0,
        unanswered: 0,
        percentage: 0,
      };
    }

    let correct = 0;

    quiz.questions.forEach((question) => {
      if (answers[question.id] === question.answer) {
        correct++;
      }
    });

    const total = quiz.questions.length;
    const answered = Object.keys(answers).length;
    const incorrect = answered - correct;
    const unanswered = total - answered;
    const percentage = Math.round((correct / total) * 100);

    return {
      correct,
      incorrect,
      unanswered,
      percentage,
    };
  }, [quiz, answers]);

  const getPerformance = () => {
    if (result.percentage >= 90) {
      return {
        title: "Excellent Performance!",
        message:
          "Outstanding work! You have demonstrated a very strong understanding of this topic.",
      };
    }

    if (result.percentage >= 75) {
      return {
        title: "Great Job!",
        message:
          "Well done! You have a good understanding of the concepts. Keep practicing to reach the next level.",
      };
    }

    if (result.percentage >= 50) {
      return {
        title: "Good Effort!",
        message:
          "You have a basic understanding of the topic. Review the incorrect answers and keep practicing.",
      };
    }

    return {
      title: "Keep Practicing!",
      message:
        "Don't worry. Review the topic carefully and try the quiz again to improve your score.",
    };
  };

  const performance = getPerformance();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!quiz) {
    return (
      <div className="quiz-page">
        <main className="quiz-main">
          <div className="quiz-content">
            <div className="quiz-question-card">
              <div className="quiz-question-body">
                <div className="quiz-modal-icon">
                  <AlertCircle size={32} />
                </div>

                <h1 className="quiz-question-title">
                  Result Not Available
                </h1>

                <p className="quiz-hero-description">
                  This quiz result is no longer available. Please return to
                  the quizzes page and try again.
                </p>

                <button
                  className="quiz-nav-button quiz-nav-next"
                  onClick={() => navigate("/quizzes")}
                >
                  <ArrowLeft size={18} />
                  Back to Quizzes
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const performanceClass =
    result.percentage >= 75
      ? "quiz-result-positive"
      : result.percentage >= 50
      ? "quiz-result-average"
      : "quiz-result-low";

  return (
    <div className="quiz-page quiz-result-page">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-inner">
          <div className="sidebar-brand">
            <div className="brand-icon">
              <Sparkles size={20} />
            </div>

            <div>
              <div className="brand-name">StudyAI</div>
              <div className="brand-subtitle">AI Study Assistant</div>
            </div>
          </div>

          <nav className="sidebar-nav">
            <button
              className="sidebar-link"
              onClick={() => navigate("/dashboard")}
            >
              <Home size={19} />
              <span>Dashboard</span>
            </button>

            <button
              className="sidebar-link"
              onClick={() => navigate("/ai-assistant")}
            >
              <Bot size={19} />
              <span>AI Assistant</span>
            </button>

            <button
              className="sidebar-link"
              onClick={() => navigate("/subjects")}
            >
              <BookOpen size={19} />
              <span>Subjects</span>
            </button>

            <button
              className="sidebar-link sidebar-link-active"
              onClick={() => navigate("/quizzes")}
            >
              <ClipboardList size={19} />
              <span>Quizzes</span>
            </button>

            <button
              className="sidebar-link"
              onClick={() => navigate("/progress")}
            >
              <BarChart3 size={19} />
              <span>Progress</span>
            </button>

            <button
              className="sidebar-link"
              onClick={() => navigate("/profile")}
            >
              <User size={19} />
              <span>Profile</span>
            </button>
          </nav>

          <div className="sidebar-ai-card">
            <div className="sidebar-ai-icon">
              <Sparkles size={18} />
            </div>

            <div>
              <strong>Keep improving</strong>
              <p>Review your answers and strengthen your weak areas.</p>
            </div>
          </div>

          <div className="sidebar-user">
            <div className="user-avatar">
              {studentName.charAt(0).toUpperCase()}
            </div>

            <div className="sidebar-user-info">
              <strong>{studentName}</strong>
              <span>Student</span>
            </div>

            <button
              className="logout-button"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="quiz-main">
        <header className="dashboard-header">
          <div className="header-left">
            <button
              className="quiz-back-button"
              onClick={() => navigate("/quizzes")}
            >
              <ArrowLeft size={18} />
              <span>Back to Quizzes</span>
            </button>
          </div>

          <div className="quiz-header-profile">
            <div className="quiz-header-profile-text">
              <strong>{studentName}</strong>
              <span>Quiz completed</span>
            </div>

            <div className="quiz-avatar">
              {studentName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="quiz-content">
          {/* Result Hero */}
          <section className="quiz-result-hero">
            <div className="quiz-result-hero-decoration" />

            <div className="quiz-result-trophy">
              <Trophy size={42} />
            </div>

            <span className="quiz-result-eyebrow">
              Quiz Completed
            </span>

            <h1>{performance.title}</h1>

            <p>{performance.message}</p>

            <div className="quiz-result-score">
              <span className="quiz-result-score-value">
                {result.percentage}%
              </span>
              <span className="quiz-result-score-label">
                Overall Score
              </span>
            </div>
          </section>

          {/* Stats */}
          <section className="quiz-result-stats">
            <div className="quiz-result-stat-card quiz-result-correct">
              <div className="quiz-result-stat-icon">
                <CheckCircle size={22} />
              </div>

              <div>
                <span>Correct Answers</span>
                <strong>{result.correct}</strong>
              </div>
            </div>

            <div className="quiz-result-stat-card quiz-result-incorrect">
              <div className="quiz-result-stat-icon">
                <XCircle size={22} />
              </div>

              <div>
                <span>Incorrect Answers</span>
                <strong>{result.incorrect}</strong>
              </div>
            </div>

            <div className="quiz-result-stat-card quiz-result-unanswered">
              <div className="quiz-result-stat-icon">
                <AlertCircle size={22} />
              </div>

              <div>
                <span>Unanswered</span>
                <strong>{result.unanswered}</strong>
              </div>
            </div>

            <div className="quiz-result-stat-card quiz-result-total">
              <div className="quiz-result-stat-icon">
                <Target size={22} />
              </div>

              <div>
                <span>Total Questions</span>
                <strong>{quiz.questions.length}</strong>
              </div>
            </div>
          </section>

          {/* Quiz Information */}
          <section className="quiz-result-info-card">
            <div className="quiz-result-section-heading">
              <div className="quiz-result-section-icon">
                <Award size={20} />
              </div>

              <div>
                <span>Performance Summary</span>
                <h2>{quiz.title}</h2>
              </div>
            </div>

            <div className="quiz-result-info-grid">
              <div>
                <span>Subject</span>
                <strong>{quiz.subject}</strong>
              </div>

              <div>
                <span>Difficulty</span>
                <strong>{quiz.difficulty}</strong>
              </div>

              <div>
                <span>Duration</span>
                <strong>{quiz.duration}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong className={performanceClass}>
                  Completed
                </strong>
              </div>
            </div>
          </section>

          {/* Answer Review */}
          <section className="quiz-review-card">
            <div className="quiz-result-section-heading">
              <div className="quiz-result-section-icon">
                <ClipboardList size={20} />
              </div>

              <div>
                <span>Review</span>
                <h2>Answer Review</h2>
              </div>
            </div>

            <div className="quiz-review-list">
              {quiz.questions.map((question, index) => {
                const selectedAnswer = answers[question.id];
                const isAnswered = selectedAnswer !== undefined;
                const isCorrect =
                  isAnswered && selectedAnswer === question.answer;

                return (
                  <div
                    key={question.id}
                    className={`quiz-review-item ${
                      isCorrect
                        ? "quiz-review-correct"
                        : isAnswered
                        ? "quiz-review-incorrect"
                        : "quiz-review-unanswered"
                    }`}
                  >
                    <div className="quiz-review-number">
                      {index + 1}
                    </div>

                    <div className="quiz-review-content">
                      <h3>{question.question}</h3>

                      <div className="quiz-review-answer-row">
                        <span>Your answer:</span>

                        <strong>
                          {isAnswered
                            ? question.options[selectedAnswer]
                            : "Not answered"}
                        </strong>
                      </div>

                      {!isCorrect && (
                        <div className="quiz-review-answer-row quiz-review-correct-answer">
                          <span>Correct answer:</span>

                          <strong>
                            {question.options[question.answer]}
                          </strong>
                        </div>
                      )}
                    </div>

                    <div className="quiz-review-status">
                      {isCorrect ? (
                        <>
                          <CheckCircle size={19} />
                          <span>Correct</span>
                        </>
                      ) : isAnswered ? (
                        <>
                          <XCircle size={19} />
                          <span>Incorrect</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={19} />
                          <span>Skipped</span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Actions */}
          <section className="quiz-result-actions">
            <button
              className="quiz-result-action quiz-result-action-secondary"
              onClick={() => navigate("/quizzes")}
            >
              <ArrowLeft size={18} />
              Back to Quizzes
            </button>

            <button
              className="quiz-result-action quiz-result-action-primary"
              onClick={() => navigate(`/quiz/${quizId}`)}
            >
              <RotateCcw size={18} />
              Try Again
            </button>
          </section>

          {/* AI Recommendation */}
          <section className="quiz-result-ai-card">
            <div className="quiz-result-ai-icon">
              <Sparkles size={25} />
            </div>

            <div className="quiz-result-ai-content">
              <span>AI Study Recommendation</span>

              <h2>
                {result.percentage >= 75
                  ? "You're doing great — keep building momentum!"
                  : "Let's strengthen your understanding!"}
              </h2>

              <p>
                {result.percentage >= 75
                  ? "Use the AI Study Assistant to explore more advanced concepts and challenge yourself with new questions."
                  : "Ask the AI Study Assistant to explain the concepts you missed and create personalized practice material for you."}
              </p>
            </div>

            <button
              className="quiz-result-ai-button"
              onClick={() => navigate("/ai-assistant")}
            >
              Open AI Assistant
              <ArrowLeft
                size={17}
                style={{ transform: "rotate(180deg)" }}
              />
            </button>
          </section>

          {/* Dashboard shortcut */}
          <div className="quiz-result-dashboard-link">
            <button onClick={() => navigate("/dashboard")}>
              <Home size={17} />
              Return to Dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default QuizResult;