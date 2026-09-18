import React from "react";
import { Link } from "react-router-dom";
import { School, User, ArrowRight, Check } from "lucide-react";
import SectionHeading from "../common/SectionHeading";

export default function AudiencesSection() {
  const pathways = [
    {
      icon: "🏫",
      target: "Class 8–12 Students & Schools",
      title: "For Schools & Institutions",
      description:
        "Conduct scientific Multiple Intelligence & Stream Selection assessments for batches of students and generate comprehensive individual PDF guidance dossiers.",
      features: [
        "Multiple Intelligence (MI) assessment framework",
        "Stream recommendation (Science, Commerce, Humanities)",
        "Comprehensive institutional batch analytics & educator dashboard",
        "Printed or instant downloadable student guidance dossiers",
      ],
      ctaText: "Enroll Your School",
      ctaLink: "/for-schools",
      badgeColor: "text-indigo-600 bg-indigo-50",
    },
    {
      icon: "👤",
      target: "Students · Parents · Career Seekers",
      title: "Individual Assessment",
      description:
        "Take a comprehensive psychometric assessment individually from home, discover your natural cognitive strengths, and download your verified career roadmap immediately.",
      features: [
        "Direct online testing on mobile, tablet, or laptop",
        "Instant psychometric analysis & RIASEC scoring",
        "Detailed 15-page certified career PDF guidance report",
        "Lifetime access to your results & action plan",
      ],
      ctaText: "Take Individual Test",
      ctaLink: "/tests",
      badgeColor: "text-indigo-600 bg-indigo-50",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container-page">
        <SectionHeading
          badge="Choose Your Path"
          title="Tailored Solutions for Schools & Individuals"
          subtitle="Whether you are an educational institution guiding batches of students or an individual student or parent planning the right academic and career roadmap."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-8">
          {pathways.map((item, index) => (
            <div
              key={index}
              className="card flex flex-col justify-between p-7 sm:p-9 hover:-translate-y-1.5 transition-all duration-300 relative group"
            >
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-3xl mb-5 group-hover:scale-110 transition-transform shadow-xs">
                  {item.icon}
                </div>

                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  {item.target}
                </p>

                <h3 className="mt-1 text-2xl font-extrabold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                <ul className="mt-6 space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-5">
                  {item.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mt-0.5">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-4">
                <Link
                  to={item.ctaLink}
                  className="btn-primary w-full text-sm"
                >
                  <span>{item.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
