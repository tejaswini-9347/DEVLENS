import {
  FaStar,
  FaCodeBranch,
  FaCode,
  FaExternalLinkAlt,
} from "react-icons/fa";

const RepositoryCard = ({ repo }) => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1 transition-all duration-300">

      <h2 className="text-2xl font-bold text-cyan-400">
        {repo.name}
      </h2>

      <p className="text-slate-300 mt-3 min-h-[60px]">
        {repo.description || "No description available."}
      </p>

      <div className="flex flex-wrap gap-4 mt-5 text-sm">

        <span className="flex items-center gap-2">
          <FaCode className="text-purple-400" />
          {repo.language || "N/A"}
        </span>

        <span className="flex items-center gap-2">
          <FaStar className="text-yellow-400" />
          {repo.stars}
        </span>

        <span className="flex items-center gap-2">
          <FaCodeBranch className="text-green-400" />
          {repo.forks}
        </span>

      </div>

      <p className="text-slate-500 mt-5 text-sm">
        Updated: {new Date(repo.updatedAt).toLocaleDateString()}
      </p>

      <a
        href={repo.repositoryUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 mt-6 bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg transition"
      >
        <FaExternalLinkAlt />
        View Repository
      </a>

    </div>
  );
};

export default RepositoryCard;