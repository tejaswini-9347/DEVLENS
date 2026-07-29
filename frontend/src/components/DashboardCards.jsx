import {
  FaGithub,
  FaUsers,
  FaCodeBranch,
  FaStar,
} from "react-icons/fa";

export default function DashboardCards({
  profile,
  analytics,
  developerScore,
}) {
  const cards = [
    {
      title: "Repositories",
      value: profile?.public_repos ?? 0,
      icon: <FaGithub />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Followers",
      value: profile?.followers ?? 0,
      icon: <FaUsers />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Stars",
      value: analytics?.totalStars ?? 0,
      icon: <FaStar />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Developer Score",
      value: developerScore?.score ?? 0,
      icon: <FaCodeBranch />,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6"
        >
          <div
            className={`w-14 h-14 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center text-white text-2xl`}
          >
            {card.icon}
          </div>

          <h3 className="mt-4 text-lg font-semibold">
            {card.title}
          </h3>

          <p className="text-3xl font-bold mt-2">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}