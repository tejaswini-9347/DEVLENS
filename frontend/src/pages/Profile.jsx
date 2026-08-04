import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import PDFReport from "../components/PDFReport";

import DashboardCards from "../components/DashboardCards";
import QuickInsights from "../components/QuickInsights";
import ContributionHeatmap from "../components/ContributionHeatmap";
import ProfileCard from "../components/ProfileCard";

import AnalyticsCards from "../components/AnalyticsCards";
import RepositoryList from "../components/RepositoryList";
import FollowersList from "../components/FollowersList";
import FollowingList from "../components/FollowingList";

import LanguageChart from "../components/LanguageChart";
import StarsChart from "../components/StarsChart";

import ActivityDashboard from "../components/ActivityDashboard";
import ActivityTimeline from "../components/ActivityTimeline";

import DeveloperScoreCard from "../components/DeveloperScoreCard";
import AISummaryCard from "../components/AISummaryCard";
import SkillCard from "../components/SkillCard";
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

export default function Profile() {
  const { username } = useParams();

const pdfRef = useRef(null);

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const [profile, setProfile] = useState(null);
const [repositories, setRepositories] = useState([]);
const [analytics, setAnalytics] = useState({});

const [followers, setFollowers] = useState([]);
const [following, setFollowing] = useState([]);

const [activityAnalytics, setActivityAnalytics] = useState(null);

const [developerScore, setDeveloperScore] = useState(null);

const [aiSummary, setAiSummary] = useState("");

const [skills, setSkills] = useState([]);

const [careerRecommendations, setCareerRecommendations] = useState([]);

const [resumeAnalysis, setResumeAnalysis] = useState(null);

const [growthPrediction, setGrowthPrediction] = useState(null);

const [favorites, setFavorites] = useState([]);


 useEffect(() => {
  const favs =
    JSON.parse(localStorage.getItem("favoriteProfiles")) || [];

  setFavorites(favs);

  if (username) {
    fetchData();
  }
}, [username]);

const fetchData = async () => {
  try {
    setLoading(true);
    setError("");

    const profileData = await getProfile(username);
    setProfile(profileData);

    const repoData = await getRepositories(username);
    setRepositories(repoData.repositories);
    setAnalytics(repoData.analytics);

    const followersData = await getFollowers(username);
    setFollowers(followersData);

    const followingData = await getFollowing(username);
    setFollowing(followingData);

    const activityData =
      await getActivityAnalytics(username);
    setActivityAnalytics(activityData);

    const scoreData =
      await getDeveloperScore(username);
    setDeveloperScore(scoreData);

    const summaryData =
      await getAISummary(username);
    setAiSummary(summaryData.summary);

    const skillData =
      await getDetectedSkills(username);
    setSkills(skillData.skills);

    const careerData =
      await getCareerRecommendations(username);
    setCareerRecommendations(
      careerData.recommendations
    );

    const resumeData =
      await getResumeAnalysis(username);
    setResumeAnalysis(resumeData);

    const growthData =
      await getGrowthPrediction(username);
    setGrowthPrediction(growthData);

  } catch (err) {
    console.log(err);

    setError("GitHub user not found");
  } finally {
    setLoading(false);
  }
};

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

  const handleDownloadPDF = useReactToPrint({
  contentRef: pdfRef,
  documentTitle: "CodeVista_Report",
});

if (loading) {
  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center">
      <Loading />
    </div>
  );
}
return (
  <div className="min-h-screen bg-slate-950 text-white">

    <div className="max-w-7xl mx-auto px-6 pt-0 pb-8">
         {/* Profile Card */}

      {profile && (
        <div className="mt-10 bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">

          <ProfileCard
            profile={profile}
            onAddFavorite={handleAddFavorite}
          />

        </div>
      )}

      {/* Dashboard Cards */}

      {profile && (
        <div className="mt-8">
          <DashboardCards
            profile={profile}
            analytics={analytics}
            developerScore={developerScore}
          />
        </div>
      )}

      {/* Quick Insights */}

      {profile && (
        <div className="mt-8">
          <QuickInsights
            analytics={analytics}
            developerScore={developerScore}
          />
        </div>
      )}

      {/* Contribution Heatmap */}

      {profile && (
        <div className="mt-8">
          <ContributionHeatmap
            username={profile.login}
          />
        </div>
      )}

      {/* Error */}

      {error && (
        <div className="mt-8">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* Analytics */}

      {Object.keys(analytics).length > 0 && (
        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-5">

            📊 Developer Analytics

          </h2>

          <AnalyticsCards
            analytics={analytics}
          />

        </div>
      )}

      {/* Charts */}

      {analytics.languageStats && (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-4">
              💻 Languages
            </h2>

            <LanguageChart
              languageStats={analytics.languageStats}
            />

          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-4">
              ⭐ Stars
            </h2>

            <StarsChart
              repositories={repositories}
            />

          </div>

        </div>

      )}
            {/* Repository List */}

      {repositories.length > 0 && (
        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-5">
            📁 Repositories
          </h2>

          <RepositoryList
            repositories={repositories}
          />

        </div>
      )}

      {/* Followers */}

      {followers.length > 0 && (
        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-5">
            👥 Followers
          </h2>

          <FollowersList
            followers={followers}
          />

        </div>
      )}

      {/* Following */}

      {following.length > 0 && (
        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-5">
            ➡️ Following
          </h2>

          <FollowingList
            following={following}
          />

        </div>
      )}

      {/* Activity Dashboard */}

      {activityAnalytics && (
        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-5">
            📈 Activity Analytics
          </h2>

          <ActivityDashboard
            activity={activityAnalytics}
          />

        </div>
      )}

      {/* Activity Timeline */}

      {repositories.length > 0 && (
        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-5">
            🕒 Activity Timeline
          </h2>

          <ActivityTimeline
            repositories={repositories}
          />

        </div>
      )}
            {/* Developer Score */}

      {developerScore && (
        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-5">
            🏆 Developer Score
          </h2>

          <DeveloperScoreCard
            scoreData={developerScore}
          />

        </div>
      )}

      {/* AI Summary */}

      {aiSummary && (
        <div className="mt-10">

          <AISummaryCard
            summary={aiSummary}
          />

        </div>
      )}

      {/* Skills */}

      {skills.length > 0 && (
        <div className="mt-10">

          <SkillCard
            skills={skills}
          />

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

          <ResumeAnalysisCard
            analysis={resumeAnalysis}
          />

        </div>
      )}

      {/* Growth Prediction */}

      {growthPrediction && (
        <div className="mt-10">

          <GrowthPredictionCard
            prediction={growthPrediction}
          />

        </div>
      )}

      {/* Download PDF */}

      {profile && (
        <div className="flex justify-center mt-10 mb-16">

          <button
            onClick={handleDownloadPDF}
            className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            📄 Download CodeVista Report
          </button>

        </div>
      )}

    </div>

    {/* Hidden PDF */}

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


