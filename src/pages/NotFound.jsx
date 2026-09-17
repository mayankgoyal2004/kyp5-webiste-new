import React from "react";
import { Link } from "react-router-dom";
import { Compass, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center space-y-6">
      <div className="max-w-md space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="text-5xl font-black text-[#0f172a]">404</h1>
        <h2 className="text-xl font-extrabold text-slate-800">Page Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          The page you are looking for may have moved or is temporarily unavailable.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#0288d1] hover:bg-[#0277bd] text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md transition-colors"
          >
            <span>Return to Homepage</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
