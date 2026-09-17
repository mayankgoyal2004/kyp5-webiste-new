import React from "react";
import { Link } from "react-router-dom";
import {
  School,
  Users,
  FileSpreadsheet,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Share2,
  Award,
  BookOpen
} from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";

export default function ForSchools() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0b1b2b] via-[#112d47] to-[#1b93ad] text-white p-8 sm:p-14 shadow-2xl">
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-white/10 text-cyan-300 backdrop-blur-md border border-white/10">
            <School className="w-3.5 h-3.5" />
            <span>Institutional Career Guidance Solution</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Standardize Career Counseling Across Your <span className="text-cyan-300">Entire School</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
            KYP5 equips schools with certified psychometric stream identification batteries, counselor logbooks, and co-branded 15-page student reports—all managed through an intuitive school portal.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-black px-7 py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl shadow-cyan-500/25 transition-all"
            >
              <span>Explore School Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/institution/register"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-2xl text-xs sm:text-sm border border-white/20 backdrop-blur-md transition-all"
            >
              <span>Instant School Registration</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3 Core Pillars */}
      <section className="space-y-8">
        <SectionHeading
          badge="Why 100+ Leading Schools Trust KYP5"
          title="Designed for Principals, Counselors & Parents"
          subtitle="A complete turnkey infrastructure for aptitude drives, stream recommendations, and parent counseling meets."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Zero-Friction Batch Testing</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No software setup or heavy lab downloads. Students log in directly from school computer labs or home devices using your custom School Referral Code.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Counselor Recommendation Logs</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              School psychologists and career guides can log individual 1-on-1 counseling notes, stream recommendations, and parent discussion records directly into the student's profile.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">School Co-Branded PDF Reports</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every student report carries your school's official logo, principal signature block, and customized counseling advice, elevating your institution's prestige.
            </p>
          </div>
        </div>
      </section>

      {/* Referral & Instant Distribution Feature Highlight */}
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-5">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5" />
            <span>Seamless Student Distribution</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            One Custom Code. Instant Student Enrolment.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Upon package activation, you get a custom School Code (e.g. <span className="font-mono text-cyan-300 font-bold">DPS-NOIDA-2026</span>) and a unique student registration URL. Share it on WhatsApp, and students are instantly attached to your school roster with full quota tracking.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              to="/institution/register"
              className="inline-flex items-center gap-2 bg-[#1b93ad] hover:bg-[#15798e] text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all"
            >
              <span>Register Your School Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors py-3"
            >
              <span>Compare All Tier Features</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-800/90 rounded-2xl p-6 border border-slate-700 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-700">
            <span>Live School Quota Demo</span>
            <span className="text-emerald-400 font-bold">Active</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Student Seats Consumed</span>
                <span className="text-cyan-300">342 / 500 Seats</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyan-400 to-sky-500 h-2 rounded-full w-[68%]"></div>
              </div>
            </div>

            <div className="bg-slate-900/80 rounded-xl p-3 text-xs space-y-1 font-mono text-slate-300">
              <div className="text-[10px] text-slate-500 uppercase">Referral Link</div>
              <div className="text-cyan-300 truncate">https://kyp5.com/register?ref=DPS2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
