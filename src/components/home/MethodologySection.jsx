import React from "react";
import {
  Compass,
  Brain,
  Layers,
  Sparkles,
  Target,
  FileSpreadsheet,
  CheckCircle2
} from "lucide-react";
import SectionHeading from "../common/SectionHeading";

export default function MethodologySection() {
  const models = [
    {
      title: "Holland RIASEC Career Model",
      badge: "Interest Mapping",
      icon: Compass,
      color: "from-cyan-500 to-blue-600",
      description:
        "Evaluates six key personality dimensions (Realistic, Investigative, Artistic, Social, Enterprising, Conventional) to discover congruent career clusters.",
      points: [
        "Identifies 3-letter Holland RIASEC code",
        "Over 900+ modern occupation alignments",
        "Stream & subject compatibility indices",
      ],
    },
    {
      title: "Multiple Intelligence Framework",
      badge: "Howard Gardner Model",
      icon: Brain,
      color: "from-amber-500 to-orange-600",
      description:
        "Measures linguistic, logical-mathematical, spatial, bodily-kinesthetic, musical, interpersonal, and intrapersonal intelligences.",
      points: [
        "Uncovers unique learning styles",
        "Highlights natural cognitive proficiencies",
        "Guides extra-curricular and skill building",
      ],
    },
    {
      title: "Big Five Personality Battery",
      badge: "Workplace Fit",
      icon: Layers,
      color: "from-emerald-500 to-teal-600",
      description:
        "Assesses Openness, Conscientiousness, Extraversion, Agreeableness, and Emotional Stability for academic and workplace success.",
      points: [
        "Predicts team collaboration styles",
        "Identifies stress response and grit",
        "Optimizes study habits and career longevity",
      ],
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Scientific Framework"
          title="Psychometric Research Behind KYP5"
          subtitle="We combine globally validated psychological models with cutting-edge analytics to ensure accurate, reproducible, and objective guidance."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {models.map((m, i) => {
            const Icon = m.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.color} text-white flex items-center justify-center shadow-md`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">
                      {m.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#0f172a] pt-2">
                    {m.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {m.description}
                  </p>

                  <div className="pt-4 border-t border-slate-100 space-y-2.5">
                    {m.points.map((pt, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
