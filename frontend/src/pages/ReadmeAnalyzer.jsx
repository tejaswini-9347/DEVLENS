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
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          README Analyzer
        </h1>

        <p className="text-slate-400 mb-8">
          Analyze any GitHub repository README using AI.
        </p>

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">

          <div className="grid md:grid-cols-2 gap-4">

            <input
              placeholder="Repository Owner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
            />

            <input
              placeholder="Repository Name"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              className="p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
            />

          </div>

          <button
            onClick={analyzeReadme}
            disabled={loading}
            className="mt-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 px-6 py-3 rounded-lg font-semibold transition"
          >
            Analyze README
          </button>

        </div>

        {loading && (
          <div className="mt-8 bg-slate-900 border border-slate-700 rounded-xl p-6 flex items-center gap-5 shadow-lg">

            <Loader />

            <div>
              <h3 className="text-lg font-semibold">
                Analyzing README...
              </h3>

              <p className="text-slate-400">
                AI is reading the repository documentation and generating insights.
              </p>
            </div>

          </div>
        )}

        {analysis && (
          <>
            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={copyAnalysis}
                className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-semibold"
              >
                📋 Copy
              </button>

              <button
                onClick={clearAnalysis}
                className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold"
              >
                🗑 Clear
              </button>

            </div>

            <div className="mt-6 bg-slate-900 rounded-xl border border-slate-700 p-8 whitespace-pre-wrap leading-7">
              {analysis}
            </div>
          </>
        )}

      </div>
    </div>
  );
}