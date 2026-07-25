function DeveloperScoreCard({ scoreData }) {
  if (!scoreData) return null;

  const {
    score,
    repoPoints,
    starPoints,
    forkPoints,
    followerPoints,
    activityPoints,
    languagePoints,
  } = scoreData;

  let level = "Beginner";
  let color = "text-red-500";

  if (score >= 90) {
    level = "Expert Developer";
    color = "text-green-500";
  } else if (score >= 75) {
    level = "Advanced Developer";
    color = "text-blue-500";
  } else if (score >= 60) {
    level = "Intermediate Developer";
    color = "text-yellow-500";
  }

  return (
    <div className="mt-10 bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-center text-cyan-500">
        🏆 Developer Score
      </h2>

      <div className="text-center mt-6">
        <h1 className={`text-7xl font-bold ${color}`}>
          {score}
        </h1>

        <p className="text-xl text-gray-500">
          /100
        </p>

        <div className="w-full bg-gray-200 rounded-full h-4 mt-6">
          <div
            className="bg-cyan-500 h-4 rounded-full transition-all duration-700"
            style={{ width: `${score}%` }}
          ></div>
        </div>

        <p className={`mt-4 text-2xl font-semibold ${color}`}>
          ⭐ {level}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-8">

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 flex justify-between">
          <span>Repositories</span>
          <span>{repoPoints}/20</span>
        </div>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 flex justify-between">
          <span>Stars</span>
          <span>{starPoints}/20</span>
        </div>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 flex justify-between">
          <span>Forks</span>
          <span>{forkPoints}/15</span>
        </div>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 flex justify-between">
          <span>Followers</span>
          <span>{followerPoints}/20</span>
        </div>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 flex justify-between">
          <span>Activity</span>
          <span>{activityPoints}/15</span>
        </div>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 flex justify-between">
          <span>Languages</span>
          <span>{languagePoints}/10</span>
        </div>

      </div>
    </div>
  );
}

export default DeveloperScoreCard;