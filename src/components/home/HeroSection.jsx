import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Sparkles, BookOpen, GraduationCap, Award } from "lucide-react";
import { useSite } from "../../context/SiteContext";
import { resolveImageUrl } from "../../utils/dataHelper";

export default function HeroSection() {
  const { siteData } = useSite();

  const title = siteData?.hero?.title || "Welcome to our Platform";
  const subtitle =
    siteData?.hero?.subtitle ||
    siteData?.hero?.description ||
    "We provide the best tools for your success. Scientific psychometric mapping for stream selection, aptitude discovery, and career excellence.";

  const ctaText = siteData?.hero?.ctaText || "Get Started";
  const ctaLink = siteData?.hero?.ctaLink || "/tests";
  const heroImgSrc = resolveImageUrl(siteData?.hero?.image, "/assets/hero.png");

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-sky-50/40 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Top pill tag */}
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1b93ad]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start your journey with us today</span>
            </div>

            {/* Main Headline with gold brush underline on Platform / last word */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-[#1e2348] tracking-tight leading-tight">
              {title.includes("Platform") ? (
                <>
                  {title.replace("Platform", "")}
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
                </>
              ) : (
                title
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
              {subtitle}
            </p>

            {/* Get Started CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to={ctaLink}
                className="inline-flex items-center gap-2 bg-[#2995ac] hover:bg-[#207f94] text-white font-bold px-7 py-3.5 rounded-xl shadow-md shadow-cyan-600/20 hover:shadow-lg transition-all text-sm"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Student Community Stats Row */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-center lg:justify-start gap-3">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="/assets/images/banner/user-01.png"
                  alt="Student 1"
                  onError={(e) => {
                    e.target.src = "/assets/images/auser.jpg";
                  }}
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="/assets/images/banner/user-02.png"
                  alt="Student 2"
                  onError={(e) => {
                    e.target.src = "/assets/images/auser.jpg";
                  }}
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="/assets/images/banner/user-03.png"
                  alt="Student 3"
                  onError={(e) => {
                    e.target.src = "/assets/images/auser.jpg";
                  }}
                />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-800">2K+ Students</div>
                <div className="text-[11px] text-slate-400">
                  joined our online guidance community
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic with Floating Badges */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              {/* Main Student Image */}
              <div className="relative z-10 flex justify-center">
                <img
                  src={heroImgSrc}
                  alt="KYP5 Career Student"
                  className="w-auto max-h-[440px] sm:max-h-[480px] object-contain drop-shadow-2xl animate-float"
                  onError={(e) => {
                    e.target.src = "/assets/hero.png";
                  }}
                />
              </div>

              {/* Floating Badge 1: 4.5 Rating */}
              <div className="absolute top-12 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3 z-20 animate-pulse-soft">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1">
                    <span>4.5 Rating</span>
                    <span className="text-[10px] text-slate-400 font-medium">(2.4K Reviews)</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold">
                    Trusted by Parents & Counselors
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: 100+ Tests */}
              <div className="absolute bottom-8 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3 z-20">
                <div className="w-9 h-9 rounded-xl bg-cyan-50 text-[#1b93ad] flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-800">
                    100+ Assessments & Career Paths
                  </div>
                  <div className="text-[10px] text-emerald-600 font-bold">
                    100% Scientific Validation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
