import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center bg-white px-4 py-12">
      <div className="max-w-[600px] w-full text-center flex flex-col items-center">
        
        {/* Large 404 Styled Text */}
        <div className="relative">
          <h1 className="font-integral text-8xl sm:text-9xl font-black text-black tracking-widest select-none">
            404
          </h1>
          <div className="absolute -bottom-2 w-full text-center">
            <span className="bg-black text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              Page Not Found
            </span>
          </div>
        </div>

        {/* Message */}
        <h2 className="mt-8 text-2xl sm:text-3xl font-extrabold text-black uppercase font-integral">
          Looks Like You're Lost
        </h2>
        <p className="mt-3 text-sm sm:text-base text-black/60 max-w-[440px] leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Go Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-3.5 border border-black/15 rounded-full text-sm font-medium text-black hover:bg-black/5 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          {/* Go to Home Page Button */}
          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-black text-white rounded-full text-sm font-medium hover:bg-black/80 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}

export default NotFound;