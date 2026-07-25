function ActivityTimeline({ repositories }) {
  if (!repositories || repositories.length === 0) return null;

  const sortedRepositories = [...repositories].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  return (
    <div className="mt-10 bg-white dark:bg-slate-900 shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-cyan-500 mb-6">
        📅 Repository Activity Timeline
      </h2>

      <div className="space-y-4">
        {sortedRepositories.map((repo) => (
          <div
            key={repo.name}
            className="border-l-4 border-cyan-500 pl-4"
          >
            <h3 className="font-semibold text-lg">
              {repo.name}
            </h3>

            <p className="text-gray-500 dark:text-gray-400">
              Last Updated:
              {" "}
              {new Date(repo.updatedAt).toLocaleDateString()}
            </p>

            <p className="text-sm">
              ⭐ {repo.stars} | 🍴 {repo.forks}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityTimeline;