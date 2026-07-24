import { useState } from "react";
import { FaGithub, FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    onSearch(username);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto mt-10"
    >
      <div className="flex bg-slate-800 rounded-xl shadow-lg overflow-hidden">

        <div className="flex items-center px-4">
          <FaGithub className="text-2xl text-white" />
        </div>

        <input
          type="text"
          placeholder="Enter GitHub Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 bg-slate-800 text-white p-4 outline-none"
        />

        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 px-6 flex items-center gap-2 transition"
        >
          <FaSearch />
          Search
        </button>

      </div>
    </form>
  );
};

export default SearchBar;