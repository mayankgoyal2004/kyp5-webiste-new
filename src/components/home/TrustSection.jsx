import React from "react";
import { ShieldCheck, Award, BookOpen, CheckCircle } from "lucide-react";
import SectionHeading from "../common/SectionHeading";

export default function TrustSection() {
  const trustMetrics = [
    {
      label: "Government Recognition",
      title: "MSME Registered",
      desc: "Recognized educational & skill assessment body",
      badge: "Govt of India",
    },
    {
      label: "Quality Standard",
      title: "ISO 9001:2015",
      desc: "Certified psychometric testing & counselling quality",
      badge: "Quality Certified",
    },
    {
      label: "Scientific Foundation",
      title: "RIASEC & Gardner MI",
      desc: "Globally validated psychological assessment frameworks",
      badge: "Empirical Research",
    },
    {
      label: "Career Database",
      title: "900+ Career Codes",
      desc: "Mapped to modern industry roles, streams & colleges",
      badge: "Updated 2026",
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200">
      <div className="container-page">
        <SectionHeading
          badge="Trust & Transparency"
          title="A Research-Backed & Certified Initiative"
          subtitle="Operating with rigorous psychometric ethics and international testing protocols to guide students toward their highest potential."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustMetrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 text-center hover:shadow-md transition-shadow"
            >
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                {m.label}
              </span>
              <p className="mt-2 text-xl font-extrabold text-indigo-700">
                {m.title}
              </p>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                {m.desc}
              </p>
              <div className="mt-3 inline-block bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-100">
                {m.badge}
              </div>
            </div>
          ))}
        </div>

        {/* Highlight strip */}
        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-slate-600 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> Registrar of Societies Compliant
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> Multi-lingual Assessment Support
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> Complete Data Privacy & Encryption
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> Certified Guidance Counselors
          </span>
        </div>
      </div>
    </section>
  );
}
