import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import SearchBar from "../components/SearchBar";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Navbar */}

      <nav
        className={`flex justify-between items-center px-8 py-5 shadow-md ${
          darkMode ? "bg-slate-900" : "bg-white"
        }`}
      >
        <h1 className="text-3xl font-bold text-cyan-400">
          🚀 DevLens
        </h1>

        <ThemeToggle />
      </nav>

      {/* Hero */}

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 rounded-3xl p-12 text-center shadow-xl">

          <h1 className="text-6xl font-bold text-white">
            DevLens
          </h1>

          <p className="text-xl text-gray-100 mt-5">
            AI Powered GitHub Developer Analytics Platform
          </p>

          <div className="mt-10">
            <SearchBar />
          </div>

        </div>

        {/* Feature Cards */}

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <Link
            to="/compare"
            className="bg-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-cyan-500 transition hover:-translate-y-1"
          >
            <div className="text-5xl mb-4">⚖️</div>

            <h2 className="text-2xl font-bold">
              Compare Developers
            </h2>

            <p className="text-slate-400 mt-3">
              Compare two GitHub developers with AI insights.
            </p>
          </Link>

          <Link
            to="/repository-analyzer"
            className="bg-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-cyan-500 transition hover:-translate-y-1"
          >
            <div className="text-5xl mb-4">📦</div>

            <h2 className="text-2xl font-bold">
              Repository Analyzer
            </h2>

            <p className="text-slate-400 mt-3">
              Analyze repository health, code quality and AI suggestions.
            </p>
          </Link>

          <Link
            to="/resume-builder"
            className="bg-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-cyan-500 transition hover:-translate-y-1"
          >
            <div className="text-5xl mb-4">📄</div>

            <h2 className="text-2xl font-bold">
              Resume Builder
            </h2>

            <p className="text-slate-400 mt-3">
              Generate an AI-powered developer resume in seconds.
            </p>
          </Link>

        </div>

      </div>

    </div>
  );
}