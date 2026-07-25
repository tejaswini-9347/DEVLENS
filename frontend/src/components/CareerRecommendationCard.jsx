function CareerRecommendationCard({ recommendations }) {
  if (!recommendations || recommendations.length === 0) return null;

  const bestRole = recommendations[0];

  return (
    <div className="mt-10 bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-cyan-500 mb-6">
        💼 Career Recommendations
      </h2>

      <div className="mb-8 bg-cyan-100 dark:bg-cyan-900 rounded-xl p-5">
        <h3 className="text-xl font-bold">
          🏆 Best Career Match
        </h3>

        <p className="text-2xl font-semibold mt-2">
          {bestRole.role}
        </p>

        <p className="text-lg text-gray-600 dark:text-gray-300">
          Match Score: {bestRole.score}%
        </p>
      </div>

      <div className="space-y-5">
        {recommendations.map((career) => (
          <div key={career.role}>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">
                {career.role}
              </span>

              <span>{career.score}%</span>
            </div>

            <div className="w-full h-4 rounded-full bg-gray-300 dark:bg-gray-700">
              <div
                className="h-4 rounded-full bg-cyan-500 transition-all duration-700"
                style={{
                  width: `${career.score}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CareerRecommendationCard;