import React, { useState } from "react";
import {
  FileText,
  Download,
  CheckCircle,
  PieChart,
  BarChart2,
  Compass,
  Award,
  Sparkles
} from "lucide-react";
import SectionHeading from "../common/SectionHeading";

export default function SampleReportPreview() {
  const [activeTab, setActiveTab] = useState("RIASEC");

  const reportTabs = [
    { id: "RIASEC", label: "Holland Career Profile", icon: Compass },
    { id: "APTITUDE", label: "Aptitude Analysis", icon: BarChart2 },
    { id: "STREAM", label: "Stream & Subject Fit", icon: PieChart },
    { id: "ACTION", label: "Career Action Plan", icon: Award },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Interactive Preview"
          title="What Does Your KYP5 Report Look Like?"
          subtitle="Every test yields an exhaustive, 15+ page certified PDF report packed with actionable visual analytics, stream matches, and personalized career roadmaps."
        />

        {/* Report Preview Frame */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 text-white">
          {/* Preview Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex flex-wrap gap-2">
              {reportTabs.map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-cyan-500 text-slate-950 shadow-md"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <a
              href="/assets/images/common-kyp5.jpg"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Sample PDF</span>
            </a>
          </div>

          {/* Dynamic Interactive Tab Content */}
          <div className="py-8">
            {activeTab === "RIASEC" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    Primary Profile Result:
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">
                    Investigative - Enterprising - Realistic (IER)
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Student exhibits high analytical rigor paired with persuasive communication and hands-on technological problem solving.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-cyan-300">Investigative (Scientific & Research)</span>
                        <span className="text-white font-bold">92%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-cyan-400 h-full rounded-full w-[92%]" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-amber-300">Enterprising (Leadership & Business)</span>
                        <span className="text-white font-bold">84%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full rounded-full w-[84%]" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-emerald-300">Realistic (Technology & Engineering)</span>
                        <span className="text-white font-bold">78%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full rounded-full w-[78%]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-slate-800/80 rounded-2xl p-6 border border-slate-700 space-y-4">
                  <h4 className="font-extrabold text-sm text-cyan-300 uppercase tracking-wider">
                    Top 3 Matching Career Clusters
                  </h4>
                  <ul className="space-y-3 text-xs">
                    <li className="flex items-start gap-2.5 bg-slate-900/80 p-3 rounded-xl border border-slate-700">
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-white">AI, Data Science & Software Systems</div>
                        <div className="text-slate-400 text-[11px]">96% Congruence Fit</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5 bg-slate-900/80 p-3 rounded-xl border border-slate-700">
                      <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-white">Biomedical Engineering & Research</div>
                        <div className="text-slate-400 text-[11px]">89% Congruence Fit</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5 bg-slate-900/80 p-3 rounded-xl border border-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-white">Product Management & Tech Entrepreneurship</div>
                        <div className="text-slate-400 text-[11px]">85% Congruence Fit</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "APTITUDE" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-300">
                <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                  <div className="text-xs text-slate-400 font-bold uppercase">Numerical & Data Reasoning</div>
                  <div className="text-2xl font-black text-cyan-400 mt-1">94th Percentile</div>
                  <p className="text-xs text-slate-300 mt-2">
                    Exceptional mental agility in pattern recognition, quantitative reasoning, and data interpretation.
                  </p>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                  <div className="text-xs text-slate-400 font-bold uppercase">Spatial & Abstract Logic</div>
                  <div className="text-2xl font-black text-amber-400 mt-1">88th Percentile</div>
                  <p className="text-xs text-slate-300 mt-2">
                    Strong visualization skills ideal for architecture, design engineering, and complex logic flow.
                  </p>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                  <div className="text-xs text-slate-400 font-bold uppercase">Verbal & Critical Thinking</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1">82nd Percentile</div>
                  <p className="text-xs text-slate-300 mt-2">
                    Proficient vocabulary comprehension and argument structural analysis.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "STREAM" && (
              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4 animate-in fade-in duration-300">
                <h4 className="text-lg font-bold text-white">
                  Stream Recommendation Index (Class 10 Transition)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-cyan-950/60 p-4 rounded-xl border border-cyan-500/30">
                    <span className="text-xs font-bold text-cyan-400">1st Priority Match</span>
                    <div className="text-lg font-black text-white mt-1">Science (PCM + CS)</div>
                    <div className="text-xs text-cyan-200 mt-1">94% Compatibility</div>
                  </div>
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700">
                    <span className="text-xs font-bold text-slate-400">2nd Priority Match</span>
                    <div className="text-lg font-black text-white mt-1">Commerce with Math</div>
                    <div className="text-xs text-slate-400 mt-1">81% Compatibility</div>
                  </div>
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700">
                    <span className="text-xs font-bold text-slate-400">3rd Priority Match</span>
                    <div className="text-lg font-black text-white mt-1">Humanities with Economics</div>
                    <div className="text-xs text-slate-400 mt-1">74% Compatibility</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "ACTION" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h4 className="text-lg font-bold text-white">4-Stage Career Milestone Roadmap</h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div className="text-xs font-black text-cyan-400">Stage 01</div>
                    <div className="text-sm font-bold text-white mt-1">Subject Mastery</div>
                    <p className="text-[11px] text-slate-400 mt-1">Core focus on Physics, Mathematics and Python basics.</p>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div className="text-xs font-black text-cyan-400">Stage 02</div>
                    <div className="text-sm font-bold text-white mt-1">Competitive Prep</div>
                    <p className="text-[11px] text-slate-400 mt-1">Target JEE / BITSAT / Top tier entrance curricula.</p>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div className="text-xs font-black text-cyan-400">Stage 03</div>
                    <div className="text-sm font-bold text-white mt-1">Project Portfolio</div>
                    <p className="text-[11px] text-slate-400 mt-1">Build real-world prototypes and hackathon submissions.</p>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div className="text-xs font-black text-cyan-400">Stage 04</div>
                    <div className="text-sm font-bold text-white mt-1">Career Launch</div>
                    <p className="text-[11px] text-slate-400 mt-1">Industry internships & specialized graduate tracks.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
