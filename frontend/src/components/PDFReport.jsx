function PDFReport({
  profile,
  analytics = {},
  developerScore = {},
  aiSummary = "",
  skills = [],
  careerRecommendations = [],
  resumeAnalysis = {},
  growthPrediction = {},
}) {
  if (!profile) return null;

  return (
    <div
      id="pdf-report"
      className="w-[794px] min-h-[1123px] bg-white text-gray-900 p-10"
    >
      {/* Header */}
      <div
        className="rounded-2xl p-8"
        style={{
          background: "#0891B2",
          color: "#ffffff",
        }}
      >
        <h1 className="text-5xl font-bold">💻 CodeVista</h1>
        <p className="text-xl mt-3">
          AI Powered GitHub Developer Report
        </p>
      </div>

      {/* Profile */}
      <div className="mt-10 flex items-center gap-8 border rounded-2xl p-6 shadow">
        <img
          src={profile.avatar_url}
          alt={profile.login}
          className="w-32 h-32 rounded-full border-4 border-cyan-500"
        />

        <div>
          <h2 className="text-4xl font-bold">
            {profile.name || profile.login}
          </h2>

          <p
            className="text-xl"
            style={{
              color: "#6B7280",
            }}
          >
            @{profile.login}
          </p>

          <div className="flex gap-10 mt-5 text-lg">
            <div>
              <p className="font-bold">Followers</p>
              <p>{profile.followers ?? 0}</p>
            </div>

            <div>
              <p className="font-bold">Repositories</p>
              <p>{profile.public_repos ?? 0}</p>
            </div>

            <div>
              <p className="font-bold">Following</p>
              <p>{profile.following ?? 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-5 mt-10">
        <StatCard
          title="Repositories"
          icon="📁"
          value={analytics?.totalRepos ?? 0}
        />

        <StatCard
          title="Stars"
          icon="⭐"
          value={analytics?.totalStars ?? 0}
          color="bg-yellow-50"
        />

        <StatCard
          title="Forks"
          icon="🍴"
          value={analytics?.totalForks ?? 0}
          color="bg-green-50"
        />

        <StatCard
          title="Languages"
          icon="💻"
          value={Object.keys(analytics?.languageStats || {}).length}
          color="bg-purple-50"
        />
      </div>

      {/* Developer Score */}
      <div
        className="mt-10 rounded-2xl p-8"
        style={{
          background: "#0891B2",
          color: "#ffffff",
        }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">
              🏆 Developer Score
            </h2>

            <p className="mt-3">
              Overall GitHub Performance
            </p>
          </div>

          <div className="w-32 h-32 rounded-full border-8 border-white flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold">
                {developerScore?.score ?? 0}
              </h1>
              <p>/100</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Summary */}
      <div className="mt-10 border rounded-2xl shadow p-8">
        <h2
          className="text-3xl font-bold mb-4"
          style={{
            color: "#0891B2",
          }}
        >
          🤖 AI Summary
        </h2>

        <p>{aiSummary || "No summary available."}</p>
      </div>

      {/* Skills */}
      <div className="mt-10 border rounded-2xl shadow p-8">
        <h2
          className="text-3xl font-bold mb-5"
          style={{
            color: "#0891B2",
          }}
        >
          🛠 Skills
        </h2>

        <div className="flex flex-wrap gap-3">
          {skills.length ? (
            skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full"
                style={{
                  background: "#0891B2",
                  color: "#ffffff",
                }}
              >
                {skill}
              </span>
            ))
          ) : (
            <p>No skills detected.</p>
          )}
        </div>
      </div>

      {/* Career */}
      <div className="mt-10 border rounded-2xl shadow p-8">
        <h2
          className="text-3xl font-bold mb-5"
          style={{
            color: "#0891B2",
          }}
        >
          💼 Career Recommendations
        </h2>

        {careerRecommendations.length ? (
          careerRecommendations.map((career) => (
            <div key={career.role} className="mb-6">
              <div className="flex justify-between">
                <span>{career.role}</span>
                <span>{career.score}%</span>
              </div>

              <div
                className="rounded-full h-4 mt-2"
                style={{
                  background: "#E5E7EB",
                }}
              >
                <div
                  className="h-4 rounded-full"
                  style={{
                    background: "#0891B2",
                    width: `${career.score}%`,
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No recommendations available.</p>
        )}
      </div>

      {/* Resume */}
      <div className="mt-10 border rounded-2xl shadow p-8">
        <h2
          className="text-3xl font-bold mb-5"
          style={{
            color: "#0891B2",
          }}
        >
          📄 Resume Readiness
        </h2>

        <div className="grid grid-cols-2 gap-10">
          <div>
            <h3
              className="text-xl font-bold mb-3"
              style={{
                color: "#16A34A",
              }}
            >
              Strengths
            </h3>

            <ul>
              {(resumeAnalysis?.strengths || []).map((item) => (
                <li key={item}>✔ {item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="text-xl font-bold mb-3"
              style={{
                color: "#EF4444",
              }}
            >
              Improvements
            </h3>

            <ul>
              {(resumeAnalysis?.improvements || []).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Growth */}
      <div className="mt-10 border rounded-2xl shadow p-8">
        <h2
          className="text-3xl font-bold mb-5"
          style={{
            color: "#0891B2",
          }}
        >
          📈 Growth Prediction
        </h2>

        <div className="grid grid-cols-3 gap-6">
          <GrowthCard
            title="Repositories"
            current={growthPrediction?.repositories?.current ?? 0}
            predicted={growthPrediction?.repositories?.predicted ?? 0}
            color="text-cyan-600"
          />

          <GrowthCard
            title="Followers"
            current={growthPrediction?.followers?.current ?? 0}
            predicted={growthPrediction?.followers?.predicted ?? 0}
            color="text-green-600"
          />

          <GrowthCard
            title="Stars"
            current={growthPrediction?.stars?.current ?? 0}
            predicted={growthPrediction?.stars?.predicted ?? 0}
            color="text-yellow-600"
          />
        </div>
      </div>

      {/* Footer */}
      <div
        className="mt-16 border-t pt-8 text-center"
        style={{
          color: "#6B7280",
        }}
      >
        <h2
          className="text-2xl font-bold"
          style={{
            color: "#0891B2",
          }}
        >
          💻 Generated by CodeVista AI
        </h2>

        <p>GitHub Contribution Analyzer</p>

        <p>{new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div
      className="rounded-xl shadow p-5 text-center"
      style={{
        backgroundColor: "#F8FAFC",
      }}
    >
      <h2 className="text-3xl">{icon}</h2>

      <p
        className="mt-2"
        style={{ color: "#6B7280" }}
      >
        {title}
      </p>

      <p className="text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}

function GrowthCard({ title, current, predicted }) {
  return (
    <div
      className="rounded-xl p-6 text-center"
      style={{
        backgroundColor: "#F9FAFB",
      }}
    >
      <h3 className="font-bold text-xl">
        {title}
      </h3>

      <p className="text-2xl mt-4">
        {current}
      </p>

      <p className="text-3xl my-2">
        ↓
      </p>

      <p
        className="text-2xl font-bold"
        style={{
          color: "#0891B2",
        }}
      >
        {predicted}
      </p>
    </div>
  );
}

export default PDFReport;