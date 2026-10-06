import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Flag,
  BookOpen,
  Home,
  Bot,
  ClipboardList,
  BarChart3,
  User,
  LogOut,
  Sparkles,
  Target,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const quizData = {
  1: {
    title: "COAL Fundamentals Quiz",
    subject: "Computer Organization & Assembly Language",
    difficulty: "Medium",
    duration: "20 min",
    questions: [
      {
        id: 1,
        question: "What is the main function of the CPU?",
        options: [
          "Store files permanently",
          "Execute instructions and process data",
          "Display graphics",
          "Connect to the internet",
        ],
        answer: 1,
      },
      {
        id: 2,
        question:
          "Which component of the CPU performs arithmetic and logical operations?",
        options: [
          "Control Unit",
          "Register",
          "ALU",
          "Cache",
        ],
        answer: 2,
      },
      {
        id: 3,
        question: "Which type of memory is volatile?",
        options: [
          "ROM",
          "RAM",
          "Hard Disk",
          "SSD",
        ],
        answer: 1,
      },
      {
        id: 4,
        question: "An assembly language program primarily uses:",
        options: [
          "Machine code only",
          "Binary numbers",
          "Mnemonic instructions",
          "HTML tags",
        ],
        answer: 2,
      },
      {
        id: 5,
        question:
          "Which register stores the address of the next instruction to be executed?",
        options: [
          "Program Counter",
          "Accumulator",
          "Stack Pointer",
          "Instruction Register",
        ],
        answer: 0,
      },
    ],
  },

  2: {
    title: "ICT Basics Quiz",
    subject: "Information & Communication Technology",
    difficulty: "Easy",
    duration: "15 min",
    questions: [
      {
        id: 1,
        question: "What does ICT stand for?",
        options: [
          "Information and Communication Technology",
          "Internet and Computer Technology",
          "Information Control Technology",
          "Integrated Communication Tools",
        ],
        answer: 0,
      },
      {
        id: 2,
        question: "Which device is commonly used to connect devices in a network?",
        options: [
          "Monitor",
          "Switch",
          "Keyboard",
          "Printer",
        ],
        answer: 1,
      },
      {
        id: 3,
        question: "Which of the following is a web browser?",
        options: [
          "Google Chrome",
          "Microsoft Word",
          "Windows",
          "Adobe Photoshop",
        ],
        answer: 0,
      },
      {
        id: 4,
        question: "What is the Internet?",
        options: [
          "A single computer",
          "A global network of interconnected networks",
          "A type of operating system",
          "A programming language",
        ],
        answer: 1,
      },
      {
        id: 5,
        question: "Which technology is commonly used for wireless networking?",
        options: [
          "Wi-Fi",
          "HDMI",
          "USB",
          "VGA",
        ],
        answer: 0,
      },
    ],
  },

  3: {
    title: "Programming Fundamentals",
    subject: "Programming Fundamentals",
    difficulty: "Medium",
    duration: "25 min",
    questions: [
      {
        id: 1,
        question: "Which programming construct is used to store a value?",
        options: [
          "Variable",
          "Loop",
          "Function",
          "Condition",
        ],
        answer: 0,
      },
      {
        id: 2,
        question: "Which statement is commonly used for decision making?",
        options: [
          "if",
          "for",
          "print",
          "return",
        ],
        answer: 0,
      },
      {
        id: 3,
        question:
          "Which loop is commonly used when the number of iterations is known?",
        options: [
          "while loop",
          "for loop",
          "if statement",
          "switch statement",
        ],
        answer: 1,
      },
      {
        id: 4,
        question: "What is a function?",
        options: [
          "A reusable block of code",
          "A type of variable",
          "A database table",
          "A hardware component",
        ],
        answer: 0,
      },
      {
        id: 5,
        question:
          "Which data structure stores multiple values of the same type?",
        options: [
          "Array",
          "Function",
          "Loop",
          "Operator",
        ],
        answer: 0,
      },
    ],
  },

  4: {
    title: "Assembly Language Challenge",
    subject: "Computer Organization & Assembly Language",
    difficulty: "Hard",
    duration: "25 min",
    questions: [
      {
        id: 1,
        question: "What is an instruction set?",
        options: [
          "Collection of instructions supported by a processor",
          "A group of computer files",
          "A type of memory",
          "A programming editor",
        ],
        answer: 0,
      },
      {
        id: 2,
        question: "Which register is commonly known as the Stack Pointer?",
        options: [
          "SP",
          "PC",
          "IR",
          "ACC",
        ],
        answer: 0,
      },
      {
        id: 3,
        question: "What does the MOV instruction generally do?",
        options: [
          "Compare two values",
          "Move or copy data between operands",
          "Multiply two values",
          "Stop the processor",
        ],
        answer: 1,
      },
      {
        id: 4,
        question:
          "Which addressing mode places the actual value directly in the instruction?",
        options: [
          "Immediate addressing",
          "Register addressing",
          "Direct addressing",
          "Indirect addressing",
        ],
        answer: 0,
      },
      {
        id: 5,
        question: "What is a register?",
        options: [
          "Small high-speed storage inside the CPU",
          "A permanent storage device",
          "A network connection",
          "A display component",
        ],
        answer: 0,
      },
    ],
  },

  5: {
    title: "Networking Basics",
    subject: "Information & Communication Technology",
    difficulty: "Easy",
    duration: "18 min",
    questions: [
      {
        id: 1,
        question: "What does LAN stand for?",
        options: [
          "Local Area Network",
          "Large Area Network",
          "Linked Access Network",
          "Local Access Node",
        ],
        answer: 0,
      },
      {
        id: 2,
        question: "Which device forwards packets between networks?",
        options: [
          "Router",
          "Switch",
          "Hub",
          "Repeater",
        ],
        answer: 0,
      },
      {
        id: 3,
        question: "What does IP stand for in networking?",
        options: [
          "Internet Protocol",
          "Internal Program",
          "Internet Process",
          "Integrated Protocol",
        ],
        answer: 0,
      },
      {
        id: 4,
        question: "Which protocol is commonly used for secure web pages?",
        options: [
          "FTP",
          "HTTP",
          "HTTPS",
          "SMTP",
        ],
        answer: 2,
      },
      {
        id: 5,
        question: "Which device provides wireless network access?",
        options: [
          "Wireless access point",
          "Monitor",
          "Printer",
          "Scanner",
        ],
        answer: 0,
      },
    ],
  },

  6: {
    title: "Programming Logic Challenge",
    subject: "Programming Fundamentals",
    difficulty: "Hard",
    duration: "20 min",
    questions: [
      {
        id: 1,
        question: "What is it called when a function calls itself?",
        options: [
          "Recursion",
          "Iteration",
          "Compilation",
          "Inheritance",
        ],
        answer: 0,
      },
      {
        id: 2,
        question: "What is an algorithm?",
        options: [
          "A step-by-step procedure for solving a problem",
          "A programming language",
          "A hardware device",
          "A database",
        ],
        answer: 0,
      },
      {
        id: 3,
        question: "Which operator represents logical AND in many programming languages?",
        options: [
          "&&",
          "||",
          "!",
          "==",
        ],
        answer: 0,
      },
      {
        id: 4,
        question: "What is debugging?",
        options: [
          "Finding and fixing errors in a program",
          "Creating a database",
          "Designing a website",
          "Installing an operating system",
        ],
        answer: 0,
      },
      {
        id: 5,
        question: "What programming construct repeats a block of code?",
        options: [
          "Loop",
          "Variable",
          "Function",
          "Constant",
        ],
        answer: 0,
      },
    ],
  },
};

function Quiz() {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { user, logout } = useAuth();

  const quiz = quizData[quizId];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const studentName =
    user?.name ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "Student";

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

                <h1 className="quiz-question-title">Quiz Not Found</h1>

                <p className="quiz-hero-description">
                  The quiz you are looking for does not exist.
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

  const question = quiz.questions[currentQuestion];
  const totalQuestions = quiz.questions.length;
  const answeredQuestions = Object.keys(answers).length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const remainingQuestions = totalQuestions - answeredQuestions;

  const difficultyClass = quiz.difficulty.toLowerCase();

  const selectAnswer = (optionIndex) => {
    setAnswers((previous) => ({
      ...previous,
      [question.id]: optionIndex,
    }));
  };

  const goNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((previous) => previous + 1);
    }
  };

  const goPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  };

  const handleSubmit = () => {
    navigate(`/quiz/${quizId}/result`, {
      state: {
        quiz,
        answers,
      },
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="quiz-page">
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
              <strong>Stay focused</strong>
              <p>Keep practicing to improve your performance.</p>
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
              <span>Keep learning</span>
            </div>

            <div className="quiz-avatar">
              {studentName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="quiz-content">
          {/* Hero */}
          <section className="quiz-hero">
            <div className="quiz-hero-decoration quiz-hero-decoration-one" />
            <div className="quiz-hero-decoration quiz-hero-decoration-two" />

            <div className="quiz-hero-content">
              <div className="quiz-badges">
                <span className="quiz-badge">
                  <BookOpen size={14} />
                  {quiz.subject}
                </span>

                <span className={`quiz-badge quiz-badge-${difficultyClass}`}>
                  <Target size={14} />
                  {quiz.difficulty}
                </span>
              </div>

              <h1>{quiz.title}</h1>

              <p className="quiz-hero-description">
                Test your knowledge and strengthen your understanding of
                important concepts.
              </p>
            </div>

            <div className="quiz-duration">
              <div className="quiz-duration-icon">
                <Clock size={22} />
              </div>

              <div>
                <div className="quiz-duration-label">Time</div>
                <div className="quiz-duration-value">{quiz.duration}</div>
              </div>
            </div>
          </section>

          {/* Progress */}
          <section className="quiz-progress-card">
            <div className="quiz-progress-top">
              <div className="quiz-progress-info">
                <div className="quiz-progress-icon">
                  <Flag size={17} />
                </div>

                <div>
                  <strong>
                    Question {currentQuestion + 1} of {totalQuestions}
                  </strong>
                  <span>{answeredQuestions} answered</span>
                </div>
              </div>

              <div className="quiz-progress-percent">
                {Math.round(progress)}%
              </div>
            </div>

            <div className="quiz-progress-track">
              <div
                className="quiz-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </section>

          {/* Question */}
          <section className="quiz-question-card">
            <div className="quiz-question-accent" />

            <div className="quiz-question-body">
              <div className="quiz-question-meta">
                <div className="quiz-question-number">
                  {currentQuestion + 1}
                </div>

                <div>
                  <div className="quiz-question-type">
                    Multiple Choice
                  </div>

                  {answers[question.id] !== undefined && (
                    <div className="quiz-question-answered">
                      <CheckCircle size={15} />
                      Answered
                    </div>
                  )}
                </div>
              </div>

              <h2 className="quiz-question-heading">
                {question.question}
              </h2>

              <div className="quiz-options">
                {question.options.map((option, index) => {
                  const selected = answers[question.id] === index;

                  return (
                    <button
                      key={index}
                      type="button"
                      className={`quiz-option ${
                        selected ? "quiz-option-selected" : ""
                      }`}
                      onClick={() => selectAnswer(index)}
                    >
                      <span className="quiz-option-letter">
                        {String.fromCharCode(65 + index)}
                      </span>

                      <span className="quiz-option-text">
                        {option}
                      </span>

                      {selected ? (
                        <span className="quiz-option-check">
                          <CheckCircle size={20} />
                        </span>
                      ) : (
                        <ChevronRight
                          size={19}
                          className="quiz-option-arrow"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="quiz-navigation">
            <button
              className="quiz-nav-button quiz-nav-previous"
              onClick={goPrevious}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft size={18} />
              Previous
            </button>

            {currentQuestion < totalQuestions - 1 ? (
              <button
                className="quiz-nav-button quiz-nav-next"
                onClick={goNext}
              >
                Next Question
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                className="quiz-nav-button quiz-nav-submit"
                onClick={() => setShowSubmitModal(true)}
              >
                Submit Quiz
                <CheckCircle size={18} />
              </button>
            )}
          </div>

          {/* Navigator */}
          <section className="quiz-navigator">
            <div className="quiz-navigator-heading">
              <div>
                <h3>Question Navigator</h3>
                <p>Jump to any question</p>
              </div>

              <div className="quiz-legend">
                <span className="quiz-legend-item">
                  <span className="quiz-legend-dot quiz-dot-current" />
                  Current
                </span>

                <span className="quiz-legend-item">
                  <span className="quiz-legend-dot quiz-dot-answered" />
                  Answered
                </span>

                <span className="quiz-legend-item">
                  <span className="quiz-legend-dot quiz-dot-unanswered" />
                  Unanswered
                </span>
              </div>
            </div>

            <div className="quiz-number-grid">
              {quiz.questions.map((item, index) => {
                const isCurrent = index === currentQuestion;
                const isAnswered = answers[item.id] !== undefined;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`quiz-number-button ${
                      isCurrent ? "quiz-number-active" : ""
                    } ${
                      isAnswered && !isCurrent
                        ? "quiz-number-answered"
                        : ""
                    }`}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    {index + 1}
                    {isAnswered && !isCurrent && (
                      <CheckCircle size={12} />
                    )}
                  </button>
                );
              })}
            </div>

            <p className="quiz-navigator-note">
              You can change your answers at any time before submitting.
            </p>
          </section>

          {/* Reminder */}
          <div className="quiz-reminder">
            <AlertCircle size={19} />
            <div>
              <strong>Take your time</strong>
              <span>
                Read each question carefully before selecting your answer.
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div
          className="quiz-modal-overlay"
          onClick={() => setShowSubmitModal(false)}
        >
          <div
            className="quiz-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="quiz-modal-accent" />

            <div className="quiz-modal-body">
              <div className="quiz-modal-icon">
                <CheckCircle size={30} />
              </div>

              <h2>Submit Quiz?</h2>

              <p className="quiz-modal-description">
                Are you sure you want to submit your quiz? You will not be
                able to change your answers after submission.
              </p>

              <div className="quiz-modal-stats">
                <div className="quiz-modal-stat">
                  <span>Answered</span>
                  <strong className="quiz-modal-stat-highlight">
                    {answeredQuestions}
                  </strong>
                </div>

                <div className="quiz-modal-stat">
                  <span>Remaining</span>
                  <strong>{remainingQuestions}</strong>
                </div>

                <div className="quiz-modal-stat">
                  <span>Total</span>
                  <strong>{totalQuestions}</strong>
                </div>
              </div>

              {remainingQuestions > 0 && (
                <div className="quiz-modal-warning">
                  <AlertCircle size={17} />
                  You still have {remainingQuestions} unanswered question
                  {remainingQuestions !== 1 ? "s" : ""}.
                </div>
              )}

              <div className="quiz-modal-actions">
                <button
                  className="quiz-modal-button quiz-modal-cancel"
                  onClick={() => setShowSubmitModal(false)}
                >
                  Continue Quiz
                </button>

                <button
                  className="quiz-modal-button quiz-modal-submit"
                  onClick={handleSubmit}
                >
                  Submit Quiz
                  <CheckCircle size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;