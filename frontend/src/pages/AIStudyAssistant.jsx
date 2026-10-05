import { useState } from "react";
import {
  ArrowLeft,
  Bot,
  BookOpen,
  Brain,
  CheckCircle,
  Lightbulb,
  Menu,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function AIStudyAssistant() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! 👋 I'm your AI Study Assistant. Ask me anything about your subjects, concepts, quizzes, or exam preparation.",
    },
  ]);

  const suggestions = [
    "Explain this concept simply",
    "Help me prepare for my exam",
    "Generate quiz questions",
    "Make a study plan",
  ];

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmedMessage,
    };

    setMessages((previous) => [...previous, userMessage]);
    setMessage("");

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: "ai",
        text: getDummyResponse(trimmedMessage),
      };

      setMessages((previous) => [...previous, aiResponse]);
    }, 500);
  };

  const handleSuggestion = (suggestion) => {
    setMessage(suggestion);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const getDummyResponse = (question) => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes("quiz")) {
      return "Sure! Here's a quick practice question: Which component of a computer is responsible for executing instructions? A) RAM B) CPU C) Hard Disk D) Monitor. The correct answer is B) CPU. 🧠";
    }

    if (
      lowerQuestion.includes("study plan") ||
      lowerQuestion.includes("prepare")
    ) {
      return "A good study plan is to divide your time into focused sessions. Start with difficult topics, take short breaks, then review what you learned. Later, we'll connect this feature to your actual subjects and progress.";
    }

    if (
      lowerQuestion.includes("explain") ||
      lowerQuestion.includes("concept")
    ) {
      return "Of course! Send me the exact concept you'd like explained, and I'll break it down into simple steps with examples. 💡";
    }

    return "That's a great question! In the connected version, I'll use your course material and AI services to provide a detailed answer. For now, this is a frontend-only demonstration. 🤖";
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }
        lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Bot size={25} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                AI Study
              </h1>

              <p className="text-xs text-slate-500">
                Assistant
              </p>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-slate-500 lg:hidden"
          >
            <X size={23} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
          >
            <BookOpen size={20} />
            Dashboard
          </button>

          <button
            className="flex w-full items-center gap-3 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-600"
          >
            <Bot size={20} />
            AI Study Assistant
          </button>

          <button
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
          >
            <BookOpen size={20} />
            Subjects
          </button>

          <button
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
          >
            <CheckCircle size={20} />
            Quizzes
          </button>

          <button
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
          >
            <Brain size={20} />
            Progress
          </button>

          <button
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
          >
            <User size={20} />
            Profile
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={24} />
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            >
              <ArrowLeft size={21} />
            </button>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
                AI Learning
              </p>

              <h2 className="font-semibold text-slate-900">
                AI Study Assistant
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-600">
            <Sparkles size={17} />
            AI Assistant
          </div>
        </header>

        {/* Page */}
        <div className="flex min-h-[calc(100vh-5rem)] flex-col p-4 sm:p-6 lg:p-8">
          {/* Intro */}
          <div className="mx-auto mb-6 w-full max-w-5xl">
            <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-white p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-sm">
                  <Bot size={28} />
                </div>

                <div>
                  <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    Your Personal AI Study Assistant
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    Ask questions, understand concepts, practice quizzes,
                    and improve your study routine.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat */}
          <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <Bot size={20} />
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    Study Assistant
                  </p>

                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-xs text-slate-500">
                      Ready to help
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  setMessages([
                    {
                      id: Date.now(),
                      sender: "ai",
                      text: "Chat cleared. What would you like to study? 📚",
                    },
                  ])
                }
                className="text-xs font-medium text-slate-500 hover:text-indigo-600"
              >
                Clear chat
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-6">
              {messages.map((item) => {
                const isAI = item.sender === "ai";

                return (
                  <div
                    key={item.id}
                    className={`flex gap-3 ${
                      isAI ? "justify-start" : "justify-end"
                    }`}
                  >
                    {isAI && (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                        <Bot size={18} />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[70%]
                      ${
                        isAI
                          ? "rounded-tl-md bg-slate-100 text-slate-700"
                          : "rounded-tr-md bg-indigo-600 text-white"
                      }`}
                    >
                      {item.text}
                    </div>

                    {!isAI && (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                        <User size={18} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Suggestions */}
            <div className="border-t border-slate-100 px-5 pt-4">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <Lightbulb size={15} />
                Try asking
              </div>

              <div className="flex gap-2 overflow-x-auto pb-3">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestion(suggestion)}
                    className="shrink-0 rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-slate-200 p-4 sm:p-5">
              <div className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask your study question..."
                  rows={1}
                  className="max-h-32 min-h-[42px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />

                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send size={18} />
                </button>
              </div>

              <p className="mt-2 text-center text-xs text-slate-400">
                AI responses are currently simulated for frontend testing.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AIStudyAssistant;