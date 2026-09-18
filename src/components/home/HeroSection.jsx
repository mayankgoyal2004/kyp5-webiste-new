import React, { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  ArrowRight,
  Star,
  Play,
  CheckCircle2,
  Users,
  School,
  ShieldCheck,
  BarChart3,
  GraduationCap,
  Sparkles,
  X,
  UserCheck
} from "lucide-react";
import { useSite } from "../../context/SiteContext";

export default function HeroSection() {
  const { siteData } = useSite();
  const outletContext = useOutletContext();
  const openSampleReport = outletContext?.openSampleReport || (() => {});
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f8faff] via-white to-[#f5f3ff] pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-slate-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-br from-indigo-100/50 via-purple-100/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-100/40 via-indigo-50/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-slate-800 text-xs font-bold ring-1 ring-slate-200/90 shadow-xs">
              <span className="text-sm">🇮🇳</span>
              <span>India's Most Trusted Career Guidance Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-black text-slate-900 tracking-tight leading-[1.12]">
              Discover Your True Potential with{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Scientific Career Guidance
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              We provide the best tools for your success. Scientific psychometric mapping for stream selection, aptitude discovery, and career excellence.
            </p>

            {/* Action Buttons matching reference image */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <Link
                to="/for-schools"
                className="inline-flex items-center gap-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-indigo-600/25 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Enroll School</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/tests"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f97316] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-orange-500/25 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Take Individual Test</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="inline-flex items-center gap-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 px-4 py-2.5 rounded-2xl shadow-xs transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Play className="w-3.5 h-3.5 fill-indigo-600 ml-0.5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-extrabold text-slate-900 leading-tight">Watch Demo</div>
                  <div className="text-[10px] text-slate-400 font-medium">2 min</div>
                </div>
              </button>
            </div>

            {/* Trust feature checkmarks matching reference image */}
            <div className="space-y-2 pt-2">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Secure & Confidential</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Professional PDF Reports</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Holland RIASEC & MI Model</span>
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Trusted by 250+ Schools</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>AI-Powered Insights</span>
                </span>
              </div>
            </div>

            {/* Bottom Stats Card matching reference image */}
            <div className="mt-8 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 max-w-2xl">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-black text-slate-900 leading-tight">50,000+</div>
                    <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Students Assessed</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:pl-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <School className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-black text-slate-900 leading-tight">250+</div>
                    <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Partner Schools</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:pl-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-black text-slate-900 leading-tight">98.4%</div>
                    <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Student Satisfaction</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:pl-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-black text-slate-900 leading-tight">15+</div>
                    <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Years of Impact</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Visual Graphic matching reference image */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[460px] py-6 select-none">
            
            {/* Handwritten note top-right */}
            <div className="absolute -top-3 right-0 sm:right-4 z-30 text-right">
              <div className="font-['Caveat',_cursive] text-xl sm:text-2xl font-bold text-indigo-600 leading-none -rotate-12 tracking-wide drop-shadow-xs">
                Right Direction<br />
                <span className="text-purple-600 ml-3">Brighter Tomorrow</span>
              </div>
            </div>

            {/* Handwritten note & curved arrow bottom-right */}
            <div className="absolute bottom-0 -right-2 sm:right-2 z-30 flex items-start gap-1">
              <svg className="w-12 h-12 text-indigo-500 shrink-0 transform -rotate-12" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 38 42 C 30 36 20 28 15 15" />
                <path d="M 12 24 L 15 15 L 24 18" />
              </svg>
              <div className="font-['Caveat',_cursive] text-base sm:text-lg font-bold text-indigo-600 leading-tight -rotate-6 pt-1">
                Explore<br />
                <span className="text-slate-700">Assess</span><br />
                <span className="text-indigo-600">Grow</span><br />
                <span className="text-purple-600">Succeed</span>
              </div>
            </div>

            {/* Orbit / Constellation SVG paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 -z-0" viewBox="0 0 400 400" fill="none">
              <circle cx="200" cy="200" r="130" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="4 6" />
              <circle cx="200" cy="200" r="170" stroke="#c084fc" strokeWidth="1" strokeDasharray="3 5" />
              <circle cx="90" cy="110" r="3" fill="#6366f1" />
              <circle cx="320" cy="140" r="3" fill="#a855f7" />
              <circle cx="310" cy="300" r="3" fill="#3b82f6" />
              <circle cx="100" cy="280" r="3" fill="#10b981" />
            </svg>

            {/* Central Isometric Stack Composition */}
            <div className="relative z-10 w-64 sm:w-72 h-64 sm:h-72 flex items-center justify-center">
              
              {/* Bottom Glowing Shadow */}
              <div className="absolute bottom-2 w-48 h-20 bg-indigo-500/30 rounded-full blur-2xl transform rotate-[-30deg]" />

              {/* Layer 3: Purple Base Layer */}
              <div
                className="absolute w-44 h-44 rounded-3xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-2xl opacity-90 transition-transform"
                style={{
                  transform: "rotateX(60deg) rotateY(0deg) rotateZ(-45deg) translateZ(-40px)",
                  boxShadow: "0 20px 40px rgba(79, 70, 229, 0.45)"
                }}
              />

              {/* Layer 2: Cyan/Blue Middle Glow Layer */}
              <div
                className="absolute w-44 h-44 rounded-3xl bg-gradient-to-tr from-cyan-400 to-blue-600 shadow-xl opacity-95 transition-transform"
                style={{
                  transform: "rotateX(60deg) rotateY(0deg) rotateZ(-45deg) translateZ(-15px)",
                  boxShadow: "0 15px 30px rgba(6, 182, 212, 0.4)"
                }}
              />

              {/* Layer 1: White Isometric Plate with KYP5 Logo */}
              <div
                className="absolute w-44 h-44 rounded-3xl bg-white/98 border border-white/80 shadow-2xl flex flex-col items-center justify-center p-4 transition-transform hover:scale-105 duration-300"
                style={{
                  transform: "rotateX(60deg) rotateY(0deg) rotateZ(-45deg) translateZ(15px)",
                  boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.8) inset"
                }}
              >
                <div className="transform rotateZ(45deg) rotateX(-30deg) flex flex-col items-center justify-center">
                  <img
                    src="/assets/images/logo/kyp5.png"
                    alt="KYP5 Logo"
                    className="w-20 h-auto object-contain drop-shadow-md"
                    onError={(e) => {
                      e.target.src = "/assets/images/logo/main-logo.png";
                    }}
                  />
                  <span className="text-[13px] font-black text-indigo-700 tracking-wider mt-1">
                    KYP5
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Badge 1: Top-Left (4.9 Rating) */}
            <div className="absolute top-2 -left-2 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-3 z-20 animate-pulse-soft">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900 flex items-center gap-1 leading-tight">
                  <span>4.9 Rating</span>
                  <span className="text-[10px] text-slate-400 font-medium">(25K+ Tests)</span>
                </div>
                <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                  Trusted by Parents & Counselors
                </div>
              </div>
            </div>

            {/* Floating Badge 2: Mid-Left (AI-Powered Analysis) */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-3 z-20">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900 leading-tight">
                  AI-Powered Analysis
                </div>
                <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
                  Discover Your Strengths
                </div>
              </div>
            </div>

            {/* Floating Badge 3: Mid-Right (Multiple Intelligence Battery) */}
            <div className="absolute top-1/3 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-3 z-20">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900 leading-tight">
                  Multiple Intelligence Battery
                </div>
                <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
                  Instant Stream & Career Mapping
                </div>
              </div>
            </div>

            {/* Floating Badge 4: Bottom-Center (Personalized Career Roadmap) */}
            <div className="absolute -bottom-2 left-6 sm:left-10 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-3 z-20">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900 leading-tight">
                  Personalized Career Roadmap
                </div>
                <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
                  For a Brighter Future
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Demo Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
            <div className="flex items-center justify-between p-4 border-b border-slate-800 text-white">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 fill-indigo-400 text-indigo-400" />
                <h3 className="text-sm font-bold">KYP5 Platform Walkthrough (2 min)</h3>
              </div>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="KYP5 Platform Walkthrough"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
