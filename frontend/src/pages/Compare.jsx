import { useState, useRef } from "react";
import ComparisonChart from "../components/ComparisonChart";
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
export default function Compare() {
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");

  const [profile1, setProfile1] = useState(null);
  const [profile2, setProfile2] = useState(null);

  const [repoStats1, setRepoStats1] = useState(null);
  const [repoStats2, setRepoStats2] = useState(null);

  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);

  const reportRef = useRef(null);

  const githubHeaders = {
    Accept: "application/vnd.github+json",
    ...(import.meta.env.VITE_GITHUB_TOKEN && {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    }),
  };

  const getWinner = (value1, value2) => {
    if (value1 > value2) return 1;
    if (value2 > value1) return 2;
    return 0;
  };

  const calculateDeveloperScore = (profile, stats) => {
    let score = 0;

    score += profile.followers * 2;
    score += profile.public_repos;
    score += stats.totalStars * 3;
    score += stats.totalForks * 2;

    return Math.min(100, Math.round(score / 10));
  };

  const calculateStats = (repos) => {
    if (!Array.isArray(repos)) {
      return {
        totalStars: 0,
        totalForks: 0,
        languages: {},
      };
    }

    const totalStars = repos.reduce(
      (sum, repo) => sum + (repo.stargazers_count || 0),
      0
    );

    const totalForks = repos.reduce(
      (sum, repo) => sum + (repo.forks_count || 0),
      0
    );

    const languages = {};

    repos.forEach((repo) => {
      if (repo.language) {
        languages[repo.language] =
          (languages[repo.language] || 0) + 1;
      }
    });

    return {
      totalStars,
      totalForks,
      languages,
    };
  };

  const generateSummary = (
    profile1,
    profile2,
    stats1,
    stats2,
    score1,
    score2
  ) => {
    let summary = [];

    if (profile1.followers > profile2.followers) {
      summary.push(
        `${profile1.login} has more GitHub followers than ${profile2.login}.`
      );
    } else if (profile2.followers > profile1.followers) {
      summary.push(
        `${profile2.login} has more GitHub followers than ${profile1.login}.`
      );
    }

    if (stats1.totalStars > stats2.totalStars) {
      summary.push(
        `${profile1.login} has received more repository stars.`
      );
    } else if (stats2.totalStars > stats1.totalStars) {
      summary.push(
        `${profile2.login} has received more repository stars.`
      );
    }

    if (stats1.totalForks > stats2.totalForks) {
      summary.push(
        `${profile1.login} has more repository forks.`
      );
    } else if (stats2.totalForks > stats1.totalForks) {
      summary.push(
        `${profile2.login} has more repository forks.`
      );
    }

    if (profile1.public_repos > profile2.public_repos) {
      summary.push(
        `${profile1.login} owns more public repositories.`
      );
    } else if (profile2.public_repos > profile1.public_repos) {
      summary.push(
        `${profile2.login} owns more public repositories.`
      );
    }

    if (score1 > score2) {
      summary.push(
        `Overall, ${profile1.login} has the stronger GitHub profile.`
      );
    } else if (score2 > score1) {
      summary.push(
        `Overall, ${profile2.login} has the stronger GitHub profile.`
      );
    } else {
      summary.push(
        "Both developers have very similar GitHub profiles."
      );
    }

    return summary;
  };
    const handleCompare = async () => {
    if (!username1.trim() || !username2.trim()) {
      toast.error("Please enter both GitHub usernames.");
      return;
    }

    try {
      setLoading(true);

      // Clear previous data
      setProfile1(null);
      setProfile2(null);
      setRepoStats1(null);
      setRepoStats2(null);
      setSummary([]);
      setScore1(0);
      setScore2(0);

      // Fetch GitHub Profiles
      const [res1, res2] = await Promise.all([
        fetch(`https://api.github.com/users/${username1}`, {
          headers: githubHeaders,
        }),
        fetch(`https://api.github.com/users/${username2}`, {
          headers: githubHeaders,
        }),
      ]);

      // User not found
      if (res1.status === 404 || res2.status === 404) {
        toast.error("One or both GitHub usernames were not found.");
        return;
      }

      // Rate limit
      if (res1.status === 403 || res2.status === 403) {
        toast.error(
          "GitHub API rate limit exceeded.\nPlease add your GitHub Token or try again later."
        );
        return;
      }

      if (!res1.ok || !res2.ok) {
        throw new Error("Failed to fetch GitHub profiles.");
      }

      const data1 = await res1.json();
      const data2 = await res2.json();

      // Fetch repositories
      const [repoRes1, repoRes2] = await Promise.all([
        fetch(
          `https://api.github.com/users/${username1}/repos?per_page=100`,
          {
            headers: githubHeaders,
          }
        ),
        fetch(
          `https://api.github.com/users/${username2}/repos?per_page=100`,
          {
            headers: githubHeaders,
          }
        ),
      ]);

      if (repoRes1.status === 403 || repoRes2.status === 403) {
        toast.error("GitHub API rate limit exceeded while fetching repositories.");
        return;
      }

      const repos1 = repoRes1.ok ? await repoRes1.json() : [];
      const repos2 = repoRes2.ok ? await repoRes2.json() : [];

      const stats1 = calculateStats(repos1);
      const stats2 = calculateStats(repos2);

      setProfile1(data1);
      setProfile2(data2);

      setRepoStats1(stats1);
      setRepoStats2(stats2);

      const developerScore1 = calculateDeveloperScore(data1, stats1);
      const developerScore2 = calculateDeveloperScore(data2, stats2);

      setScore1(developerScore1);
      setScore2(developerScore2);

      setSummary(
        generateSummary(
          data1,
          data2,
          stats1,
          stats2,
          developerScore1,
          developerScore2
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch GitHub profiles.");
    } finally {
      setLoading(false);
    }
  };
  const downloadPDF = async () => {
  if (!reportRef.current) return;

  try {
    const dataUrl = await htmlToImage.toPng(reportRef.current, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: "#111827",
    });

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(dataUrl);

    const imgWidth = pageWidth;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);

    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(
      `GitHub_Comparison_${username1}_vs_${username2}.pdf`
    );
  } catch (error) {
    console.error(error);
    toast.error("Failed to generate PDF.");
  }
};

return (
  <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center p-8">
    <div className="w-full max-w-5xl mx-auto bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl p-10">

      <h1 className="text-4xl font-bold text-center mb-8">
        GitHub Profile Comparison
      </h1>

      {/* Username 1 */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-300">
          GitHub Username 1
        </label>

        <input
          type="text"
          placeholder="Enter first username"
          value={username1}
          onChange={(e) => setUsername1(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none"
        />
      </div>

      {/* Username 2 */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-300">
          GitHub Username 2
        </label>

        <input
          type="text"
          placeholder="Enter second username"
          value={username2}
          onChange={(e) => setUsername2(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none"
        />
      </div>

      {/* Compare Button */}
      {/* Compare Button */}

<div className="flex justify-center mt-8">

  <button
    onClick={handleCompare}
    disabled={loading}
    className="px-12 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-700 font-bold text-lg shadow-lg transition"
  >
    {loading ? "Comparing..." : "🔍 Compare Developers"}
  </button>

</div>

{/* Loading */}

{loading && (

  <div className="mt-8 bg-slate-900 border border-slate-700 rounded-xl p-6 flex items-center gap-5 shadow-lg">

    <Loader />

    <div>

      <h3 className="text-lg font-semibold">
        Comparing Profiles...
      </h3>

      <p className="text-slate-400">
        DevLens is comparing repositories, skills and developer statistics...
      </p>

    </div>

  </div>

)}

      {profile1 && profile2 && (
        <>
          <div ref={reportRef}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

              {/* Profile 1 */}
              <div className="bg-gray-800 rounded-lg p-6 text-center">

                <img
                  src={profile1.avatar_url}
                  alt={profile1.login}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />

                <h2 className="text-2xl font-bold">
                  {profile1.name || profile1.login}
                </h2>

                <p>@{profile1.login}</p>

                <hr className="my-4 border-gray-700" />

                <p>Followers: {profile1.followers}</p>
                <p>Following: {profile1.following}</p>
                <p>Repositories: {profile1.public_repos}</p>
                <p>⭐ Stars: {repoStats1?.totalStars}</p>
                <p>🍴 Forks: {repoStats1?.totalForks}</p>

                <p>
                  💻 Languages:
                  {" "}
                  {repoStats1
                    ? Object.keys(repoStats1.languages).join(", ")
                    : "N/A"}
                </p>

                <p className="mt-4 text-cyan-400 font-bold text-xl">
                  Developer Score: {score1}/100
                </p>

              </div>

              {/* Profile 2 */}

              <div className="bg-gray-800 rounded-lg p-6 text-center">

                <img
                  src={profile2.avatar_url}
                  alt={profile2.login}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />

                <h2 className="text-2xl font-bold">
                  {profile2.name || profile2.login}
                </h2>

                <p>@{profile2.login}</p>

                <hr className="my-4 border-gray-700" />

                <p>Followers: {profile2.followers}</p>
                <p>Following: {profile2.following}</p>
                <p>Repositories: {profile2.public_repos}</p>
                <p>⭐ Stars: {repoStats2?.totalStars}</p>
                <p>🍴 Forks: {repoStats2?.totalForks}</p>

                <p>
                  💻 Languages:
                  {" "}
                  {repoStats2
                    ? Object.keys(repoStats2.languages).join(", ")
                    : "N/A"}
                </p>

                <p className="mt-4 text-cyan-400 font-bold text-xl">
                  Developer Score: {score2}/100
                </p>

              </div>

            </div>

            {/* Winner */}

            <div className="mt-10 bg-gray-800 rounded-xl p-6 text-center">

              <h2 className="text-3xl font-bold text-yellow-400">
                🏆 Overall Winner
              </h2>

              <p className="text-2xl mt-4">
                {score1 > score2
                  ? profile1.login
                  : score2 > score1
                  ? profile2.login
                  : "It's a Tie!"}
              </p>

            </div>
                        {/* Detailed Comparison */}

            <div className="mt-10 bg-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-center mb-6">
                📊 Detailed Comparison
              </h2>

              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-3">Metric</th>
                    <th className="p-3">{profile1.login}</th>
                    <th className="p-3">{profile2.login}</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="p-3">Followers</td>

                    <td>
                      {profile1.followers}
                      {getWinner(profile1.followers, profile2.followers) === 1 &&
                        " 🥇"}
                    </td>

                    <td>
                      {profile2.followers}
                      {getWinner(profile1.followers, profile2.followers) === 2 &&
                        " 🥇"}
                    </td>
                  </tr>

                  <tr className="border-b border-gray-700">
                    <td className="p-3">Repositories</td>

                    <td>
                      {profile1.public_repos}
                      {getWinner(
                        profile1.public_repos,
                        profile2.public_repos
                      ) === 1 && " 🥇"}
                    </td>

                    <td>
                      {profile2.public_repos}
                      {getWinner(
                        profile1.public_repos,
                        profile2.public_repos
                      ) === 2 && " 🥇"}
                    </td>
                  </tr>

                  <tr className="border-b border-gray-700">
                    <td className="p-3">Stars</td>

                    <td>
                      {repoStats1.totalStars}
                      {getWinner(
                        repoStats1.totalStars,
                        repoStats2.totalStars
                      ) === 1 && " 🥇"}
                    </td>

                    <td>
                      {repoStats2.totalStars}
                      {getWinner(
                        repoStats1.totalStars,
                        repoStats2.totalStars
                      ) === 2 && " 🥇"}
                    </td>
                  </tr>

                  <tr className="border-b border-gray-700">
                    <td className="p-3">Forks</td>

                    <td>
                      {repoStats1.totalForks}
                      {getWinner(
                        repoStats1.totalForks,
                        repoStats2.totalForks
                      ) === 1 && " 🥇"}
                    </td>

                    <td>
                      {repoStats2.totalForks}
                      {getWinner(
                        repoStats1.totalForks,
                        repoStats2.totalForks
                      ) === 2 && " 🥇"}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-bold">Developer Score</td>

                    <td>
                      {score1}
                      {getWinner(score1, score2) === 1 && " 🥇"}
                    </td>

                    <td>
                      {score2}
                      {getWinner(score1, score2) === 2 && " 🥇"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* AI Summary */}

            <div className="mt-10 bg-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-center text-cyan-400 mb-6">
                🤖 AI Comparison Summary
              </h2>

              <ul className="space-y-3">
                {summary.map((item, index) => (
                  <li
                    key={index}
                    className="bg-gray-900 p-3 rounded-lg"
                  >
                    ✅ {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Chart */}

            <ComparisonChart
              profile1={profile1}
              profile2={profile2}
              repoStats1={repoStats1}
              repoStats2={repoStats2}
              score1={score1}
              score2={score2}
            />

          </div>

          {/* Download Button */}

          <div className="text-center mt-8">
            <button
              onClick={downloadPDF}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-bold transition"
            >
              📥 Download PDF Report
            </button>
          </div>

        </>
      )}

    </div>
  </div>
);
}