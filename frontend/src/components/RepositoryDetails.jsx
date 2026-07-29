import {
  FaStar,
  FaCodeBranch,
  FaEye,
  FaBug,
  FaCode,
  FaGithub,
} from "react-icons/fa";

export default function RepositoryDetails({ repository }) {
  return (
    <div className="bg-gray-900 rounded-xl shadow-lg p-6 mt-8 border border-gray-800">

      <div className="flex items-center gap-3 mb-6">
        <FaGithub className="text-3xl text-white" />
        <div>
          <h2 className="text-2xl font-bold">
            {repository.full_name}
          </h2>

          <p className="text-gray-400">
            {repository.description || "No description available"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

        <div className="bg-gray-800 rounded-lg p-4">
          <FaStar className="text-yellow-400 text-2xl mb-2" />
          <p className="text-gray-400">Stars</p>
          <h3 className="text-xl font-bold">
            {repository.stargazers_count}
          </h3>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <FaCodeBranch className="text-green-400 text-2xl mb-2" />
          <p className="text-gray-400">Forks</p>
          <h3 className="text-xl font-bold">
            {repository.forks_count}
          </h3>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <FaEye className="text-blue-400 text-2xl mb-2" />
          <p className="text-gray-400">Watchers</p>
          <h3 className="text-xl font-bold">
            {repository.watchers_count}
          </h3>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <FaBug className="text-red-400 text-2xl mb-2" />
          <p className="text-gray-400">Open Issues</p>
          <h3 className="text-xl font-bold">
            {repository.open_issues_count}
          </h3>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <FaCode className="text-purple-400 text-2xl mb-2" />
          <p className="text-gray-400">Language</p>
          <h3 className="text-xl font-bold">
            {repository.language || "N/A"}
          </h3>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400">Default Branch</p>
          <h3 className="text-xl font-bold">
            {repository.default_branch}
          </h3>
        </div>

      </div>

      <div className="mt-6">
        <a
          href={repository.html_url}
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
        >
          View on GitHub
        </a>
      </div>

    </div>
  );
}