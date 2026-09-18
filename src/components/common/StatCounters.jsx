import React from "react";
import { Users, School, Award, FileCheck } from "lucide-react";

export default function StatCounters() {
  const stats = [
    {
      icon: Users,
      value: "50,000+",
      label: "Students Assessed",
      description: "Across pan-India institutions",
    },
    {
      icon: School,
      value: "250+",
      label: "Partner Schools",
      description: "CBSE, ICSE & State Boards",
    },
    {
      icon: Award,
      value: "98.4%",
      label: "Accuracy Rating",
      description: "Validated psychometric scoring",
    },
    {
      icon: FileCheck,
      value: "100%",
      label: "Scientific Reports",
      description: "Instant bilingual PDF analysis",
    },
  ];

  return (
    <section className="bg-slate-900 border-y border-slate-800 text-white py-10 sm:py-12">
      <div className="container-page">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-200 mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 hidden sm:block">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
