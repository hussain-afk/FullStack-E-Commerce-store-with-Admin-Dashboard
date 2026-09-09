import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import useAuth from "../../hooks/useAuth";

function AuthForm() {
  const { loading } = useContext(StoreContext);
  const { handleAdminLogin } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleAdminLogin(username, password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center">
          <div className="mx-auto mb-5 h-10 w-10 rounded-full border-4 border-gray-200 border-t-black animate-spin" />

          <h2 className="text-lg font-semibold text-gray-900">
            Signing you in
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Please wait a moment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center px-4 py-8">

      {/* Main Card */}
      <div className="w-full max-w-md">

        <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">

          {/* Header */}
          <div className="px-7 pt-7 pb-6 border-b border-gray-100">

            <div className="flex items-center gap-3">

              {/* Logo */}
              <div className="w-11 h-11 rounded-xl bg-black flex items-center justify-center shadow-sm">
                <div className="w-4 h-4 bg-white rounded-md" />
              </div>

              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  Admin Panel
                </h1>

                <p className="text-xs text-gray-500 mt-0.5">
                  Ecommerce Management
                </p>
              </div>

            </div>

            <div className="mt-7">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Welcome back
              </h2>

              <p className="mt-1.5 text-sm text-gray-500">
                Sign in to access your dashboard.
              </p>
            </div>

          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-7">

            {/* Username */}
            <div className="mb-5">

              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                value={username}
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="
                  w-full
                  h-11
                  px-4
                  rounded-xl
                  border border-gray-200
                  bg-gray-50
                  text-sm text-gray-900
                  placeholder:text-gray-400
                  outline-none
                  transition-all
                  focus:bg-white
                  focus:border-black
                  focus:ring-2
                  focus:ring-black/5
                "
              />

            </div>

            {/* Password */}
            <div className="mb-6">

              <div className="flex items-center justify-between mb-2">

                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-medium text-gray-500 hover:text-black transition-colors"
                >
                  Forgot password?
                </button>

              </div>

              <input
                id="password"
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="
                  w-full
                  h-11
                  px-4
                  rounded-xl
                  border border-gray-200
                  bg-gray-50
                  text-sm text-gray-900
                  placeholder:text-gray-400
                  outline-none
                  transition-all
                  focus:bg-white
                  focus:border-black
                  focus:ring-2
                  focus:ring-black/5
                "
              />

            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-11
                rounded-xl
                bg-black
                text-white
                text-sm
                font-semibold
                tracking-wide
                transition-all
                duration-200
                hover:bg-gray-800
                active:scale-[0.98]
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              Login
            </button>

          </form>

          {/* Footer */}
          <div className="px-7 py-4 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              Authorized administrators only
            </p>
          </div>

        </div>

        {/* Bottom Text */}
        <p className="text-center text-xs text-gray-400 mt-5">
          © 2026 Admin Dashboard
        </p>

      </div>
    </div>
  );
}

export default AuthForm;