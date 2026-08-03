import { useEffect, useRef, useState } from "react";
import { FaGithub, FaSearch, FaHistory, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const searchRef = useRef();

  useEffect(() => {
    const searches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];

    setRecentSearches(searches);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    const updated = [
      username,
      ...recentSearches.filter((item) => item !== username),
    ].slice(0, 10);

    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updated)
    );

    setRecentSearches(updated);

    navigate(`/profile/${username}`);
  };

  const removeSearch = (search) => {
    const updated = recentSearches.filter(
      (item) => item !== search
    );

    setRecentSearches(updated);

    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updated)
    );
  };

  const clearAll = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <div
      ref={searchRef}
      className="relative max-w-2xl mx-auto mt-10"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex bg-slate-800 rounded-xl shadow-lg overflow-hidden">

          <div className="flex items-center px-4">
            <FaGithub className="text-2xl text-white" />
          </div>

          <input
            type="text"
            placeholder="Search GitHub Username..."
            value={username}
            onFocus={() => setShowDropdown(true)}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="flex-1 bg-slate-800 text-white p-4 outline-none"
          />

          <button
            className="bg-cyan-500 hover:bg-cyan-600 px-6 flex items-center gap-2"
          >
            <FaSearch />
            Search
          </button>

        </div>
      </form>

      {showDropdown && recentSearches.length > 0 && (
        <div className="absolute w-full mt-2 bg-slate-900 rounded-xl shadow-2xl border border-slate-700 overflow-hidden z-50">

          {recentSearches.map((item) => (
            <div
              key={item}
              className="flex justify-between items-center px-4 py-3 hover:bg-slate-800 cursor-pointer"
            >
              <div
                onClick={() => {
                  setUsername(item);
                  navigate(`/profile/${item}`);
                }}
                className="flex items-center gap-3"
              >
                <FaHistory className="text-slate-400" />
                <span>{item}</span>
              </div>

              <button
                onClick={() => removeSearch(item)}
              >
                <FaTimes className="text-slate-500 hover:text-red-400" />
              </button>
            </div>
          ))}

          <button
            onClick={clearAll}
            className="w-full py-3 text-cyan-400 hover:bg-slate-800 border-t border-slate-700"
          >
            Clear All
          </button>

        </div>
      )}
    </div>
  );
};

export default SearchBar;