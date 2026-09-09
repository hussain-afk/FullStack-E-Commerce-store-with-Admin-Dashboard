import React, { useState } from 'react'
import useAuth from '../hooks/useAuth.jsx';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';
import toast from 'react-hot-toast';

function AuthForm() {

  const [authMode, setAuthMode] = useState('login') // 'login' ya 'register'
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { handleRegister, handleLogin } = useAuth();
  const { loading } = useContext(StoreContext);


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (authMode === 'register') {
        await handleRegister(username, email, password);
      }

      if (authMode === 'login') {
        await handleLogin(username, password);
      }

    } catch (error) {

      console.error('user is not registered or logged in');

      toast.error('Failed to authenticate user');

    }

  }

  if (loading) {

    return (

        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans text-white">

            {/* Main Loading Card */}
            <div className="w-full max-w-[720px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d0d] shadow-[0_25px_80px_rgba(0,0,0,0.5)]">

                <div className="grid md:grid-cols-[0.8fr_1.2fr] min-h-[420px]">


                    {/* =================================
                        LEFT PANEL
                    ================================= */}

                    <div className="hidden md:flex flex-col justify-between bg-[#080808] border-r border-white/[0.07] p-8">

                        {/* Logo */}
                        <div className="flex items-center gap-3">

                            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">

                                <div className="w-4 h-4 rounded-[4px] bg-black" />

                            </div>

                            <span className="text-sm font-semibold tracking-tight">
                                AuthPanel
                            </span>

                        </div>


                        {/* Loading Message */}
                        <div>

                            <div className="flex items-center gap-2 mb-4">

                                <span className="relative flex h-2 w-2">

                                    <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-50 animate-ping" />

                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />

                                </span>

                                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                                    Please wait
                                </span>

                            </div>


                            <h1 className="text-3xl font-semibold tracking-[-0.03em] leading-tight">
                                Preparing your
                                <br />
                                session.
                            </h1>


                            <p className="mt-4 max-w-[230px] text-xs leading-5 text-neutral-600">
                                We're securely checking your authentication status. This will only take a moment.
                            </p>

                        </div>


                        {/* Secure Connection */}
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-neutral-600">

                            <span className="relative flex h-1.5 w-1.5">

                                <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-40 animate-ping" />

                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />

                            </span>

                            Secure connection

                        </div>

                    </div>


                    {/* =================================
                        RIGHT LOADING AREA
                    ================================= */}

                    <div className="p-7 sm:p-9 flex flex-col justify-center items-center">


                        {/* Loader */}
                        <div className="relative flex items-center justify-center mb-7">

                            {/* Outer Ring */}
                            <div className="absolute w-[72px] h-[72px] rounded-full border border-white/[0.05]" />


                            {/* Spinning Ring */}
                            <div className="w-12 h-12 rounded-full border-[3px] border-neutral-800 border-t-white animate-spin" />


                            {/* Center Dot */}
                            <div className="absolute w-2 h-2 rounded-full bg-white" />

                        </div>


                        {/* Loading Text */}
                        <div className="text-center">

                            <h2 className="text-xl font-semibold tracking-tight text-white">

                                Loading

                                <span className="inline-flex ml-1">

                                    <span className="animate-[loadingDot_1.4s_infinite]">
                                        .
                                    </span>

                                    <span className="animate-[loadingDot_1.4s_0.2s_infinite]">
                                        .
                                    </span>

                                    <span className="animate-[loadingDot_1.4s_0.4s_infinite]">
                                        .
                                    </span>

                                </span>

                            </h2>


                            <p className="text-xs text-neutral-600 mt-2">
                                Checking your authentication status
                            </p>

                        </div>


                        {/* Status Badge */}
                        <div className="mt-7 flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.025] border border-white/[0.06]">

                            <span className="relative flex h-1.5 w-1.5">

                                <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-40 animate-ping" />

                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />

                            </span>

                            <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-500">
                                Authenticating
                            </span>

                        </div>


                        {/* Progress Line */}
                        <div className="w-40 h-px bg-neutral-900 mt-7 overflow-hidden">

                            <div className="h-full w-1/2 bg-white animate-[progress_1.5s_ease-in-out_infinite]" />

                        </div>

                    </div>

                </div>

            </div>


            {/* Animations */}
            <style>
                {`

                    @keyframes loadingDot {

                        0%,
                        20% {
                            opacity: 0;
                        }

                        50% {
                            opacity: 1;
                        }

                        80%,
                        100% {
                            opacity: 0;
                        }

                    }


                    @keyframes progress {

                        0% {
                            transform: translateX(-100%);
                        }

                        50% {
                            transform: translateX(100%);
                        }

                        100% {
                            transform: translateX(250%);
                        }

                    }

                `}
            </style>

        </div>

    );

}


  return (

    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans text-white">

      {/* Main Card */}
      <div className="w-full max-w-[720px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d0d] shadow-[0_25px_80px_rgba(0,0,0,0.5)]">

        <div className="grid md:grid-cols-[0.8fr_1.2fr] min-h-[420px]">


          {/* =========================================
                        LEFT BRANDING PANEL
                    ========================================== */}

          <div className="hidden md:flex flex-col justify-between bg-[#080808] border-r border-white/[0.07] p-8">


            {/* Logo */}
            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">

                <div className="w-4 h-4 rounded-[4px] bg-black" />

              </div>

              <span className="text-sm font-semibold tracking-tight">
                AuthPanel
              </span>

            </div>


            {/* Branding Content */}
            <div>

              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-600 mb-4">
                Authentication
              </p>

              <h1 className="text-3xl font-semibold tracking-[-0.03em] leading-tight text-white">
                Welcome to a
                <br />
                better experience.
              </h1>

              <p className="mt-4 max-w-[230px] text-xs leading-5 text-neutral-500">
                Securely access your account with a simple, fast and reliable authentication experience.
              </p>

            </div>


            {/* Security */}
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-neutral-600">

              <span className="h-1.5 w-1.5 rounded-full bg-white" />

              Secure connection

            </div>

          </div>


          {/* =========================================
                        RIGHT AUTH FORM
                    ========================================== */}

          <div className="flex flex-col justify-center p-7 sm:p-9">


            {/* Header */}
            <div className="flex items-start justify-between mb-8">

              <div>

                <p className="text-xs text-neutral-500 mb-1">
                  {authMode === 'login'
                    ? 'Welcome back'
                    : 'Get started'}
                </p>

                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  {authMode === 'login'
                    ? 'Sign in'
                    : 'Create account'}
                </h2>

              </div>


              {/* Switch Button */}
              <button
                type="button"
                onClick={() =>
                  setAuthMode(
                    authMode === 'login'
                      ? 'register'
                      : 'login'
                  )
                }
                className="text-xs font-medium text-neutral-500 hover:text-white transition-colors duration-200"
              >

                {authMode === 'login'
                  ? 'Create account'
                  : 'Sign in'}

              </button>

            </div>


            {/* Form */}
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="space-y-4"
            >


              {/* Username */}
              <div>

                <label className="block text-xs font-medium text-neutral-300 mb-2">
                  Username
                </label>

                <input
                  type="text"
                  placeholder="Enter your username"
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  className="
                                        w-full
                                        h-11
                                        rounded-lg
                                        border border-white/[0.09]
                                        bg-[#080808]
                                        px-3.5
                                        text-sm
                                        text-white
                                        placeholder:text-neutral-700
                                        outline-none
                                        transition-all
                                        duration-200
                                        hover:border-white/[0.16]
                                        focus:border-white/40
                                        focus:ring-2
                                        focus:ring-white/[0.04]
                                    "
                />

              </div>


              {/* Email */}
              {
                authMode === 'register' && (

                  <div>

                    <label className="block text-xs font-medium text-neutral-300 mb-2">
                      Email address
                    </label>

                    <input
                      type="email"
                      placeholder="you@example.com"
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      className="
                                                w-full
                                                h-11
                                                rounded-lg
                                                border border-white/[0.09]
                                                bg-[#080808]
                                                px-3.5
                                                text-sm
                                                text-white
                                                placeholder:text-neutral-700
                                                outline-none
                                                transition-all
                                                duration-200
                                                hover:border-white/[0.16]
                                                focus:border-white/40
                                                focus:ring-2
                                                focus:ring-white/[0.04]
                                            "
                    />

                  </div>

                )
              }


              {/* Password */}
              <div>

                <div className="flex items-center justify-between mb-2">

                  <label className="text-xs font-medium text-neutral-300">
                    Password
                  </label>

                  {
                    authMode === 'login' && (

                      <button
                        type="button"
                        className="text-[11px] text-neutral-600 hover:text-white transition-colors"
                      >
                        Forgot password?
                      </button>

                    )
                  }

                </div>

                <input
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="
                                        w-full
                                        h-11
                                        rounded-lg
                                        border border-white/[0.09]
                                        bg-[#080808]
                                        px-3.5
                                        text-sm
                                        text-white
                                        placeholder:text-neutral-700
                                        outline-none
                                        transition-all
                                        duration-200
                                        hover:border-white/[0.16]
                                        focus:border-white/40
                                        focus:ring-2
                                        focus:ring-white/[0.04]
                                    "
                />

              </div>


              {/* Submit Button */}
              <button
                type="submit"
                className="
                                    w-full
                                    h-11
                                    mt-2
                                    rounded-lg
                                    bg-white
                                    text-black
                                    text-sm
                                    font-semibold
                                    tracking-tight
                                    transition-all
                                    duration-200
                                    hover:bg-neutral-200
                                    active:scale-[0.99]
                                "
              >

                {authMode === 'login'
                  ? 'Sign in'
                  : 'Create account'}

              </button>

            </form>


            {/* Divider */}
            <div className="flex items-center gap-3 mt-7">

              <div className="h-px flex-1 bg-white/[0.07]" />

              <span className="text-[9px] uppercase tracking-[0.16em] text-neutral-700">
                Secure access
              </span>

              <div className="h-px flex-1 bg-white/[0.07]" />

            </div>


            {/* Footer */}
            <p className="text-center text-[10px] leading-5 text-neutral-700 mt-5">
              Your information is securely protected.
            </p>

          </div>

        </div>

      </div>

    </div>

  )
}

export default AuthForm
