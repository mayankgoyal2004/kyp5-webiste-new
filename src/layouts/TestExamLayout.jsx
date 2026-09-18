import React from "react";
import { Outlet, Link } from "react-router-dom";
import { ShieldCheck, Lock } from "lucide-react";

export default function TestExamLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col select-none">
      {/* Distraction-Free Header */}
      <header className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/images/logo/main-logo.png"
            alt="KYP5 Logo"
            className="h-8 w-auto object-contain"
            onError={(e) => {
              e.target.src = "/assets/images/logo/kyp5.png";
            }}
          />
          <span className="hidden sm:inline font-extrabold text-xs text-slate-800 tracking-tight uppercase border-l border-slate-200 pl-3">
            KYP5 Examination Portal
          </span>
        </Link>

        <div className="flex items-center gap-3 text-xs">
          <div className="hidden sm:flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 font-bold">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Secure Exam Environment</span>
          </div>
          <div className="flex items-center gap-1.5 text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full font-bold">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>Auto-Save Active</span>
          </div>
        </div>
      </header>

      {/* Main Exam Body */}
      <main className="flex-1 flex flex-col p-4 sm:p-8 max-w-7xl w-full mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
