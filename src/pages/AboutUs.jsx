import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Award, GraduationCap, Users, ArrowRight } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import TeamSection from "../components/home/TeamSection";
import WhyChooseSection from "../components/home/WhyChooseSection";

export default function AboutUs() {
  return (
    <div className="py-12 space-y-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0b3b60] to-[#0f172a] rounded-3xl p-8 sm:p-14 text-white shadow-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-400/10 text-cyan-300 text-xs font-bold border border-cyan-400/20">
            <GraduationCap className="w-4 h-4" />
            <span>Our Mission & Origin</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl">
            Democratizing Scientific Career Guidance Across India
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            KYP5 (Know Your Potential, Personality, Progress & Path) was founded by career researchers, clinical psychologists, and educators to eliminate arbitrary stream selection and bring psychometric clarity to every Indian household.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-lg">
              01
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Psychological Rigor</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every battery is calibrated against Holland RIASEC, Gardner's Multiple Intelligences, and validated psychometric distributions.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
              02
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Equal Linguistic Access</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Fully localized in English, Punjabi, and Hindi, making scientific guidance accessible across urban and tier-2/3 institutions.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
              03
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Actionable Roadmaps</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We go beyond passive diagnostic tests by giving students 4-year actionable milestones, exam syllabi, and counselor support.
            </p>
          </div>
        </div>
      </section>

      <WhyChooseSection />
      <TeamSection />
    </div>
  );
}
