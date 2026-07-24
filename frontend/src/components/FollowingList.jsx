const FollowingList = ({ following }) => {
  return (
    <div className="mt-12">

      <h2 className="text-3xl font-bold text-center mb-8">
        🤝 Following ({following.length})
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

        {following.map((user) => (
          <div
            key={user.login}
            className="bg-slate-900 border border-slate-700 rounded-2xl p-5 text-center hover:shadow-lg hover:shadow-cyan-500/20 transition duration-300"
          >
            <img
              src={user.avatarUrl}
              alt={user.login}
              className="w-20 h-20 rounded-full mx-auto border-2 border-green-400"
            />

            <h3 className="mt-4 font-semibold">
              {user.login}
            </h3>

            <a
              href={user.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm transition"
            >
              View Profile
            </a>

          </div>
        ))}

      </div>

    </div>
  );
};

export default FollowingList;