const RepositoryHealthCard = ({ health }) => {
  if (!health) return null;

  return (
    <div className="bg-white text-black rounded-xl shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">
        ❤️ Repository Health Score
      </h2>

      <div className="text-center mb-6">
        <h1 className="text-5xl font-bold text-green-600">
          {health.score}/100
        </h1>

        <p className="text-lg font-semibold mt-2">
          {health.status}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between">
            <span>⭐ Popularity</span>
            <span>{health.popularity}%</span>
          </div>
          <progress value={health.popularity} max="100" className="w-full"></progress>
        </div>

        <div>
          <div className="flex justify-between">
            <span>📈 Activity</span>
            <span>{health.activity}%</span>
          </div>
          <progress value={health.activity} max="100" className="w-full"></progress>
        </div>

        <div>
          <div className="flex justify-between">
            <span>📚 Documentation</span>
            <span>{health.documentation}%</span>
          </div>
          <progress value={health.documentation} max="100" className="w-full"></progress>
        </div>

        <div>
          <div className="flex justify-between">
            <span>🛠 Maintenance</span>
            <span>{health.maintenance}%</span>
          </div>
          <progress value={health.maintenance} max="100" className="w-full"></progress>
        </div>

        <div>
          <div className="flex justify-between">
            <span>👥 Community</span>
            <span>{health.community}%</span>
          </div>
          <progress value={health.community} max="100" className="w-full"></progress>
        </div>
      </div>
    </div>
  );
};

export default RepositoryHealthCard;