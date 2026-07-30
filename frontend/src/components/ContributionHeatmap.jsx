import { GitHubCalendar } from "react-github-calendar";

export default function ContributionHeatmap({ username }) {
  if (!username) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        🔥 GitHub Contribution Heatmap
      </h2>

      <div className="overflow-x-auto">
        <GitHubCalendar
          username={username}
          colorScheme="dark"
        />
      </div>
    </div>
  );
}