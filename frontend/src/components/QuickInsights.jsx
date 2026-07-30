import {
  FaFire,
  FaStar,
  FaCodeBranch,
  FaRobot,
} from "react-icons/fa";

export default function QuickInsights({
  analytics,
  developerScore,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        🎯 Quick Insights
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>
            <FaFire className="inline mr-2 text-orange-500"/>
            Total Commits
          </span>

          <strong>
            {analytics.totalCommits}
          </strong>
        </div>

        <div className="flex justify-between">
          <span>
            <FaStar className="inline mr-2 text-yellow-500"/>
            Total Stars
          </span>

          <strong>
            {analytics.totalStars}
          </strong>
        </div>

        <div className="flex justify-between">
          <span>
            <FaCodeBranch className="inline mr-2 text-purple-500"/>
            Forks
          </span>

          <strong>
            {analytics.totalForks}
          </strong>
        </div>

        <div className="flex justify-between">
          <span>
            <FaRobot className="inline mr-2 text-cyan-500"/>
            Developer Score
          </span>

          <strong>
            {developerScore?.score}
          </strong>
        </div>

      </div>

    </div>
  );
}