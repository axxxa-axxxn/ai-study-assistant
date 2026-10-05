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
          "Store permanent files",
          "Execute instructions and process data",
          "Display images on the monitor",
          "Connect the computer to the internet",
        ],
        answer: 1,
      },
      {
        id: 2,
        question: "Which component performs arithmetic and logical operations?",
        options: [
          "Control Unit",
          "RAM",
          "ALU",
          "Hard Disk",
        ],
        answer: 2,
      },
      {
        id: 3,
        question: "Which type of memory is volatile?",
        options: [
          "ROM",
          "RAM",
          "SSD",
          "Hard Disk",
        ],
        answer: 1,
      },
      {
        id: 4,
        question: "What does an assembly language program primarily use?",
        options: [
          "Natural language sentences",
          "Machine-independent objects",
          "Mnemonic instructions",
          "Database queries",
        ],
        answer: 2,
      },
      {
        id: 5,
        question: "Which register normally stores the address of the next instruction?",
        options: [
          "Program Counter",
          "Accumulator",
          "Instruction Register",
          "Stack Pointer",
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
          "Internet Computer Technology",
          "Information Control Technique",
          "Integrated Communication Tool",
        ],
        answer: 0,
      },
      {
        id: 2,
        question: "Which device is commonly used to connect computers in a network?",
        options: [
          "Scanner",
          "Switch",
          "Printer",
          "Keyboard",
        ],
        answer: 1,
      },
      {
        id: 3,
        question: "Which of the following is a web browser?",
        options: [
          "Google Chrome",
          "Windows",
          "Linux",
          "Python",
        ],
        answer: 0,
      },
      {
        id: 4,
        question: "What is the internet?",
        options: [
          "A single computer",
          "A global network of interconnected networks",
          "A type of printer",
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
        question: "Which of the following is used to store a value in a program?",
        options: [
          "Variable",
          "Loop",
          "Comment",
          "Compiler",
        ],
        answer: 0,
      },
      {
        id: 2,
        question: "Which statement is commonly used for decision making?",
        options: [
          "if",
          "include",
          "return",
          "import",
        ],
        answer: 0,
      },
      {
        id: 3,
        question: "Which loop is useful when the number of iterations is known?",
        options: [
          "if statement",
          "for loop",
          "switch statement",
          "class",
        ],
        answer: 1,
      },
      {
        id: 4,
        question: "What is a function?",
        options: [
          "A reusable block of code",
          "A type of variable",
          "A hardware component",
          "A database",
        ],
        answer: 0,
      },
      {
        id: 5,
        question: "Which data structure stores multiple values of the same type?",
        options: [
          "Array",
          "Operator",
          "Function",
          "Condition",
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
          "A collection of instructions supported by a processor",
          "A collection of files",
          "A memory device",
          "A networking protocol",
        ],
        answer: 0,
      },
      {
        id: 2,
        question: "Which register is commonly used as a stack pointer?",
        options: [
          "SP",
          "IP",
          "IR",
          "PC",
        ],
        answer: 0,
      },
      {
        id: 3,
        question: "What does the MOV instruction generally do?",
        options: [
          "Compare two values",
          "Move/copy data between operands",
          "Multiply two values",
          "Stop the processor",
        ],
        answer: 1,
      },
      {
        id: 4,
        question: "Which addressing mode uses a value directly in the instruction?",
        options: [
          "Immediate addressing",
          "Indirect addressing",
          "Register indirect",
          "Indexed addressing",
        ],
        answer: 0,
      },
      {
        id: 5,
        question: "What is a register?",
        options: [
          "A small high-speed storage location inside the CPU",
          "A large external storage device",
          "A network cable",
          "A type of software",
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
          "Large Access Network",
          "Linked Application Network",
          "Local Application Node",
        ],
        answer: 0,
      },
      {
        id: 2,
        question: "Which device forwards packets between networks?",
        options: [
          "Router",
          "Monitor",
          "Keyboard",
          "Scanner",
        ],
        answer: 0,
      },
      {
        id: 3,
        question: "What does IP stand for in networking?",
        options: [
          "Internet Protocol",
          "Internal Program",
          "Information Process",
          "Internet Program",
        ],
        answer: 0,
      },
      {
        id: 4,
        question: "Which protocol is commonly used to transfer web pages securely?",
        options: [
          "HTTPS",
          "FTP",
          "SMTP",
          "POP3",
        ],
        answer: 0,
      },
      {
        id: 5,
        question: "Which device provides wireless network access?",
        options: [
          "Wireless access point",
          "Keyboard",
          "CPU",
          "Printer",
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
        question: "Which concept allows a function to call itself?",
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
          "A hardware component",
          "A database table",
          "A programming language",
        ],
        answer: 0,
      },
      {
        id: 3,
        question: "Which operator is commonly used for logical AND?",
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
        question: "What does debugging mean?",
        options: [
          "Finding and fixing errors in a program",
          "Deleting all program files",
          "Installing hardware",
          "Creating a database",
        ],
        answer: 0,
      },
      {
        id: 5,
        question: "Which structure repeats a block of code?",
        options: [
          "Loop",
          "Variable",
          "Comment",
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
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Quiz Not Found
          </h1>

          <p className="mt-2 text-gray-500">
            The quiz you are looking for does not exist.
          </p>

          <button
            onClick={() => navigate("/quizzes")}
            className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const totalQuestions = quiz.questions.length;
  const answeredQuestions = Object.keys(answers).length;

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

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
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-gray-200 bg-white lg:block">
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

                <p className="text-xs text-gray-500">
                  Study smarter
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-4 py-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
            >
              <Home size={20} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigate("/ai-assistant")}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
            >
              <Bot size={20} />
              <span>AI Assistant</span>
            </button>

            <button
              onClick={() => navigate("/subjects")}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
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
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
            >
              <BarChart3 size={20} />
              <span>Progress</span>
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
            >
              <User size={20} />
              <span>Profile</span>
            </button>
          </nav>

          {/* Logout */}
          <div className="border-t border-gray-100 p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600"
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
        <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
          <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => navigate("/quizzes")}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              <ArrowLeft size={19} />
              Back to Quizzes
            </button>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-gray-900">
                  {studentName}
                </p>
                <p className="text-xs text-gray-500">
                  Quiz in progress
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
                {studentName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Quiz heading */}
          <div className="mb-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <p className="text-sm font-medium text-indigo-600">
                  {quiz.subject}
                </p>

                <h1 className="mt-1 text-2xl font-bold text-gray-900">
                  {quiz.title}
                </h1>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-sm text-gray-600">
                <Clock size={17} />
                <span>{quiz.duration}</span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Question {currentQuestion + 1} of {totalQuestions}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {answeredQuestions} of {totalQuestions} answered
                </p>
              </div>

              <span className="text-sm font-bold text-indigo-600">
                {Math.round(progress)}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="p-5 sm:p-8">
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 font-bold text-indigo-600">
                  {currentQuestion + 1}
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                    Multiple Choice Question
                  </p>

                  <h2 className="text-xl font-bold leading-8 text-gray-900">
                    {question.question}
                  </h2>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const selected = answers[question.id] === index;

                  return (
                    <button
                      key={option}
                      onClick={() => selectAnswer(index)}
                      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                        selected
                          ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                          : "border-gray-200 bg-white hover:border-indigo-300 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                          selected
                            ? "border-indigo-600 bg-indigo-600 text-white"
                            : "border-gray-300 bg-white text-gray-600"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>

                      <span
                        className={`flex-1 text-sm font-medium sm:text-base ${
                          selected
                            ? "text-indigo-900"
                            : "text-gray-700"
                        }`}
                      >
                        {option}
                      </span>

                      {selected && (
                        <CheckCircle
                          size={21}
                          className="shrink-0 text-indigo-600"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={goPrevious}
                  disabled={currentQuestion === 0}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition ${
                    currentQuestion === 0
                      ? "cursor-not-allowed border-gray-100 text-gray-300"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <ArrowLeft size={18} />
                  Previous
                </button>

                {currentQuestion === totalQuestions - 1 ? (
                  <button
                    onClick={() => setShowSubmitModal(true)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    <CheckCircle size={18} />
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={goNext}
                    className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Next Question
                    <ArrowRight size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Question navigator */}
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">
                Question Navigator
              </h3>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                Answered
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {quiz.questions.map((item, index) => {
                const answered = answers[item.id] !== undefined;
                const active = index === currentQuestion;

                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentQuestion(index)}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition ${
                      active
                        ? "bg-indigo-600 text-white ring-2 ring-indigo-200"
                        : answered
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <Flag size={15} />
              You can use the navigator to move directly between questions.
            </div>
          </div>
        </div>
      </main>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <CheckCircle size={28} />
            </div>

            <h2 className="mt-4 text-center text-xl font-bold text-gray-900">
              Submit Quiz?
            </h2>

            <p className="mt-2 text-center text-sm leading-6 text-gray-500">
              You have answered{" "}
              <span className="font-semibold text-gray-700">
                {answeredQuestions}
              </span>{" "}
              out of{" "}
              <span className="font-semibold text-gray-700">
                {totalQuestions}
              </span>{" "}
              questions.
            </p>

            {answeredQuestions < totalQuestions && (
              <div className="mt-4 rounded-xl bg-yellow-50 p-3 text-center text-sm text-yellow-700">
                You still have unanswered questions.
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Continue Quiz
              </button>

              <button
                onClick={handleSubmit}
                className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;