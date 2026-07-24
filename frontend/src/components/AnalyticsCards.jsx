import {
  FaBook,
  FaStar,
  FaCode,
  FaTrophy,
  FaCodeBranch,
} from "react-icons/fa";

const AnalyticsCards = ({ analytics }) => {
  const cards = [
    {
      title: "Repositories",
      value: analytics.repositoryCount || 0,
      icon: <FaBook className="text-3xl text-cyan-400" />,
    },
    {
      title: "Stars",
      value: analytics.totalStars || 0,
      icon: <FaStar className="text-3xl text-yellow-400" />,
    },
    {
      title: "Forks",
      value: analytics.totalForks || 0,
      icon: <FaCodeBranch className="text-3xl text-green-400" />,
    },
    {
      title: "Language",
      value: analytics.mostUsedLanguage || "N/A",
      icon: <FaCode className="text-3xl text-purple-400" />,
    },
    {
      title: "Popular Repo",
      value: analytics.mostPopularRepository || "N/A",
      icon: <FaTrophy className="text-3xl text-orange-400" />,
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        📊 GitHub Analytics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-700 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex justify-center mb-4">
              {card.icon}
            </div>

            <h3 className="text-lg text-slate-400 text-center">
              {card.title}
            </h3>

            <p className="text-2xl font-bold text-center mt-2 break-words">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsCards;