import { FaSignOutAlt, FaTimes } from "react-icons/fa";

export default function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-md mx-4 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">

        {/* Header */}

        <div className="bg-gradient-to-r from-red-500 to-red-700 p-6 text-center">

          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">

            <FaSignOutAlt className="text-3xl text-white" />

          </div>

          <h2 className="text-3xl font-bold text-white">
            Logout
          </h2>

        </div>

        {/* Body */}

        <div className="p-8 text-center">

          <p className="text-slate-300 text-lg leading-8">

            Are you sure you want to logout from your
            <span className="text-cyan-400 font-semibold">
              {" "} CodeVista{" "}
            </span>
            account?

          </p>

          <p className="text-slate-500 mt-4">

            You will need to login again to continue.

          </p>

          <div className="flex gap-4 mt-8">

            <button
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 transition py-3 rounded-xl font-semibold"
            >

              <FaTimes />

              Cancel

            </button>

            <button
              onClick={onConfirm}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition py-3 rounded-xl font-semibold"
            >

              <FaSignOutAlt />

              Logout

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}