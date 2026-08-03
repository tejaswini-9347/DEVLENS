import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      toast.success(res.data.message);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-900 rounded-xl p-8 border border-slate-700">

        <h1 className="text-3xl font-bold text-white mb-2">
          Forgot Password
        </h1>

        <p className="text-slate-400 mb-6">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg text-white font-semibold"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-cyan-400 hover:underline"
          >
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}