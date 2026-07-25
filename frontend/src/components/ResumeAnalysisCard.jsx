function ResumeAnalysisCard({ analysis }) {
  if (!analysis) return null;

  const { score, strengths, improvements } = analysis;

  let color = "text-red-500";

  if (score >= 80) {
    color = "text-green-500";
  } else if (score >= 60) {
    color = "text-yellow-500";
  }

  return (
    <div className="mt-10 bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-cyan-500 mb-6">
        📄 Resume Readiness
      </h2>

      <div className="flex justify-center">
        <div className="text-center">
          <h1 className={`text-7xl font-bold ${color}`}>
            {score}
          </h1>

          <p className="text-xl text-gray-500">/100</p>

          <div className="w-56 bg-gray-200 rounded-full h-4 mt-5">
            <div
              className="bg-cyan-500 h-4 rounded-full transition-all duration-700"
              style={{
                width: `${score}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-10">
        <div>
          <h3 className="text-2xl font-bold text-green-500 mb-4">
            ✅ Strengths
          </h3>

          <ul className="space-y-3">
            {strengths.map((item) => (
              <li key={item}>
                ✔ {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-orange-500 mb-4">
            ⚠ Improvements
          </h3>

          <ul className="space-y-3">
            {improvements.map((item) => (
              <li key={item}>
                • {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ResumeAnalysisCard;