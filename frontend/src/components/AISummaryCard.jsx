function AISummaryCard({ summary }) {
  if (!summary) return null;

  return (
    <div className="mt-10 bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-cyan-500 mb-6">
        🤖 AI GitHub Summary
      </h2>

      <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6">
        <p className="text-lg leading-8 text-gray-700 dark:text-gray-300">
          {summary}
        </p>
      </div>
    </div>
  );
}

export default AISummaryCard;