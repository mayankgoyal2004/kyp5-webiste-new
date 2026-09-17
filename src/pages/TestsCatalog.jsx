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
          // Fallback only if no tests received from backend
          setTests([
            {
              id: "test-stream-finder-1",
              title: "STREAM IDENTIFIER",
              duration: 45,
              questionCount: 4,
              image: null,
              description: "Scientifically identifies student aptitude and strengths for Science, Commerce, and Humanities streams.",
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
            title: "STREAM IDENTIFIER",
            duration: 45,
            questionCount: 4,
            image: null,
            description: "Scientifically identifies student aptitude and strengths for Science, Commerce, and Humanities streams.",
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
          className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1b93ad] shadow-xs"
        />
      </div>

      {/* Tests Grid */}
      {loading ? (
        <div className="min-h-[300px] flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-4 border-[#1b93ad] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-500">Loading assessments from backend...</p>
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
                        {test.duration || 45} Mins
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
                    className="inline-flex items-center gap-1.5 bg-[#2995ac] hover:bg-[#207f94] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs hover:shadow-md transition-all"
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
