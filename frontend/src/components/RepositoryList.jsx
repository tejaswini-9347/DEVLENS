import { useMemo, useState } from "react";
import RepositoryCard from "./RepositoryCard";

const RepositoryList = ({ repositories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [sortOption, setSortOption] = useState("name");

  // Get unique languages
  const languages = useMemo(() => {
    const uniqueLanguages = [
      ...new Set(
        repositories
          .map((repo) => repo.language)
          .filter((language) => language)
      ),
    ];

    return ["All", ...uniqueLanguages];
  }, [repositories]);

  // Filter + Sort repositories
  const filteredRepositories = repositories
    .filter((repo) => {
      const matchesSearch = repo.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesLanguage =
        selectedLanguage === "All" ||
        repo.language === selectedLanguage;

      return matchesSearch && matchesLanguage;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "stars":
          return b.stars - a.stars;

        case "forks":
          return b.forks - a.forks;

        case "updated":
          return new Date(b.updatedAt) - new Date(a.updatedAt);

        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="mt-12">

      {/* Heading */}
      <h2 className="text-4xl font-bold text-center mb-8">
        📂 Repositories
      </h2>

      {/* Search */}
      <div className="max-w-lg mx-auto mb-6">
        <input
          type="text"
          placeholder="Search Repository..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Language Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {languages.map((language) => (
          <button
            key={language}
            onClick={() => setSelectedLanguage(language)}
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              selectedLanguage === language
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 hover:bg-slate-700 text-white"
            }`}
          >
            {language}
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className="flex justify-center mb-10">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="name">🔤 Sort by Name</option>
          <option value="stars">⭐ Sort by Stars</option>
          <option value="forks">🍴 Sort by Forks</option>
          <option value="updated">📅 Sort by Updated</option>
        </select>
      </div>

      {/* Repository Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredRepositories.length > 0 ? (
          filteredRepositories.map((repo) => (
            <RepositoryCard
              key={repo.name}
              repo={repo}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 text-xl">
            No repositories found.
          </div>
        )}
      </div>
    </div>
  );
};

export default RepositoryList;