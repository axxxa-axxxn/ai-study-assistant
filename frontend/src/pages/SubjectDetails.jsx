import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Circle,
  Clock,
  BookMarked,
  FileText,
  PlayCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function SubjectDetails() {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const { user, logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedTopic, setExpandedTopic] = useState(null);

  const studentName =
    user?.name ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "Student";

  // --------------------------------------------------
  // Subject Data
  // --------------------------------------------------

  const subjects = {
    "1": {
      name: "Computer Organization & Assembly Language",
      shortName: "COAL",
      description:
        "Learn computer organization, CPU architecture, memory systems, assembly language, instructions, addressing modes, and I/O organization.",
      progress: 78,
      completedTopics: 12,
      totalTopics: 15,
      studyHours: 10.5,
      color: "indigo",

      topics: [
        {
          id: 1,
          title: "Computer Organization",
          description:
            "Introduction to computer organization and the basic components of a computer system.",
          duration: "45 min",
          completed: true,
          lessons: 4,
        },
        {
          id: 2,
          title: "CPU Architecture",
          description:
            "Understand the CPU, ALU, control unit, registers, and processor architecture.",
          duration: "50 min",
          completed: true,
          lessons: 5,
        },
        {
          id: 3,
          title: "Memory Organization",
          description:
            "Learn about memory hierarchy, cache, RAM, ROM, and memory addressing.",
          duration: "60 min",
          completed: true,
          lessons: 6,
        },
        {
          id: 4,
          title: "Assembly Language",
          description:
            "Introduction to assembly language programming and basic assembly instructions.",
          duration: "55 min",
          completed: true,
          lessons: 5,
        },
        {
          id: 5,
          title: "Instruction Set",
          description:
            "Study instruction formats, instruction types, and instruction execution.",
          duration: "50 min",
          completed: true,
          lessons: 5,
        },
        {
          id: 6,
          title: "Addressing Modes",
          description:
            "Explore different addressing modes used by processors.",
          duration: "45 min",
          completed: true,
          lessons: 4,
        },
        {
          id: 7,
          title: "I/O Organization",
          description:
            "Learn how computers communicate with input and output devices.",
          duration: "50 min",
          completed: false,
          lessons: 5,
        },
      ],
    },

    "2": {
      name: "Information & Communication Technology",
      shortName: "ICT",
      description:
        "Explore information technology, communication systems, computer networks, databases, cybersecurity, and modern digital technologies.",
      progress: 65,
      completedTopics: 10,
      totalTopics: 15,
      studyHours: 8.5,
      color: "blue",

      topics: [
        {
          id: 1,
          title: "Introduction to ICT",
          description:
            "Understand the fundamentals of information and communication technology.",
          duration: "40 min",
          completed: true,
          lessons: 4,
        },
        {
          id: 2,
          title: "Computer Systems",
          description:
            "Learn about computer hardware, software, operating systems, and system components.",
          duration: "45 min",
          completed: true,
          lessons: 5,
        },
        {
          id: 3,
          title: "Networking Basics",
          description:
            "Understand computer networks, network types, devices, and communication.",
          duration: "55 min",
          completed: true,
          lessons: 6,
        },
        {
          id: 4,
          title: "Internet Technologies",
          description:
            "Explore the Internet, web technologies, browsers, servers, and online services.",
          duration: "50 min",
          completed: true,
          lessons: 5,
        },
        {
          id: 5,
          title: "Communication Systems",
          description:
            "Study digital communication systems and communication technologies.",
          duration: "45 min",
          completed: true,
          lessons: 4,
        },
        {
          id: 6,
          title: "Databases",
          description:
            "Introduction to databases, data organization, and database management systems.",
          duration: "60 min",
          completed: false,
          lessons: 6,
        },
        {
          id: 7,
          title: "Cyber Security",
          description:
            "Learn basic cybersecurity concepts, threats, attacks, and protection methods.",
          duration: "55 min",
          completed: false,
          lessons: 5,
        },
      ],
    },

    "3": {
      name: "Programming Fundamentals",
      shortName: "PF",
      description:
        "Build strong programming fundamentals through variables, conditions, loops, functions, arrays, pointers, and problem solving.",
      progress: 52,
      completedTopics: 8,
      totalTopics: 15,
      studyHours: 9.5,
      color: "purple",

      topics: [
        {
          id: 1,
          title: "Programming Basics",
          description:
            "Introduction to programming concepts, algorithms, flowcharts, and problem solving.",
          duration: "45 min",
          completed: true,
          lessons: 4,
        },
        {
          id: 2,
          title: "Variables & Data Types",
          description:
            "Learn variables, constants, data types, operators, and expressions.",
          duration: "50 min",
          completed: true,
          lessons: 5,
        },
        {
          id: 3,
          title: "Conditional Statements",
          description:
            "Understand if, else, nested conditions, and decision-making in programs.",
          duration: "45 min",
          completed: true,
          lessons: 5,
        },
        {
          id: 4,
          title: "Loops",
          description:
            "Learn for, while, and do-while loops with practical examples.",
          duration: "55 min",
          completed: true,
          lessons: 6,
        },
        {
          id: 5,
          title: "Functions",
          description:
            "Understand functions, parameters, return values, and modular programming.",
          duration: "60 min",
          completed: false,
          lessons: 6,
        },
        {
          id: 6,
          title: "Arrays",
          description:
            "Learn one-dimensional and multi-dimensional arrays and their applications.",
          duration: "55 min",
          completed: false,
          lessons: 5,
        },
        {
          id: 7,
          title: "Pointers",
          description:
            "Introduction to pointers, memory addresses, and pointer operations.",
          duration: "60 min",
          completed: false,
          lessons: 6,
        },
      ],
    },
  };

  const subject = subjects[subjectId];

  // --------------------------------------------------
  // Navigation
  // --------------------------------------------------

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

  // --------------------------------------------------
  // Invalid Subject
  // --------------------------------------------------

  if (!subject) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <BookOpen
            size={45}
            className="mx-auto text-slate-400"
          />

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Subject Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The subject you are looking for does not exist.
          </p>

          <button
            onClick={() => navigate("/subjects")}
            className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Back to Subjects
          </button>
        </div>
      </div>
    );
  }

  const getColorClasses = () => {
    if (subject.color === "blue") {
      return {
        icon: "bg-blue-100 text-blue-600",
        badge: "bg-blue-50 text-blue-600",
        progress: "bg-blue-600",
        button: "bg-blue-600 hover:bg-blue-700",
        light: "bg-blue-50",
      };
    }

    if (subject.color === "purple") {
      return {
        icon: "bg-purple-100 text-purple-600",
        badge: "bg-purple-50 text-purple-600",
        progress: "bg-purple-600",
        button: "bg-purple-600 hover:bg-purple-700",
        light: "bg-purple-50",
      };
    }

    return {
      icon: "bg-indigo-100 text-indigo-600",
      badge: "bg-indigo-50 text-indigo-600",
      progress: "bg-indigo-600",
      button: "bg-indigo-600 hover:bg-indigo-700",
      light: "bg-indigo-50",
    };
  };

  const colors = getColorClasses();

  // --------------------------------------------------
  // Toggle Topic
  // --------------------------------------------------

  const toggleTopic = (topicId) => {
    setExpandedTopic(
      expandedTopic === topicId ? null : topicId
    );
  };

  return (
    <div className="subject-details-page">
      {/* ==================================================
          MOBILE OVERLAY
      ================================================== */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
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
            className="text-slate-500 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={23} />
          </button>
        </div>

        {/* Navigation */}

        <nav className="flex-1 space-y-2 px-4 py-6">
          {navigation.map((item) => {
            const Icon = item.icon;

            const active =
              item.path === "/subjects";

            return (
              <button
                key={item.name}
                onClick={() =>
                  handleNavigation(item.path)
                }
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                }`}
              >
                <Icon size={20} />

                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* User */}

        <div className="border-t border-slate-200 p-4">
          <button
            onClick={() =>
              handleNavigation("/profile")
            }
            className="mb-3 flex w-full items-center gap-3 rounded-xl bg-slate-50 p-3 text-left transition hover:bg-indigo-50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
              {studentName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">
                {studentName}
              </p>

              <p className="truncate text-xs text-slate-500">
                Student
              </p>
            </div>
          </button>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={20} />

            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="lg:ml-72">
        {/* Header */}

        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>

            <div>
              <p className="text-sm text-slate-500">
                Subject Details
              </p>

              <h2 className="font-semibold text-slate-900">
                {subject.shortName}
              </h2>
            </div>
          </div>

          <button
            className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell size={21} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* ==================================================
              BACK BUTTON
          ================================================== */}

          <button
            onClick={() => navigate("/subjects")}
            className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
          >
            <ArrowLeft size={18} />

            Back to Subjects
          </button>

          {/* ==================================================
              SUBJECT HERO
          ================================================== */}

          <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex gap-4">
                  <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-lg font-bold ${colors.icon}`}
                  >
                    {subject.shortName}
                  </div>

                  <div>
                    <span
                      className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-semibold ${colors.badge}`}
                    >
                      {subject.shortName}
                    </span>

                    <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                      {subject.name}
                    </h1>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
                      {subject.description}
                    </p>
                  </div>
                </div>

                <button
                  className={`flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${colors.button}`}
                >
                  <PlayCircle size={19} />

                  Continue Studying
                </button>
              </div>

              {/* Progress */}

              <div className="mt-8 border-t border-slate-100 pt-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">
                    Course Progress
                  </span>

                  <span className="text-sm font-bold text-slate-900">
                    {subject.progress}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${colors.progress}`}
                    style={{
                      width: `${subject.progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Stats */}

            <div className="grid grid-cols-2 border-t border-slate-200 sm:grid-cols-4">
              <div className="border-b border-slate-200 p-5 text-center sm:border-b-0 sm:border-r">
                <BookOpen
                  size={20}
                  className="mx-auto text-indigo-500"
                />

                <p className="mt-2 text-xl font-bold text-slate-900">
                  {subject.totalTopics}
                </p>

                <p className="text-xs text-slate-500">
                  Total Topics
                </p>
              </div>

              <div className="border-b border-slate-200 p-5 text-center sm:border-b-0 sm:border-r">
                <CheckCircle
                  size={20}
                  className="mx-auto text-green-500"
                />

                <p className="mt-2 text-xl font-bold text-slate-900">
                  {subject.completedTopics}
                </p>

                <p className="text-xs text-slate-500">
                  Completed
                </p>
              </div>

              <div className="border-r border-slate-200 p-5 text-center">
                <Clock
                  size={20}
                  className="mx-auto text-orange-500"
                />

                <p className="mt-2 text-xl font-bold text-slate-900">
                  {subject.studyHours}
                </p>

                <p className="text-xs text-slate-500">
                  Study Hours
                </p>
              </div>

              <div className="p-5 text-center">
                <FileText
                  size={20}
                  className="mx-auto text-purple-500"
                />

                <p className="mt-2 text-xl font-bold text-slate-900">
                  24
                </p>

                <p className="text-xs text-slate-500">
                  Materials
                </p>
              </div>
            </div>
          </section>

          {/* ==================================================
              CONTENT GRID
          ================================================== */}

          <div className="grid gap-6 xl:grid-cols-3">
            {/* ==================================================
                TOPICS
            ================================================== */}

            <section className="xl:col-span-2">
              <div className="mb-5">
                <h2 className="text-xl font-bold text-slate-900">
                  Course Topics
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Work through each topic to complete the
                  course.
                </p>
              </div>

              <div className="space-y-3">
                {subject.topics.map((topic, index) => {
                  const expanded =
                    expandedTopic === topic.id;

                  return (
                    <div
                      key={topic.id}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                    >
                      {/* Topic Row */}

                      <button
                        onClick={() =>
                          toggleTopic(topic.id)
                        }
                        className="flex w-full items-center gap-4 p-5 text-left transition hover:bg-slate-50"
                      >
                        {/* Status */}

                        {topic.completed ? (
                          <CheckCircle
                            size={23}
                            className="shrink-0 text-green-500"
                          />
                        ) : (
                          <Circle
                            size={23}
                            className="shrink-0 text-slate-300"
                          />
                        )}

                        {/* Number */}

                        <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500 sm:flex">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        {/* Topic Info */}

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-slate-800">
                              {topic.title}
                            </h3>

                            {topic.completed && (
                              <span className="rounded-md bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-600">
                                Completed
                              </span>
                            )}
                          </div>

                          <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock size={13} />
                              {topic.duration}
                            </span>

                            <span className="flex items-center gap-1">
                              <FileText size={13} />
                              {topic.lessons} lessons
                            </span>
                          </div>
                        </div>

                        {/* Arrow */}

                        {expanded ? (
                          <ChevronUp
                            size={19}
                            className="shrink-0 text-slate-400"
                          />
                        ) : (
                          <ChevronDown
                            size={19}
                            className="shrink-0 text-slate-400"
                          />
                        )}
                      </button>

                      {/* Expanded Content */}

                      {expanded && (
                        <div className="border-t border-slate-100 bg-slate-50 p-5">
                          <p className="text-sm leading-6 text-slate-600">
                            {topic.description}
                          </p>

                          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                            <button
                              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition ${colors.button}`}
                            >
                              <PlayCircle size={17} />

                              {topic.completed
                                ? "Review Topic"
                                : "Start Topic"}
                            </button>

                            <button
                              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
                            >
                              <FileText size={17} />

                              View Material
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ==================================================
                RIGHT SIDEBAR
            ================================================== */}

            <aside className="space-y-6">
              {/* Continue */}

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={`rounded-xl p-3 ${colors.light}`}>
                    <PlayCircle
                      size={22}
                      className={
                        subject.color === "blue"
                          ? "text-blue-600"
                          : subject.color === "purple"
                            ? "text-purple-600"
                            : "text-indigo-600"
                      }
                    />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Continue Learning
                    </p>

                    <h3 className="mt-1 font-bold text-slate-900">
                      {subject.topics.find(
                        (topic) => !topic.completed
                      )?.title || "Course Complete"}
                    </h3>
                  </div>
                </div>

                <button
                  className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition ${colors.button}`}
                >
                  Continue
                  <ArrowRight size={17} />
                </button>
              </div>

              {/* Completion */}

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-slate-900">
                  Completion
                </h3>

                <div className="mt-5 space-y-4">
                  <div>
                    <div className="mb-2 flex justify-between text-xs">
                      <span className="text-slate-500">
                        Completed
                      </span>

                      <span className="font-semibold text-slate-700">
                        {subject.completedTopics}/
                        {subject.totalTopics}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${colors.progress}`}
                        style={{
                          width: `${subject.progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                    <div>
                      <p className="text-xs text-slate-500">
                        Remaining Topics
                      </p>

                      <p className="mt-1 text-lg font-bold text-slate-900">
                        {subject.totalTopics -
                          subject.completedTopics}
                      </p>
                    </div>

                    <BookOpen
                      size={22}
                      className="text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-slate-900">
                  Quick Actions
                </h3>

                <div className="mt-4 space-y-2">
                  <button
                    onClick={() =>
                      navigate("/ai-assistant")
                    }
                    className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <Bot size={19} />
                    Ask AI Assistant
                  </button>

                  <button
                    onClick={() =>
                      navigate("/quizzes")
                    }
                    className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <ClipboardList size={19} />
                    Take a Quiz
                  </button>

                  <button
                    onClick={() =>
                      navigate("/progress")
                    }
                    className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <BarChart3 size={19} />
                    View Progress
                  </button>
                </div>
              </div>
            </aside>
          </div>

          {/* ==================================================
              AI HELP
          ================================================== */}

          <section className="mt-8 rounded-2xl bg-indigo-600 p-6 text-white shadow-sm sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-indigo-200">
                  AI STUDY SUPPORT
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Need help understanding {subject.shortName}?
                </h2>

                <p className="mt-2 max-w-2xl text-sm text-indigo-100">
                  Ask the AI Study Assistant to explain topics,
                  create examples, generate practice questions,
                  or help you prepare for your exam.
                </p>
              </div>

              <button
                onClick={() =>
                  navigate("/ai-assistant")
                }
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-50"
              >
                <Bot size={19} />

                Ask AI

                <ArrowRight size={18} />
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default SubjectDetails;