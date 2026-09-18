import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ShieldCheck, Award, Zap, Brain, Target, ArrowRight } from "lucide-react";
import SectionHeading from "../common/SectionHeading";

export default function WhyChooseSection() {
  const points = [
    {
      icon: Brain,
      title: "Scientifically Validated Batteries",
      desc: "Built on empirical psychological models including Holland's RIASEC vocational code and Gardner's 8 Multiple Intelligences.",
    },
    {
      icon: Target,
      title: "Eliminates Guesswork & Peer Pressure",
      desc: "Provides objective, quantitative data to protect students from impulsive stream choices and societal bias.",
    },
    {
      icon: Zap,
      title: "Instant 15-Page Certified PDF Dossier",
      desc: "Automated analysis engines deliver high-resolution color PDF reports immediately upon completion.",
    },
    {
      icon: ShieldCheck,
      title: "Institutional Scale & Batch Analytics",
      desc: "Robust dashboard for school principals to view aggregated class metrics, stream distributions, and student readiness.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Content */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              badge="Why Choose KYP5"
              title="Built for Students, Trusted by Leading Schools"
              subtitle="We bridge the gap between human potential and academic choices with data-driven psychometrics."
              align="left"
            />

            <div className="space-y-4">
              {points.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">{p.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link to="/why-choose-us" className="btn-primary text-xs">
                <span>Read Full Methodology</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Accent */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="w-full max-w-lg bg-gradient-to-tr from-slate-900 to-indigo-950 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

              <span className="inline-block text-[10px] font-black uppercase tracking-wider text-indigo-300 bg-indigo-900/60 px-3 py-1 rounded-full border border-indigo-700/50 mb-4">
                National Educational Impact
              </span>

              <h3 className="text-2xl font-black text-white leading-tight">
                98.4% of Assessed Students Picked Streams Aligning With Natural Aptitude
              </h3>

              <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                By comparing individual test results against academic success benchmarks over 5 years, KYP5 psychometric profiles demonstrate unparalleled accuracy and long-term satisfaction.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <div>
                  <div className="text-2xl font-black text-amber-400">50K+</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Students Guided</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-400">250+</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Partner Institutions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
