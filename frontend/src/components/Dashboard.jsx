import {
  FaGithub,
  FaCodeBranch,
  FaUsers,
  FaStar,
} from "react-icons/fa";

export default function Dashboard() {
  const cards = [
    {
      title: "Repositories",
      value: "120",
      icon: <FaGithub size={28} />,
      color: "bg-blue-500",
    },
    {
      title: "Followers",
      value: "2.4K",
      icon: <FaUsers size={28} />,
      color: "bg-green-500",
    },
    {
      title: "Stars Earned",
      value: "860",
      icon: <FaStar size={28} />,
      color: "bg-yellow-500",
    },
    {
      title: "Commits",
      value: "4.7K",
      icon: <FaCodeBranch size={28} />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Welcome to DevLens 🚀
        </h1>

        <p className="text-gray-500 mt-2">
          AI Powered GitHub Contribution Analyzer
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6"
          >
            <div
              className={`${card.color} w-14 h-14 rounded-xl flex items-center justify-center text-white`}
            >
              {card.icon}
            </div>

            <h2 className="mt-4 text-lg font-semibold">
              {card.title}
            </h2>

            <p className="text-3xl font-bold mt-2">
              {card.value}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}