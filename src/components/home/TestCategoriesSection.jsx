import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, HelpCircle, ArrowRight, CheckCircle } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import publicApi from "../../api/publicApi";
import { extractListData, resolveImageUrl } from "../../utils/dataHelper";

export default function TestCategoriesSection() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await publicApi.getTests({ limit: 6 });
        const list = extractListData(res);
        if (list && list.length > 0) {
          setTests(list);
        } else {
          setTests([
            {
              id: "test-stream-finder-1",
              title: "STREAM IDENTIFIER",
              duration: 45,
              questionCount: 4,
              image: null,
              description: "Scientifically identifies aptitude & personality for Science (PCM/PCB), Commerce, or Humanities.",
            },
          ]);
        }
      } catch (err) {
        console.warn("Using default assessments:", err);
        setTests([
          {
            id: "test-stream-finder-1",
            title: "STREAM IDENTIFIER",
            duration: 45,
            questionCount: 4,
            image: null,
            description: "Scientifically identifies aptitude & personality for Science (PCM/PCB), Commerce, or Humanities.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Psychometric Assessment"
          title="Featured Career Assessments"
          subtitle="Designed by clinical psychologists and career researchers to give students absolute clarity on their natural strengths, interests, and best career paths."
        />

        {/* Assessment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tests.map((test, index) => {
            const fallbackImg =
              index === 0
                ? "/assets/images/test-kyp5.png"
                : index === 1
                ? "/assets/images/about-service.jpg"
                : "/assets/images/common-kyp5.jpg";

            const imgSrc = resolveImageUrl(test.image, fallbackImg);

            return (
              <div
                key={test.id || index}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 bg-slate-100 overflow-hidden flex items-center justify-center">
                    <img
                      src={imgSrc}
                      alt={test.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = fallbackImg;
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-full text-[11px] font-extrabold text-[#1b93ad] shadow-xs">
                      Certified Battery
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#1b93ad]" />
                        {test.duration || 45} Minutes
                      </span>
                      <span className="flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-amber-500" />
                        {test.questionCount || 0} Questions
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-[#0f172a] group-hover:text-[#1b93ad] transition-colors line-clamp-2">
                      {test.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {test.description ||
                        "Evaluates aptitude, personality traits, and career orientation using validated psychometric batteries."}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Instant Report
                  </span>

                  <Link
                    to={`/test/${test.id}/instructions`}
                    className="inline-flex items-center gap-1.5 bg-[#2995ac] hover:bg-[#207f94] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs hover:shadow-md"
                  >
                    <span>Take Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/tests"
            className="inline-flex items-center gap-2 bg-[#2d3748] hover:bg-[#1a202c] text-white font-bold px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-sm transition-all"
          >
            <span>View All Assessments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
