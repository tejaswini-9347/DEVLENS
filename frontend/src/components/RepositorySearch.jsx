import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
export default function RepositorySearch({ onSearch }) {
  const [repo, setRepo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!repo.trim()) {
      toast.error("Please enter a repository.");
      return;
    }

    onSearch(repo);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-4 mb-8"
    >
      <input
        type="text"
        placeholder="owner/repository (e.g. facebook/react)"
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
        className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:border-blue-500"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-6 rounded-lg flex items-center gap-2"
      >
        <FaSearch />
        Analyze
      </button>
    </form>
  );
}