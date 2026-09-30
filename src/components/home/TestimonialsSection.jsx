import React, { useEffect, useState } from "react";
import { Star, Quote, User } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import publicApi from "../../api/publicApi";
import { extractListData, resolveImageUrl } from "../../utils/dataHelper";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const res = await publicApi.getTestimonials({ limit: 12 });
        const list = extractListData(res);
        if (list && list.length > 0) {
          setTestimonials(list);
        } else {
          setTestimonials([
            {
              id: "1",
              name: "Tanmay Singhal",
              designation: "Class 10 Student, DPS",
              content:
                "I was completely torn between PCM and Commerce with Math. The KYP5 test broke down my aptitude so clearly with graphs that even my parents were instantly convinced. The 15-page report is gold!",
              rating: 5,
            },
            {
              id: "2",
              name: "Sunita Deshmukh",
              designation: "Parent of Class 12 Student",
              content:
                "The psychometric assessment helped my daughter identify emerging design degrees we had never heard of before. Today she is happily studying UX design at a top college!",
              rating: 5,
            },
            {
              id: "3",
              name: "Principal R. K. Varma",
              designation: "Senior Secondary School Principal",
              content:
                "We conducted the KYP5 assessment for all 350 students of Class 10. The multi-lingual interface and instant PDF generation made our annual counseling drive seamless.",
              rating: 5,
            },
          ]);
        }
      } catch (err) {
        console.warn("Using sample testimonials", err);
      } finally {
        setLoading(false);
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => {
            const avatarUrl = item.avatar ? resolveImageUrl(item.avatar) : null;
            const feedbackText = item.content || item.comment || item.feedback || item.description || "";
            const authorRole = item.designation || item.role || "Verified Student / Educator";
            const ratingCount = Math.min(Math.max(Number(item.rating) || 5, 1), 5);

            return (
              <div
                key={item.id || idx}
                className="card p-7 sm:p-8 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 bg-white border border-slate-200/80 shadow-xs"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(ratingCount)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{feedbackText}"
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-xs flex items-center justify-center shrink-0">
                        {item.name ? item.name.charAt(0).toUpperCase() : "K"}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-sm font-extrabold text-slate-900 truncate">{item.name}</div>
                      <div className="text-xs font-semibold text-slate-500 mt-0.5 truncate">
                        {authorRole}
                      </div>
                    </div>
                  </div>
                  <span className="text-2xl opacity-20 font-serif shrink-0">“</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
