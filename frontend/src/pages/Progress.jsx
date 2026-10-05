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

  // Frontend dummy data
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
      title: "COAL Fundamentals Quiz",
      subject: "COAL",
      score: 78,
      questions: 15,
    },
    {
      title: "ICT Basics Quiz",
      subject: "ICT",
      score: 85,
      questions: 10,
    },
    {
      title: "Programming Fundamentals",
      subject: "PF",
      score: 65,
      questions: 20,
    },
    {
      title: "Computer Architecture",
      subject: "COAL",
      score: 76,
      questions: 15,
    },
  ];

  const maxHours = Math.max(...weeklyActivity.map((item) => item.hours));

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ===================================================== */}
      {/* SIDEBAR */}
      {/* ===================================================== */}

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
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-600 transition hover:bg-gray-50 hover:text-indigo-600"
            >
              <ClipboardList size={20} />
              <span>Quizzes</span>
            </button>

            {/* Active Progress */}
            <button
              onClick={() => navigate("/progress")}
              className="flex w-full items-center gap-3 rounded-xl bg-indigo-50 px-4 py-3 font-medium text-indigo-600"
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


      {/* ===================================================== */}
      {/* MAIN CONTENT */}
      {/* ===================================================== */}

      <main className="lg:ml-64">

        {/* Header */}
        <header className="border-b border-gray-200 bg-white">

          <div className="flex h-20 items-center px-4 sm:px-6 lg:px-8">

            <button
              onClick={() => navigate("/dashboard")}
              className="mr-4 rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
            >
              <ArrowLeft size={21} />
            </button>

            <div>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Progress
              </h2>

              <p className="text-sm text-gray-500">
                Track your learning journey and performance
              </p>
            </div>

          </div>

        </header>


        {/* Page Content */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          {/* Welcome */}
          <div className="mb-8">

            <h1 className="text-2xl font-bold text-gray-900">
              {studentName}'s Learning Progress
            </h1>

            <p className="mt-1 text-gray-500">
              Keep going! You are making steady progress.
            </p>

          </div>


          {/* ================================================= */}
          {/* SUMMARY CARDS */}
          {/* ================================================= */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {/* Overall Progress */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <TrendingUp size={22} />
                </div>

                <span className="text-sm font-medium text-green-600">
                  +8%
                </span>

              </div>

              <p className="mt-4 text-sm text-gray-500">
                Overall Progress
              </p>

              <p className="mt-1 text-3xl font-bold text-gray-900">
                68%
              </p>

            </div>


            {/* Study Hours */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Clock size={22} />
                </div>

                <span className="text-sm font-medium text-green-600">
                  +4.5h
                </span>

              </div>

              <p className="mt-4 text-sm text-gray-500">
                Study Hours
              </p>

              <p className="mt-1 text-3xl font-bold text-gray-900">
                28.5
              </p>

            </div>


            {/* Quizzes */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <ClipboardList size={22} />
                </div>

                <span className="text-sm font-medium text-gray-500">
                  Completed
                </span>

              </div>

              <p className="mt-4 text-sm text-gray-500">
                Quizzes Completed
              </p>

              <p className="mt-1 text-3xl font-bold text-gray-900">
                12
              </p>

            </div>


            {/* Average Score */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <Target size={22} />
                </div>

                <span className="text-sm font-medium text-green-600">
                  Good
                </span>

              </div>

              <p className="mt-4 text-sm text-gray-500">
                Average Quiz Score
              </p>

              <p className="mt-1 text-3xl font-bold text-gray-900">
                76%
              </p>

            </div>

          </div>


          {/* ================================================= */}
          {/* OVERALL PROGRESS + WEEKLY ACTIVITY */}
          {/* ================================================= */}

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">

            {/* Overall Progress */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Overall Progress
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Your overall learning completion
                  </p>
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-indigo-100 text-lg font-bold text-indigo-600">
                  68%
                </div>

              </div>

              <div className="mt-6">

                <div className="mb-2 flex justify-between text-sm">

                  <span className="text-gray-500">
                    Course completion
                  </span>

                  <span className="font-semibold text-gray-900">
                    68%
                  </span>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-gray-100">

                  <div
                    className="h-full rounded-full bg-indigo-600"
                    style={{ width: "68%" }}
                  />

                </div>

              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">

                <div className="rounded-xl bg-gray-50 p-3 text-center">
                  <p className="text-xl font-bold text-gray-900">
                    30
                  </p>

                  <p className="text-xs text-gray-500">
                    Completed Topics
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-3 text-center">
                  <p className="text-xl font-bold text-gray-900">
                    15
                  </p>

                  <p className="text-xs text-gray-500">
                    Remaining Topics
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-3 text-center">
                  <p className="text-xl font-bold text-gray-900">
                    3
                  </p>

                  <p className="text-xs text-gray-500">
                    Subjects
                  </p>
                </div>

              </div>

            </div>


            {/* Weekly Activity */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Weekly Study Activity
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Hours studied this week
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <BarChart3 size={20} />
                </div>

              </div>

              <div className="mt-6 flex h-48 items-end justify-between gap-2">

                {weeklyActivity.map((item) => {

                  const height =
                    (item.hours / maxHours) * 100;

                  return (
                    <div
                      key={item.day}
                      className="flex h-full flex-1 flex-col items-center justify-end"
                    >

                      <span className="mb-2 text-xs font-medium text-gray-500">
                        {item.hours}h
                      </span>

                      <div className="flex h-32 w-full items-end justify-center">

                        <div
                          className="w-full max-w-8 rounded-t-lg bg-indigo-500 transition hover:bg-indigo-600"
                          style={{
                            height: `${height}%`,
                          }}
                        />

                      </div>

                      <span className="mt-2 text-xs text-gray-500">
                        {item.day}
                      </span>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* SUBJECT PROGRESS */}
          {/* ================================================= */}

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">

              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Subject Progress
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Progress across your enrolled subjects
                </p>
              </div>

              <button
                onClick={() => navigate("/subjects")}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                View Subjects →
              </button>

            </div>


            <div className="mt-6 space-y-6">

              {subjects.map((subject) => (

                <div key={subject.shortName}>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                      <p className="font-semibold text-gray-900">
                        {subject.shortName}
                      </p>

                      <p className="text-sm text-gray-500">
                        {subject.name}
                      </p>
                    </div>

                    <div className="text-sm text-gray-500">
                      {subject.completed}/{subject.total} topics
                    </div>

                  </div>


                  <div className="mt-3 flex items-center gap-3">

                    <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-100">

                      <div
                        className="h-full rounded-full bg-indigo-600"
                        style={{
                          width: `${subject.progress}%`,
                        }}
                      />

                    </div>

                    <span className="w-12 text-right text-sm font-bold text-gray-900">
                      {subject.progress}%
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>


          {/* ================================================= */}
          {/* QUIZ PERFORMANCE */}
          {/* ================================================= */}

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Quiz Performance
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Your recent quiz results
                </p>
              </div>

              <button
                onClick={() => navigate("/quizzes")}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                All Quizzes →
              </button>

            </div>


            <div className="mt-6 space-y-4">

              {quizPerformance.map((quiz) => (

                <div
                  key={quiz.title}
                  className="flex flex-col gap-4 rounded-xl bg-gray-50 p-4 sm:flex-row sm:items-center"
                >

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                    <ClipboardList size={20} />
                  </div>


                  <div className="min-w-0 flex-1">

                    <h4 className="truncate font-semibold text-gray-900">
                      {quiz.title}
                    </h4>

                    <p className="mt-1 text-sm text-gray-500">
                      {quiz.subject} • {quiz.questions} questions
                    </p>

                  </div>


                  <div className="flex items-center gap-3">

                    <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">

                      <div
                        className="h-full rounded-full bg-indigo-600"
                        style={{
                          width: `${quiz.score}%`,
                        }}
                      />

                    </div>

                    <span className="w-12 text-right font-bold text-gray-900">
                      {quiz.score}%
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>


          {/* ================================================= */}
          {/* ACHIEVEMENTS */}
          {/* ================================================= */}

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Achievements
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Milestones you have achieved during your learning journey
              </p>
            </div>


            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {achievements.map((achievement) => {

                const Icon = achievement.icon;

                return (
                  <div
                    key={achievement.title}
                    className="rounded-xl border border-gray-100 bg-gray-50 p-5"
                  >

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                      <Icon size={23} />
                    </div>

                    <h4 className="mt-4 font-bold text-gray-900">
                      {achievement.title}
                    </h4>

                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      {achievement.description}
                    </p>

                  </div>
                );
              })}

            </div>

          </div>


          {/* ================================================= */}
          {/* AI ASSISTANT CTA */}
          {/* ================================================= */}

          <div className="mt-6 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white shadow-sm">

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div>

                <div className="flex items-center gap-2">
                  <Bot size={22} />

                  <h3 className="text-lg font-bold">
                    Need help improving your progress?
                  </h3>
                </div>

                <p className="mt-2 max-w-2xl text-sm text-indigo-100">
                  Ask the AI Study Assistant for personalized explanations,
                  study plans, quiz preparation, and learning guidance.
                </p>

              </div>

              <button
                onClick={() => navigate("/ai-assistant")}
                className="shrink-0 rounded-xl bg-white px-5 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-50"
              >
                Open AI Assistant
              </button>

            </div>

          </div>


          {/* Bottom spacing */}
          <div className="h-8" />

        </div>
      </main>

    </div>
  );
}

export default Progress;