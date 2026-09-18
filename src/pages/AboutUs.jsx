import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Award, GraduationCap, Users, ArrowRight } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import TeamSection from "../components/home/TeamSection";
import WhyChooseSection from "../components/home/WhyChooseSection";
import TrustSection from "../components/home/TrustSection";
import { useSite } from "../context/SiteContext";
import RichTextContent from "../components/common/RichTextContent";
import { resolveImageUrl } from "../utils/dataHelper";

export default function AboutUs() {
  const { siteData } = useSite();

  const title = siteData?.about?.title || "Democratizing Scientific Career Guidance Across India";
  const subtitle = siteData?.about?.subtitle || "Know Your Potential, Personality, Progress & Path";
  const description =
    siteData?.about?.description ||
    siteData?.about?.summary ||
    "KYP5 (Know Your Potential, Personality, Progress & Path) was founded by career researchers, clinical psychologists, and educators to eliminate arbitrary stream selection and bring psychometric clarity to every Indian household.";

  const content = siteData?.about?.content || siteData?.about?.overview;

  return (
    <div className="py-12 space-y-16">
      {/* Hero Banner */}
      <section className="container-page">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-14 text-white shadow-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
            <GraduationCap className="w-4 h-4" />
            <span>{subtitle}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl">
            {title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            {description}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link to="/for-schools" className="btn-primary text-xs sm:text-sm">
              <span>Enroll School</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/tests" className="btn-outline bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs sm:text-sm">
              <span>Take Individual Test</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Dynamic Content if present */}
      {content && (
        <section className="container-page">
          <div className="card p-8 sm:p-12 shadow-sm">
            <RichTextContent content={content} />
          </div>
        </section>
      )}

      {/* Trust & Credentials Strip */}
      <TrustSection />

      {/* Core Values */}
      <section className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-8 space-y-3 hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-lg">
              01
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Psychological Rigor</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every battery is calibrated against Holland RIASEC, Gardner Multiple Intelligences, and validated Indian psychometric distributions.
            </p>
          </div>

          <div className="card p-8 space-y-3 hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
              02
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Equal Multi-lingual Access</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Localized in English, Punjabi, and Hindi, making scientific guidance accessible across urban and tier-2/3 institutions.
            </p>
          </div>

          <div className="card p-8 space-y-3 hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
              03
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Instant Actionable Reports</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Detailed 15+ page certified PDF analysis delivered immediately upon assessment completion with actionable career roadmaps.
            </p>
          </div>
        </div>
      </section>

      {/* Advisory Team */}
      <TeamSection />

      {/* Why Choose Us */}
      <WhyChooseSection />
    </div>
  );
}
