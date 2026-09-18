import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  FileText,
  Download,
  CheckCircle,
  Compass,
  BarChart3,
  Award,
  Sparkles,
  ArrowRight
} from "lucide-react";
import SectionHeading from "../common/SectionHeading";

export default function SampleReportPreview() {
  const outletContext = useOutletContext();
  const openSampleReport = outletContext?.openSampleReport || (() => {});

  const highlights = [
    "Holland RIASEC Vocational Code with percentage fit",
    "Howard Gardner 8 Multiple Intelligences profiling",
    "Stream Recommendation (Science PCM/PCB, Commerce, Humanities)",
    "Top 5 Compatible Career Clusters & 25+ Specific Occupations",
    "Cognitive Aptitude breakdown across verbal, numerical & logical domains",
    "Detailed 4-Year Academic & Skill Building Action Roadmap",
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="container-page">
        <SectionHeading
          badge="Certified Output"
          title="Inside Your Comprehensive 15-Page PDF Report"
          subtitle="Every assessment generates an exhaustive, psychologist-validated career dossier that parents, students, and counselors can act upon immediately."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Mockup */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 p-6 sm:p-8 shadow-2xl text-white overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold uppercase tracking-wide text-indigo-300">
                      Standard Dossier
                    </div>
                    <div className="text-sm font-bold text-white">
                      Psychometric Guidance Report
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  Verified
                </span>
              </div>

              {/* Sample Radar / Trait Preview Cards */}
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="flex items-center gap-1.5 text-indigo-200">
                      <Compass className="w-4 h-4 text-indigo-400" /> RIASEC Trait Distribution
                    </span>
                    <span className="text-emerald-400">Investigative (88%)</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-indigo-500 to-indigo-300 h-2 rounded-full w-[88%]" />
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="flex items-center gap-1.5 text-amber-200">
                      <BarChart3 className="w-4 h-4 text-amber-400" /> Stream Suitability Index
                    </span>
                    <span className="text-amber-400">Science PCM (94%)</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-2 rounded-full w-[94%]" />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span>15 High-Resolution Color Pages</span>
                <span className="text-indigo-300 font-bold">Includes QR Validation</span>
              </div>
            </div>
          </div>

          {/* Right Column: Highlights & Download CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Comprehensive Data-Driven Insights</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              Actionable Intelligence for Parents, Students & Counselors
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              Our standardized scoring engine eliminates emotional bias and presents scientific evidence for academic stream selection, competitive exam choices, and long-term career growth.
            </p>

            <ul className="space-y-3 pt-2">
              {highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mt-0.5">
                    <CheckCircle className="h-3.5 w-3.5" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={openSampleReport}
                className="btn-primary"
              >
                <Download className="w-4 h-4" />
                <span>View Sample Report</span>
              </button>

              <Link
                to="/for-schools"
                className="btn-outline"
              >
                <span>For Schools Pricing</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
