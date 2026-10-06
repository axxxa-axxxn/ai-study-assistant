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
import { askRag } from "../services/api";

function AIStudyAssistant() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! 👋 I'm your AI Study Assistant. Ask me anything about your study material, concepts, quizzes, or exam preparation.",
    },
  ]);

  const suggestions = [
    "What is the RoadSafe project?",
    "Explain this concept simply",
    "Generate quiz questions",
    "Help me prepare for my exam",
  ];

  const handleSend = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmedMessage,
    };

    setMessages((previous) => [...previous, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const data = await askRag(trimmedMessage);

      const aiResponse = {
        id: Date.now() + 1,
        sender: "ai",
        text:
          data.response ||
          "I couldn't generate a response from the study material.",
      };

      setMessages((previous) => [...previous, aiResponse]);
    } catch (error) {
      console.error("RAG Error:", error);

      const errorMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text:
          error.message ||
          "Sorry, I couldn't connect to the AI Study Assistant.",
      };

      setMessages((previous) => [...previous, errorMessage]);
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="ai-assistant-page">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="ai-assistant-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`ai-assistant-sidebar ${
          sidebarOpen ? "ai-assistant-sidebar-open" : ""
        }`}
      >
        <div className="ai-sidebar-brand">
          <div className="ai-brand-left">
            <div className="ai-brand-icon">
              <Bot size={24} />
            </div>

            <div>
              <h1>AI Study</h1>
              <p>Assistant</p>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="ai-sidebar-close"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="ai-sidebar-nav">
          <button
            onClick={() => navigate("/dashboard")}
            className="ai-nav-item"
          >
            <BookOpen size={19} />
            <span>Dashboard</span>
          </button>

          <button className="ai-nav-item ai-nav-active">
            <Bot size={19} />
            <span>AI Study Assistant</span>
          </button>

          <button
            onClick={() => navigate("/subjects")}
            className="ai-nav-item"
          >
            <BookOpen size={19} />
            <span>Subjects</span>
          </button>

          <button
            onClick={() => navigate("/quizzes")}
            className="ai-nav-item"
          >
            <CheckCircle size={19} />
            <span>Quizzes</span>
          </button>

          <button
            onClick={() => navigate("/progress")}
            className="ai-nav-item"
          >
            <Brain size={19} />
            <span>Progress</span>
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="ai-nav-item"
          >
            <User size={19} />
            <span>Profile</span>
          </button>
        </nav>

        <div className="ai-sidebar-footer">
          <div className="ai-sidebar-footer-icon">
            <Sparkles size={17} />
          </div>

          <div>
            <strong>AI Powered Learning</strong>
            <span>Study smarter with AI</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="ai-assistant-main">
        {/* Header */}
        <header className="ai-assistant-header">
          <div className="ai-header-left">
            <button
              onClick={() => setSidebarOpen(true)}
              className="ai-mobile-menu"
            >
              <Menu size={23} />
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="ai-back-button"
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <p className="ai-header-overline">AI Learning</p>
              <h2>AI Study Assistant</h2>
            </div>
          </div>

          <div className="ai-header-status">
            <Sparkles size={16} />
            <span>AI Assistant</span>
          </div>
        </header>

        {/* Page */}
        <div className="ai-assistant-content">
          {/* Intro */}
          <section className="ai-intro-card">
            <div className="ai-intro-decoration ai-intro-decoration-one" />
            <div className="ai-intro-decoration ai-intro-decoration-two" />

            <div className="ai-intro-icon">
              <Bot size={30} />
            </div>

            <div className="ai-intro-text">
              <p className="ai-intro-label">
                <Sparkles size={14} />
                Personalized Learning
              </p>

              <h1>Your Personal AI Study Assistant</h1>

              <p>
                Ask questions, understand concepts, practice quizzes, and
                improve your study routine with help from your indexed study
                material.
              </p>
            </div>
          </section>

          {/* Chat */}
          <section className="ai-chat-card">
            {/* Chat Header */}
            <div className="ai-chat-header">
              <div className="ai-chat-identity">
                <div className="ai-chat-avatar">
                  <Bot size={20} />
                </div>

                <div>
                  <p>Study Assistant</p>

                  <div className="ai-chat-status">
                    <span
                      className={`ai-status-dot ${
                        loading ? "ai-status-thinking" : ""
                      }`}
                    />
                    <span>
                      {loading ? "Thinking..." : "Ready to help"}
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
                      text:
                        "Chat cleared. What would you like to study? 📚",
                    },
                  ])
                }
                disabled={loading}
                className="ai-clear-button"
              >
                Clear chat
              </button>
            </div>

            {/* Messages */}
            <div className="ai-messages">
              {messages.map((item) => {
                const isAI = item.sender === "ai";

                return (
                  <div
                    key={item.id}
                    className={`ai-message-row ${
                      isAI ? "ai-message-row-left" : "ai-message-row-right"
                    }`}
                  >
                    {isAI && (
                      <div className="ai-message-avatar">
                        <Bot size={17} />
                      </div>
                    )}

                    <div
                      className={`ai-message-bubble ${
                        isAI
                          ? "ai-message-ai"
                          : "ai-message-user"
                      }`}
                    >
                      {item.text}
                    </div>

                    {!isAI && (
                      <div className="ai-message-avatar ai-user-avatar">
                        <User size={17} />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Loading */}
              {loading && (
                <div className="ai-message-row ai-message-row-left">
                  <div className="ai-message-avatar">
                    <Bot size={17} />
                  </div>

                  <div className="ai-message-bubble ai-message-ai ai-thinking-bubble">
                    <span className="ai-thinking-dot" />
                    <span className="ai-thinking-dot" />
                    <span className="ai-thinking-dot" />
                    <span className="ai-thinking-text">
                      Searching your study material...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            <div className="ai-suggestions">
              <div className="ai-suggestions-heading">
                <div className="ai-lightbulb">
                  <Lightbulb size={14} />
                </div>
                <span>Try asking</span>
              </div>

              <div className="ai-suggestion-list">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestion(suggestion)}
                    className="ai-suggestion"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="ai-input-section">
              <div className="ai-input-wrapper">
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask your study question..."
                  rows={1}
                  disabled={loading}
                  className="ai-input"
                />

                <button
                  onClick={handleSend}
                  disabled={!message.trim() || loading}
                  className="ai-send-button"
                >
                  <Send size={18} />
                </button>
              </div>

              <p className="ai-input-note">
                Responses are generated using your indexed study material.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AIStudyAssistant;