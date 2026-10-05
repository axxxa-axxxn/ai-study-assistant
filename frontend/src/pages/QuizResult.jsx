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
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
            <XCircle size={30} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Result Not Available
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            This result page was opened without a completed quiz.
          </p>

          <button
            onClick={() => navigate("/quizzes")}
            className="mt-6 w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

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

          {/* Logout */}
          <div className="border-t border-gray-100 p-4">
            <button
              onClick={handleLogout}
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
        <header className="border-b border-gray-200 bg-white">
          <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => navigate("/quizzes")}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
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
                  Quiz completed
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
                {studentName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Result Hero */}
          <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white shadow-sm sm:p-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/15 ring-8 ring-white/10">
                <Trophy size={38} />
              </div>

              <p className="mt-5 text-sm font-medium text-indigo-100">
                Quiz Completed
              </p>

              <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
                {performance.title}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base">
                {performance.message}
              </p>

              {/* Score */}
              <div className="mt-7">
                <div className="text-6xl font-bold">
                  {result.percentage}%
                </div>

                <p className="mt-2 text-sm text-indigo-100">
                  {result.correct} out of {quiz.questions.length} correct
                </p>
              </div>
            </div>
          </section>

          {/* Score cards */}
          <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-green-100 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <CheckCircle size={22} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Correct Answers
                  </p>

                  <p className="text-2xl font-bold text-gray-900">
                    {result.correct}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-red-100 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <XCircle size={22} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Incorrect Answers
                  </p>

                  <p className="text-2xl font-bold text-gray-900">
                    {result.incorrect}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-yellow-100 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
                  <Target size={22} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Unanswered
                  </p>

                  <p className="text-2xl font-bold text-gray-900">
                    {result.unanswered}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Quiz information */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Award size={23} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {quiz.title}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {quiz.subject}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">
                  Difficulty
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {quiz.difficulty}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">
                  Questions
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {quiz.questions.length}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">
                  Score
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {result.correct}/{quiz.questions.length}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">
                  Percentage
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {result.percentage}%
                </p>
              </div>
            </div>
          </section>

          {/* Answer review */}
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-gray-900">
                Answer Review
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Review your answers and identify areas that need more
                practice.
              </p>
            </div>

            <div className="space-y-4">
              {quiz.questions.map((question, index) => {
                const selectedAnswer = answers[question.id];
                const isAnswered = selectedAnswer !== undefined;
                const isCorrect =
                  isAnswered && selectedAnswer === question.answer;

                return (
                  <div
                    key={question.id}
                    className={`rounded-xl border p-4 ${
                      isCorrect
                        ? "border-green-200 bg-green-50/50"
                        : isAnswered
                        ? "border-red-200 bg-red-50/50"
                        : "border-yellow-200 bg-yellow-50/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          isCorrect
                            ? "bg-green-100 text-green-700"
                            : isAnswered
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {isCorrect ? (
                          <CheckCircle size={18} />
                        ) : isAnswered ? (
                          <XCircle size={18} />
                        ) : (
                          <Target size={18} />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-gray-500">
                          Question {index + 1}
                        </p>

                        <p className="mt-1 font-semibold leading-6 text-gray-900">
                          {question.question}
                        </p>

                        <div className="mt-3 space-y-1 text-sm">
                          <p className="text-gray-600">
                            <span className="font-medium">
                              Your answer:
                            </span>{" "}
                            {isAnswered
                              ? question.options[selectedAnswer]
                              : "Not answered"}
                          </p>

                          {!isCorrect && (
                            <p className="text-green-700">
                              <span className="font-medium">
                                Correct answer:
                              </span>{" "}
                              {question.options[question.answer]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Actions */}
          <section className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate(`/quiz/${quizId}`)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              <RotateCcw size={19} />
              Retry Quiz
            </button>

            <button
              onClick={() => navigate("/quizzes")}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <ClipboardList size={19} />
              All Quizzes
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <Home size={19} />
              Dashboard
            </button>
          </section>

          {/* AI recommendation */}
          <section className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  <Bot size={21} />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Want to improve your score?
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Ask the AI Study Assistant to explain difficult
                    concepts or create additional practice questions.
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/ai-assistant")}
                className="whitespace-nowrap rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-600 shadow-sm transition hover:bg-indigo-100"
              >
                Ask AI Assistant
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default QuizResult;