import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, HelpCircle, Search, ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import publicApi from "../api/publicApi";
import { extractListData, resolveImageUrl } from "../utils/dataHelper";

export default function TestsCatalog() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const res = await publicApi.getTests(search ? { search } : {});
        const list = extractListData(res);
        if (list && list.length > 0) {
          setTests(list);
        } else if (!search) {
          setTests([
            {
              id: "test-stream-finder-1",
              title: "Stream Identifier & Career Profiler",
              duration: 45,
              questionCount: 70,
              image: null,
              description: "Scientifically identifies student aptitude and strengths for Science (PCM/PCB), Commerce, and Humanities streams.",
            },
            {
              id: "test-multiple-intelligence",
              title: "Howard Gardner Multiple Intelligence Test",
              duration: 35,
              questionCount: 60,
              image: null,
              description: "Evaluates 8 distinct cognitive intelligences and aligns with ideal degree specializations.",
            },
            {
              id: "test-vocational-aptitude",
              title: "Vocational & Cognitive Aptitude Battery",
              duration: 50,
              questionCount: 80,
              image: null,
              description: "Evaluates verbal reasoning, abstract logic, and vocational personality compatibility for college degrees.",
            },
          ]);
        } else {
          setTests([]);
        }
      } catch (err) {
        console.warn("Error fetching tests:", err);
        setTests([
          {
            id: "test-stream-finder-1",
            title: "Stream Identifier & Career Profiler",
            duration: 45,
            questionCount: 70,
            image: null,
            description: "Scientifically identifies student aptitude and strengths for Science (PCM/PCB), Commerce, and Humanities streams.",
          },
          {
            id: "test-multiple-intelligence",
            title: "Howard Gardner Multiple Intelligence Test",
            duration: 35,
            questionCount: 60,
            image: null,
            description: "Evaluates 8 distinct cognitive intelligences and aligns with ideal degree specializations.",
          },
          {
            id: "test-vocational-aptitude",
            title: "Vocational & Cognitive Aptitude Battery",
            duration: 50,
            questionCount: 80,
            image: null,
            description: "Evaluates verbal reasoning, abstract logic, and vocational personality compatibility for college degrees.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchTests, 250);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHeading
        badge="Assessment Catalog"
        title="Choose Your Psychometric Assessment"
        subtitle="Select the evaluation tailored to your current academic stage or career milestone."
      />

      {/* Search Bar */}
      <div className="max-w-md mx-auto relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          placeholder="Search assessments by keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-xs"
        />
      </div>

      {/* Tests Grid */}
      {loading ? (
        <div className="min-h-[300px] flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-500">Loading assessments...</p>
        </div>
      ) : tests.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No assessments found</h3>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your search keyword.</p>
        </div>
      ) : (
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
                        "Full spectrum battery mapping vocational aptitude, cognitive proficiencies, and career congruence."}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Instant Result
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
      )}
    </div>
  );
}
