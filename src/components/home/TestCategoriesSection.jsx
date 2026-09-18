import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, HelpCircle, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
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
              title: "Stream Identifier & Career Profiler",
              duration: 45,
              questionCount: 70,
              image: null,
              description: "Scientifically maps aptitude and personality for Science (PCM/PCB), Commerce, or Humanities.",
            },
            {
              id: "test-multiple-intelligence",
              title: "Multiple Intelligence (MI) Assessment",
              duration: 35,
              questionCount: 60,
              image: null,
              description: "Evaluates 8 distinct psychological intelligences based on Howard Gardner's proven model.",
            },
            {
              id: "test-vocational-aptitude",
              title: "Vocational & Cognitive Aptitude Battery",
              duration: 50,
              questionCount: 80,
              image: null,
              description: "Evaluates numerical logic, spatial perception, and vocational personality compatibility.",
            },
          ]);
        }
      } catch (err) {
        console.warn("Using fallback assessments:", err);
        setTests([
          {
            id: "test-stream-finder-1",
            title: "Stream Identifier & Career Profiler",
            duration: 45,
            questionCount: 70,
            image: null,
            description: "Scientifically maps aptitude and personality for Science (PCM/PCB), Commerce, or Humanities.",
          },
          {
            id: "test-multiple-intelligence",
            title: "Multiple Intelligence (MI) Assessment",
            duration: 35,
            questionCount: 60,
            image: null,
            description: "Evaluates 8 distinct psychological intelligences based on Howard Gardner's proven model.",
          },
          {
            id: "test-vocational-aptitude",
            title: "Vocational & Cognitive Aptitude Battery",
            duration: 50,
            questionCount: 80,
            image: null,
            description: "Evaluates numerical logic, spatial perception, and vocational personality compatibility.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container-page">
        <SectionHeading
          badge="Psychometric Assessment"
          title="Featured Career Assessments"
          subtitle="Designed by clinical psychologists and career researchers to give students, parents, and educators absolute clarity on natural strengths, interests, and career fit."
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
                className="card flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5 transition-all duration-300"
              >
                <div>
                  <div className="relative h-48 bg-slate-100 overflow-hidden flex items-center justify-center">
                    <img
                      src={imgSrc}
                      alt={test.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = fallbackImg;
                      }}
                    />
                    <div className="absolute top-3 left-3 bg-white/95 px-3 py-1 rounded-full text-[11px] font-extrabold text-indigo-700 shadow-xs ring-1 ring-slate-100">
                      Certified Battery
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                      <span className="flex items-center gap-1.5 text-indigo-600">
                        <Clock className="w-4 h-4" />
                        {test.duration || 45} Mins
                      </span>
                      <span className="flex items-center gap-1.5 text-amber-600">
                        <HelpCircle className="w-4 h-4" />
                        {test.questionCount || 70} Questions
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
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
                    className="btn-primary text-xs px-3.5 py-2"
                  >
                    <span>Take Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/tests"
            className="btn-outline text-sm px-6 py-3"
          >
            <span>View All Assessments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
