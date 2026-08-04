import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

export default function ReadmeAnalyzer() {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeReadme = async () => {
    if (!owner || !repo) {
      toast.error("Please enter repository owner and repository name.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/github/repository/${owner}/${repo}/readme-analysis`
      );

      setAnalysis(res.data.analysis);

      toast.success("README analyzed successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to analyze README.");
    } finally {
      setLoading(false);
    }
  };

  const copyAnalysis = async () => {
    await navigator.clipboard.writeText(analysis);
    toast.success("Copied successfully!");
  };

  const clearAnalysis = () => {
    setOwner("");
    setRepo("");
    setAnalysis("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-6xl mx-auto px-8 py-10">

        {/* Hero */}

        <div className="text-center mb-12">

          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">

            AI README Analyzer

          </h1>

          <p className="text-slate-400 text-lg mt-5 max-w-3xl mx-auto leading-8">

            Analyze GitHub repository documentation with Artificial Intelligence.
            Get project summaries, technologies, strengths,
            interview questions and improvement suggestions.

          </p>

        </div>

        {/* Search Card */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6">

            📘 Repository Details

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Repository Owner (facebook)"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="h-14 px-5 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500 transition"
            />

            <input
              type="text"
              placeholder="Repository Name (react)"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              className="h-14 px-5 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500 transition"
            />

          </div>

          <div className="flex justify-center mt-8">

            <button
              onClick={analyzeReadme}
              disabled={loading}
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:scale-105 transition-all duration-300 font-bold shadow-xl disabled:opacity-50"
            >

              {loading
                ? "Analyzing..."
                : "🚀 Analyze README"}

            </button>

          </div>

        </div>

        {/* Loading */}

        {loading && (

          <div className="mt-10 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl p-8 flex items-center gap-6">

            <Loader />

            <div>

              <h2 className="text-2xl font-bold">

                AI is analyzing the README...

              </h2>

              <p className="text-slate-400 mt-2 leading-8">

                CodeVista is reading the repository documentation,
                extracting project details and generating AI insights.

              </p>

            </div>

          </div>

        )}

        {/* Analysis Result */}
        {analysis && (
  <>
    {/* Report Header */}

    <div className="mt-10 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl p-8">

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">

        <div>

          <h2 className="text-4xl font-bold flex items-center gap-3">
            🤖 AI README Report
          </h2>

          <p className="text-slate-400 mt-3">
            AI generated repository documentation analysis
          </p>

        </div>

        <div className="flex flex-wrap items-center gap-4">


          <button
            onClick={copyAnalysis}
            className="px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition-all hover:scale-105 font-semibold shadow-lg"
          >
            📋 Copy
          </button>

          <button
            onClick={clearAnalysis}
            className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition-all hover:scale-105 font-semibold shadow-lg"
          >
            🗑 Clear
          </button>

        </div>

      </div>

    </div>

    {/* README Card */}

    <div className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">

      <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-10 py-7">

        <h2 className="text-3xl font-bold flex items-center gap-3">
          📘 README Analysis
        </h2>

        <p className="text-white/80 mt-2">
          Complete AI generated documentation review
        </p>

      </div>

      <div className="p-8">

        {/* AI Insights */}

        <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 p-8 mb-8">

          <h3 className="text-2xl font-bold mb-5">
            🤖 AI Insights
          </h3>

          <p className="text-slate-300 leading-8">
            The analysis below was generated using Artificial Intelligence.
            It summarizes the repository documentation, identifies
            technologies, strengths, weaknesses and possible improvements.
          </p>

        </div>

        {/* AI Output */}

        <div className="bg-slate-950 rounded-2xl border border-slate-700 p-8">

          <pre className="whitespace-pre-wrap leading-9 text-[17px] text-slate-300 font-sans">
            {analysis}
          </pre>

        </div>

      </div>

    </div>

    {/* Recommendation */}

    <div className="mt-8 rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 p-8 shadow-xl">

      <h2 className="text-2xl font-bold flex items-center gap-3 mb-4">
        💡 CodeVista Recommendation
      </h2>

      <p className="text-slate-300 leading-8">
        Improve your README by adding installation instructions,
        screenshots, usage examples, API documentation,
        contribution guidelines and a proper license.
        A well-written README increases project quality,
        developer collaboration and recruiter confidence.
      </p>

    </div>

  </>
)}

      </div>

    </div>
  );
}