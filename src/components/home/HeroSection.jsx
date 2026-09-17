import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Sparkles, BookOpen, GraduationCap, Award } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-sky-50/40 via-white to-white">
      {/* Light decorative background elements */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Top pill tag */}
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1b93ad]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start your journey with us today</span>
            </div>

            {/* Main Headline with gold brush underline on Platform */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-[#1e2348] tracking-tight leading-tight">
              Welcome to our{" "}
              <span className="relative inline-block text-[#1e2348]">
                Platform
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#fbb034] -z-10"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 10 Q 50 20 100 10"
                    stroke="#fbb034"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
              We provide the best tools for your success. Scientific psychometric mapping for stream selection, aptitude discovery, and career excellence.
            </p>

            {/* Get Started CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/tests"
                className="inline-flex items-center gap-2 bg-[#2995ac] hover:bg-[#207f94] text-white font-bold px-7 py-3.5 rounded-xl shadow-md shadow-cyan-600/20 hover:shadow-lg transition-all text-sm"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* 2K+ Students Badge */}
              <div className="flex items-center gap-3 pl-2">
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="/assets/images/instructor/instructor-01.jpg"
                    alt="Student 1"
                    onError={(e) => {
                      e.target.src = "/assets/images/auser.jpg";
                    }}
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="/assets/images/instructor/instructor-02.jpg"
                    alt="Student 2"
                    onError={(e) => {
                      e.target.src = "/assets/images/auser.jpg";
                    }}
                  />
                  <div className="h-8 w-8 rounded-full bg-[#8c52ff] text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-white">
                    +
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-slate-900">2K+ Students</div>
                  <div className="text-[10px] text-slate-500">Joined our online learning community</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Visual Matching Screenshot Image 1 */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div className="relative w-full max-w-lg">
              {/* Hero Image */}
              <img
                src="/assets/hero.png"
                alt="KYP5 Students"
                className="w-full h-auto object-contain z-10 relative drop-shadow-md"
                onError={(e) => {
                  e.target.src = "/assets/images/banner/banner-01.png";
                }}
              />

              {/* Rating Card Floating Left */}
              <div className="absolute top-1/3 -left-4 sm:left-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#2995ac]/10 text-[#2995ac] flex items-center justify-center font-bold">
                  <Award className="w-5 h-5 text-[#2995ac]" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-extrabold text-slate-900">4.5</div>
                  <div className="text-[10px] text-slate-500 font-medium">(2.4K Reviews)</div>
                </div>
              </div>

              {/* Online Courses Card Floating Right */}
              <div className="absolute bottom-6 right-2 sm:right-6 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#2995ac]/10 text-[#2995ac] flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5 text-[#2995ac]" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-extrabold text-slate-900">100+</div>
                  <div className="text-[10px] text-slate-500 font-medium">Online Courses & Tests</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
