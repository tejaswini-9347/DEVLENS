const Loading = () => {
  return (
    <div className="mt-10 animate-pulse">

      {/* Profile Skeleton */}
      <div className="bg-slate-900 rounded-2xl p-6 mb-8">
        <div className="flex gap-6 items-center">
          <div className="w-28 h-28 rounded-full bg-slate-700"></div>

          <div className="flex-1">
            <div className="h-8 bg-slate-700 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-slate-700 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-slate-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      {/* Analytics Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-28 bg-slate-800 rounded-xl"
          ></div>
        ))}
      </div>

      {/* Repository Skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-slate-900 rounded-xl p-6"
          >
            <div className="h-6 bg-slate-700 rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-slate-700 rounded mb-2"></div>
            <div className="h-4 bg-slate-700 rounded w-5/6"></div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Loading;