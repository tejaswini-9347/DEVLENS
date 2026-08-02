import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
      <h1 className="text-8xl font-bold text-cyan-400">404</h1>

      <p className="text-2xl mt-4">
        Page Not Found
      </p>

      <p className="text-slate-400 mt-2">
        The page you are looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-8 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold"
      >
        Back to Home
      </Link>
    </div>
  );
}