import { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PDFReport from "../components/PDFReport";
import SearchBar from "../components/SearchBar";
import RecentSearches from "../components/RecentSearches";
import FavoriteProfiles from "../components/FavoriteProfiles";
import ProfileCard from "../components/ProfileCard";
import RepositoryList from "../components/RepositoryList";
import AnalyticsCards from "../components/AnalyticsCards";
import FollowersList from "../components/FollowersList";
import FollowingList from "../components/FollowingList";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import LanguageChart from "../components/LanguageChart";
import StarsChart from "../components/StarsChart";
import ThemeToggle from "../components/ThemeToggle";
import ActivityDashboard from "../components/ActivityDashboard";
import ActivityTimeline from "../components/ActivityTimeline";
import DeveloperScoreCard from "../components/DeveloperScoreCard";
import AISummaryCard from "../components/AISummaryCard";
import SkillCard from "../components/SkillCard";
import { useTheme } from "../context/ThemeContext";
import CareerRecommendationCard from "../components/CareerRecommendationCard";
import ResumeAnalysisCard from "../components/ResumeAnalysisCard";
import GrowthPredictionCard from "../components/GrowthPredictionCard";

import {
  getProfile,
  getRepositories,
  getFollowers,
  getFollowing,
  getActivityAnalytics,
  getDeveloperScore,
  getAISummary,
  getDetectedSkills,
  getCareerRecommendations,
  getResumeAnalysis,
  getGrowthPrediction,
} from "../services/githubService";

function Home() {
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const pdfRef = useRef(null);
  const [skills, setSkills] = useState([]);
  const [activityAnalytics, setActivityAnalytics] = useState(null);
  const [aiSummary, setAiSummary] = useState("");
  const [careerRecommendations, setCareerRecommendations] = useState([]);
  const [resumeAnalysis, setResumeAnalysis] = useState(null);
  const [growthPrediction, setGrowthPrediction] = useState(null);

  // Updated handleDownloadPDF function
 const handleDownloadPDF = useReactToPrint({
  contentRef: pdfRef,
  documentTitle: "DevLens_Report",
});

  const [developerScore, setDeveloperScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [recentSearches, setRecentSearches] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const { darkMode } = useTheme();

  useEffect(() => {
    const searches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    const favs =
      JSON.parse(localStorage.getItem("favoriteProfiles")) || [];

    setRecentSearches(searches);
    setFavorites(favs);
  }, []);

  const handleAddFavorite = (profile) => {
    const exists = favorites.some(
      (item) => item.login === profile.login
    );

    if (exists) return;

    const updated = [...favorites, profile];
    setFavorites(updated);

    localStorage.setItem(
      "favoriteProfiles",
      JSON.stringify(updated)
    );
  };

  const handleSearch = async (username) => {
    try {
      setLoading(true);
      setError("");

      const updatedSearches = [
        username,
        ...recentSearches.filter((item) => item !== username),
      ].slice(0, 5);

      setRecentSearches(updatedSearches);

      localStorage.setItem(
        "recentSearches",
        JSON.stringify(updatedSearches)
      );

      const profileData = await getProfile(username);
      setProfile(profileData);

      const repoData = await getRepositories(username);
      setRepositories(repoData.repositories);
      setAnalytics(repoData.analytics);

      const followersData = await getFollowers(username);
      setFollowers(followersData);

      const followingData = await getFollowing(username);
      setFollowing(followingData);

      const activityData = await getActivityAnalytics(username);
      setActivityAnalytics(activityData);

      const scoreData = await getDeveloperScore(username);
      setDeveloperScore(scoreData);

      const summaryData = await getAISummary(username);
      setAiSummary(summaryData.summary);

      const skillData = await getDetectedSkills(username);
      setSkills(skillData.skills);

      const careerData = await getCareerRecommendations(username);
      setCareerRecommendations(careerData.recommendations);

      const resumeData = await getResumeAnalysis(username);
      setResumeAnalysis(resumeData);

      const growthData = await getGrowthPrediction(username);
      setGrowthPrediction(growthData);

    } catch (err) {
      console.log(err);

      setError("GitHub user not found");

      setProfile(null);
      setRepositories([]);
      setAnalytics({});
      setFollowers([]);
      setFollowing([]);
      setActivityAnalytics(null);
      setAiSummary("");
      setSkills([]);
      setCareerRecommendations([]);
      setResumeAnalysis(null);
      setGrowthPrediction(null);
      setDeveloperScore(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode ? "bg-slate-950 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Navbar */}
      <nav
        className={`flex justify-between items-center px-8 py-5 shadow-md ${
          darkMode ? "bg-slate-900" : "bg-white"
        }`}
      >
        <h1 className="text-3xl font-bold text-cyan-400">🚀 DevLens</h1>
        <ThemeToggle />
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-center text-gray-400 text-lg mb-8">
          GitHub Contribution Analyzer
        </p>

        {/* Search */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Recent Searches */}
        <RecentSearches
          searches={recentSearches}
          onSearch={handleSearch}
        />

        {/* Favorites */}
        <FavoriteProfiles
          favorites={favorites}
          onSelect={handleSearch}
        />

        {loading && (
          <div className="mt-8">
            <Loading />
          </div>
        )}

        {error && (
          <div className="mt-8">
            <ErrorMessage message={error} />
          </div>
        )}

        {profile && (
          <div className="mt-10 bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
            <ProfileCard
              profile={profile}
              onAddFavorite={handleAddFavorite}
            />
          </div>
        )}

        {Object.keys(analytics).length > 0 && (
          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-5">
              📊 Developer Analytics
            </h2>
            <AnalyticsCards analytics={analytics} />
          </div>
        )}

        {analytics.languageStats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">💻 Languages</h2>
              <LanguageChart languageStats={analytics.languageStats} />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">⭐ Stars</h2>
              <StarsChart repositories={repositories} />
            </div>
          </div>
        )}

        {repositories.length > 0 && (
          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-5">📁 Repositories</h2>
            <RepositoryList repositories={repositories} />
          </div>
        )}

        {followers.length > 0 && (
          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-5">👥 Followers</h2>
            <FollowersList followers={followers} />
          </div>
        )}

        {following.length > 0 && (
          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-5">➡️ Following</h2>
            <FollowingList following={following} />
          </div>
        )}

        {activityAnalytics && (
          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-5">📈 Activity Analytics</h2>
            <ActivityDashboard activity={activityAnalytics} />
          </div>
        )}

        {repositories.length > 0 && (
          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-5">🕒 Activity Timeline</h2>
            <ActivityTimeline repositories={repositories} />
          </div>
        )}

        {/* Developer Score */}
        {developerScore && (
          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-5">🏆 Developer Score</h2>
            <DeveloperScoreCard scoreData={developerScore} />
          </div>
        )}

        {/* AI Summary */}
        {aiSummary && (
          <div className="mt-10">
            <AISummaryCard summary={aiSummary} />
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mt-10">
            <SkillCard skills={skills} />
          </div>
        )}

        {/* Career Recommendation */}
        {careerRecommendations.length > 0 && (
          <div className="mt-10">
            <CareerRecommendationCard
              recommendations={careerRecommendations}
            />
          </div>
        )}

        {/* Resume Analysis */}
        {resumeAnalysis && (
          <div className="mt-10">
            <ResumeAnalysisCard analysis={resumeAnalysis} />
          </div>
        )}

        {/* Growth Prediction */}
        {growthPrediction && (
          <div className="mt-10">
            <GrowthPredictionCard prediction={growthPrediction} />
          </div>
        )}

        {/* Download PDF Button */}
        {profile && (
          <div className="flex justify-center mt-10 mb-16">
            <button
              onClick={handleDownloadPDF}
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
            >
              📄 Download DevLens Report
            </button>
          </div>
        )}
      </div>

      {/* Updated Hidden PDF Container */}
      <div
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "794px",
    background: "#fff",
    zIndex: -9999,
    opacity: 0,
    pointerEvents: "none",
  }}
>
  <div ref={pdfRef}>
    <PDFReport
      profile={profile}
      analytics={analytics}
      developerScore={developerScore}
      aiSummary={aiSummary}
      skills={skills}
      careerRecommendations={careerRecommendations}
      resumeAnalysis={resumeAnalysis}
      growthPrediction={growthPrediction}
    />
  </div>
</div>
    </div>
  );
}

export default Home;