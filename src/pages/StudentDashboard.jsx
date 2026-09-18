import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  GraduationCap,
  FileCheck2,
  Clock,
  Download,
  ArrowRight,
  School,
  Sparkles,
  RefreshCw,
  LogOut,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import studentApi from "../api/studentApi";
import { extractListData, resolveImageUrl } from "../utils/dataHelper";

export default function StudentDashboard() {
  const { student, logoutUser } = useAuth();
  const [results, setResults] = useState([]);
  const [availableTests, setAvailableTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [resResults, resTests] = await Promise.all([
          studentApi.getMyResults().catch(() => ({ data: [] })),
          studentApi.getAvailableTests().catch(() => ({ data: [] })),
        ]);

        const myResults = extractListData(resResults);
        const myTests = extractListData(resTests);

        setResults(myResults);
        setAvailableTests(myTests);
      } catch (err) {
        console.warn("Failed to load student dashboard", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Student Welcome Card */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center justify-center font-black text-2xl shrink-0">
            {student?.name?.charAt(0) || "S"}
          </div>
          <div>
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Student Workspace
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">{student?.name || "Student"}</h1>
            <p className="text-xs text-slate-300 mt-1">
              {student?.email} {student?.schoolInstitute ? `• ${student?.schoolInstitute}` : ""}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/tests"
            className="btn-primary text-xs"
          >
            <Sparkles className="w-4 h-4" />
            <span>Take New Assessment</span>
          </Link>
          <button
            onClick={logoutUser}
            className="btn-outline bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Grid: Assessments and Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Available Assessments */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              <span>Available Assessments</span>
            </h2>
            <Link to="/tests" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="min-h-[150px] flex items-center justify-center">
              <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : availableTests.length === 0 ? (
            <div className="card p-8 text-center">
              <p className="text-xs text-slate-500 font-semibold">
                No new tests currently assigned. Browse our full assessment catalog.
              </p>
              <Link to="/tests" className="btn-primary text-xs mt-4">
                Explore Catalog
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {availableTests.map((t) => (
                <div
                  key={t.id}
                  className="card p-5 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">{t.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1 text-indigo-600 font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        {t.duration || 45} mins
                      </span>
                      <span className="flex items-center gap-1 text-amber-600 font-semibold">
                        <HelpCircle className="w-3.5 h-3.5" />
                        {t.questionCount || 70} Questions
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/test/${t.id}/instructions`}
                    className="btn-primary text-xs px-4 py-2 shrink-0"
                  >
                    <span>Start Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Tests & Reports */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-emerald-600" />
              <span>Assessment Reports</span>
            </h2>
          </div>

          {loading ? (
            <div className="min-h-[150px] flex items-center justify-center">
              <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : results.length === 0 ? (
            <div className="card p-8 text-center space-y-3">
              <FileCheck2 className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500 font-semibold">
                You haven't completed any assessments yet.
              </p>
              <Link
                to="/tests"
                className="inline-block text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                Start an assessment now →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((r) => (
                <div
                  key={r.id || r.attemptId}
                  className="card p-5 hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {r.test?.title || r.testTitle || "Psychometric Assessment"}
                      </h4>
                      <div className="text-[11px] text-slate-400">
                        Attempted on: {new Date(r.createdAt || r.endTime || Date.now()).toLocaleDateString()}
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full shrink-0 border border-emerald-100">
                      Completed
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to={`/test/results/${r.id || r.attemptId}`}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <span>View Online Result</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
