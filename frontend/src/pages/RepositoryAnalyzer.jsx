import { useState } from "react";
import RepositorySearch from "../components/RepositorySearch";
import RepositoryDetails from "../components/RepositoryDetails";
import AIAnalysis from "../components/AIAnalysis";
import RepositoryHealthCard from "../components/RepositoryHealthCard";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import {
  getRepository,
  analyzeRepository,
  getRepositoryHealth,
} from "../services/githubService";

export default function RepositoryAnalyzer() {
  const [repository, setRepository] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (repoName) => {
    try {
      setLoading(true);

      const [owner, repo] = repoName.split("/");

      if (!owner || !repo) {
        toast.error("Enter repository as owner/repository");
        return;
      }

      // Fetch repository details
      const repoData = await getRepository(owner, repo);
      setRepository(repoData);

      // Fetch AI analysis
      const ai = await analyzeRepository(owner, repo);
      setAnalysis(ai.analysis);

      // Fetch repository health score
     const healthData = await getRepositoryHealth(owner, repo);

console.log("Health Data:", healthData);

setHealth(healthData);
    } catch (error) {
      console.error(error);
      toast.error("Repository not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        🤖 AI Repository Analyzer
      </h1>

      <RepositorySearch onSearch={handleSearch} />

      {loading && (
  <div className="mt-8 bg-slate-900 border border-slate-700 rounded-xl p-6 flex items-center gap-5 shadow-lg">
    <Loader />

    <div>
      <h3 className="text-lg font-semibold text-white">
        Analyzing Repository...
      </h3>

      <p className="text-slate-400">
        AI is reading repository information and generating insights.
      </p>
    </div>
  </div>
)}

      {repository && (
        <>
          <RepositoryDetails repository={repository} />

          <RepositoryHealthCard health={health} />

          <AIAnalysis analysis={analysis} />
        </>
      )}
    </div>
  );
}