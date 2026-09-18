import React, { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import publicApi from "../../api/publicApi";
import { extractListData } from "../../utils/dataHelper";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await publicApi.getTestimonials();
        const list = extractListData(res);
        if (list && list.length > 0) {
          setTestimonials(list);
        } else {
          setTestimonials([
            {
              id: "1",
              name: "Tanmay Singhal",
              role: "Class 10 Student, DPS",
              comment:
                "I was completely torn between PCM and Commerce with Math. The KYP5 test broke down my aptitude so clearly with graphs that even my parents were instantly convinced. The 15-page report is gold!",
              rating: 5,
            },
            {
              id: "2",
              name: "Sunita Deshmukh",
              role: "Parent of Class 12 Student",
              comment:
                "The psychometric assessment helped my daughter identify emerging design degrees we had never heard of before. Today she is happily studying UX design at a top college!",
              rating: 5,
            },
            {
              id: "3",
              name: "Principal R. K. Varma",
              role: "Senior Secondary School Principal",
              comment:
                "We conducted the KYP5 assessment for all 350 students of Class 10. The multi-lingual interface and instant PDF generation made our annual counseling drive seamless.",
              rating: 5,
            },
          ]);
        }
      } catch (err) {
        console.warn("Using sample testimonials", err);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="container-page">
        <SectionHeading
          badge="Verified Feedback"
          title="Trusted by Students, Parents & Educators"
          subtitle="Read how KYP5 psychometric assessments bring scientific clarity to high-stakes career and stream decisions."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={item.id || idx}
              className="card p-7 sm:p-8 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 bg-white"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{item.comment || item.feedback || item.description}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                <div>
                  <div className="text-sm font-extrabold text-slate-900">{item.name}</div>
                  <div className="text-xs font-semibold text-slate-500 mt-0.5">
                    {item.role || item.designation || "Student"}
                  </div>
                </div>
                <span className="text-2xl opacity-20 font-serif">“</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
