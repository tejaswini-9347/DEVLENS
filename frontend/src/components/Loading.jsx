export default function Loading() {
  return (
    <div className="animate-pulse w-full max-w-7xl mx-auto p-8">

      {/* Profile Skeleton */}
      <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">

        <div className="flex items-center gap-8">

          <div className="w-40 h-40 rounded-full bg-slate-800"></div>

          <div className="flex-1">

            <div className="h-8 w-72 bg-slate-800 rounded mb-5"></div>

            <div className="h-5 w-44 bg-slate-800 rounded mb-6"></div>

            <div className="h-4 w-full bg-slate-800 rounded mb-3"></div>

            <div className="h-4 w-5/6 bg-slate-800 rounded mb-3"></div>

            <div className="h-4 w-2/3 bg-slate-800 rounded"></div>

          </div>

        </div>

      </div>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-36 rounded-2xl bg-slate-900 border border-slate-800"
          />
        ))}

      </div>

      {/* Two Large Sections */}

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        <div className="h-96 rounded-2xl bg-slate-900 border border-slate-800"></div>

        <div className="h-96 rounded-2xl bg-slate-900 border border-slate-800"></div>

      </div>

      {/* Repository Skeleton */}

      <div className="mt-8 rounded-2xl bg-slate-900 border border-slate-800 p-6">

        {[1,2,3,4,5].map((i)=>(
          <div
            key={i}
            className="h-14 rounded-lg bg-slate-800 mb-4"
          />
        ))}

      </div>

    </div>
  );
}