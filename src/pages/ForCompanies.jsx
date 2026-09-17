import React from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Users2,
  Brain,
  CheckCircle2,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";

export default function ForCompanies() {
  return (
    <div className="py-12 sm:py-16 space-y-16">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0b3b60] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Briefcase className="w-4 h-4" />
              <span>Corporate & HR Assessment Suite</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Precision Psychometrics for Modern{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
                Talent Hiring & Benchmarking
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Evaluate behavioral traits, cognitive dexterity, stress resilience, and cultural compatibility before you make costly hiring decisions.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-2xl shadow-lg transition-all text-sm"
              >
                <span>Request Corporate Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3.5 rounded-2xl border border-white/20 text-sm"
              >
                <span>Corporate Plans</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Enterprise Solutions"
          title="Psychometric Tools Built for HR Teams"
          subtitle="Shortlist candidates with quantitative confidence and reduce 90-day employee attrition."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Cognitive & Aptitude Filters</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Measure numerical reasoning, logical problem-solving, and verbal comprehension standardized against industry benchmarks.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Big-5 Workplace Profiler</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Identify natural leadership qualities, grit, emotional stability, and team collaboration styles to ensure seamless culture fit.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Anti-Cheat Proctoring</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Automated tab switch detection, randomized item order, and candidate verification to guarantee test integrity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
