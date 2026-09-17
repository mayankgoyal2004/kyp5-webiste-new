import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Award, GraduationCap, Users, ArrowRight } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import TeamSection from "../components/home/TeamSection";
import WhyChooseSection from "../components/home/WhyChooseSection";
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
  const image1 = resolveImageUrl(siteData?.about?.image1, "/assets/images/about/01.jpg");
  const image2 = resolveImageUrl(siteData?.about?.image2, "/assets/images/about/02.jpg");

  return (
    <div className="py-12 space-y-16">
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0b3b60] to-[#0f172a] rounded-3xl p-8 sm:p-14 text-white shadow-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-400/10 text-cyan-300 text-xs font-bold border border-cyan-400/20">
            <GraduationCap className="w-4 h-4" />
            <span>{subtitle}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl">
            {title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </section>

      {/* Dynamic Content if present */}
      {content && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
            <RichTextContent content={content} />
          </div>
        </section>
      )}

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-[#1b93ad] flex items-center justify-center font-bold text-lg">
              01
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Psychological Rigor</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every battery is calibrated against Holland RIASEC, Gardner's Multiple Intelligences, and validated Indian psychometric distributions.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#fbb034] flex items-center justify-center font-bold text-lg">
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
