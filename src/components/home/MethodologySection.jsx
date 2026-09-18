import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, UserPlus, ClipboardList, Laptop, FileCheck2 } from "lucide-react";
import SectionHeading from "../common/SectionHeading";

export default function MethodologySection() {
  const steps = [
    {
      num: 1,
      icon: UserPlus,
      title: "Register / Enroll",
      description: "Schools enroll in seconds; individual students & parents sign up with basic details.",
    },
    {
      num: 2,
      icon: ClipboardList,
      title: "Select Assessment",
      description: "Add student batches for school drives, or pick individual guidance battery.",
    },
    {
      num: 3,
      icon: Laptop,
      title: "Take the Test",
      description: "Answer validated psychometric questions online on mobile, tablet, or PC.",
    },
    {
      num: 4,
      icon: FileCheck2,
      title: "Get the Report",
      description: "A professional, 15-page certified guidance PDF dossier is generated instantly.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="container-page">
        <SectionHeading
          badge="Simple Process"
          title="How It Works"
          subtitle="A seamless 4-step scientific testing and evaluation workflow designed for maximum accuracy, simplicity, and speed."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="card relative p-7 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-sm font-black text-white shadow-md shadow-indigo-600/20">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-[11px] font-bold text-indigo-600">
                  <span>Step 0{step.num}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/for-schools"
            className="btn-primary text-sm px-6 py-3"
          >
            <span>Start Your Assessment Drive</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
