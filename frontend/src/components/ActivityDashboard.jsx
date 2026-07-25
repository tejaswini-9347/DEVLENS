function ActivityDashboard({ activity }) {
  if (!activity) return null;

  return (
    <div className="mt-10 bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-cyan-500">
        📊 Activity Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-blue-100 dark:bg-slate-800 p-5 rounded-lg">
          <h3 className="text-lg font-semibold">Total Repositories</h3>
          <p className="text-3xl font-bold mt-2">
            {activity.totalRepositories}
          </p>
        </div>

        <div className="bg-green-100 dark:bg-slate-800 p-5 rounded-lg">
          <h3 className="text-lg font-semibold">Active Repositories</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">
            {activity.activeRepositories}
          </p>
        </div>

        <div className="bg-red-100 dark:bg-slate-800 p-5 rounded-lg">
          <h3 className="text-lg font-semibold">Inactive Repositories</h3>
          <p className="text-3xl font-bold mt-2 text-red-600">
            {activity.inactiveRepositories}
          </p>
        </div>

        <div className="bg-yellow-100 dark:bg-slate-800 p-5 rounded-lg">
          <h3 className="text-lg font-semibold">Activity Score</h3>
          <p className="text-3xl font-bold mt-2 text-yellow-600">
            {activity.activityScore}%
          </p>
        </div>

        <div className="bg-purple-100 dark:bg-slate-800 p-5 rounded-lg">
          <h3 className="text-lg font-semibold">Most Recently Updated</h3>
          <p className="mt-2 font-semibold">
            {activity.mostRecentlyUpdated?.name}
          </p>
        </div>

        <div className="bg-cyan-100 dark:bg-slate-800 p-5 rounded-lg">
          <h3 className="text-lg font-semibold">Oldest Repository</h3>
          <p className="mt-2 font-semibold">
            {activity.oldestRepository?.name}
          </p>
        </div>

      </div>
    </div>
  );
}

export default ActivityDashboard;