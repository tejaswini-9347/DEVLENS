function GrowthPredictionCard({ prediction }) {
  if (!prediction) return null;

  const { repositories, followers, stars, trend } = prediction;

  const metrics = [
    {
      title: "Repositories",
      current: repositories.current,
      predicted: repositories.predicted,
    },
    {
      title: "Followers",
      current: followers.current,
      predicted: followers.predicted,
    },
    {
      title: "Stars",
      current: stars.current,
      predicted: stars.predicted,
    },
  ];

  return (
    <div className="mt-10 bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-cyan-500 mb-6">
        📈 GitHub Growth Prediction
      </h2>

      <div className="mb-8">
        <span className="inline-block px-4 py-2 rounded-full bg-cyan-500 text-white font-semibold">
          {trend}
        </span>
      </div>

      <div className="space-y-6">
        {metrics.map((metric) => {
          const percentage = Math.min(
            (metric.current / metric.predicted) * 100,
            100
          );

          return (
            <div key={metric.title}>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">{metric.title}</span>

                <span>
                  {metric.current} ➜ {metric.predicted}
                </span>
              </div>

              <div className="w-full h-4 rounded-full bg-gray-300 dark:bg-gray-700">
                <div
                  className="h-4 rounded-full bg-cyan-500 transition-all duration-700"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GrowthPredictionCard;