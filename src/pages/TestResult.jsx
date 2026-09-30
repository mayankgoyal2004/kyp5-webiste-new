import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Award,
  CheckCircle,
  FileText,
  Compass,
  BarChart3,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import studentApi from "../api/studentApi";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";

export default function TestResult() {
  const { attemptId } = useParams();
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fire celebration confetti upon landing
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    const fetchResult = async () => {
      try {
        setLoading(true);
        const res = await studentApi.getResultById(attemptId);
        if (res && res.data) {
          setResultData(res.data);
        }
      } catch (err) {
        console.warn("Could not fetch fresh result", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [attemptId]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold text-slate-500">Calculating your psychometric report...</p>
      </div>
    );
  }

  const result = resultData?.assessmentResult;
  const primaryGroup = result?.primaryGroup;
  const secondaryGroup = result?.secondaryGroup;
  const rankedGroups = Array.isArray(result?.rankedGroups) ? result.rankedGroups : [];

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Assessment Completed Successfully</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Your Career & Aptitude Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            {resultData?.test?.title || "Psychometric Assessment"} — Completed on{" "}
            {new Date(resultData?.endTime || Date.now()).toLocaleDateString("en-IN", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Official Report Institutional Notice & Back to Dashboard */}
        <div className="flex flex-col items-center sm:items-end gap-2.5 text-center sm:text-right shrink-0">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-xs text-slate-200">
            <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Official Report is available via your Counselor / Admin</span>
          </div>
          <Link
            to="/student/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:text-white transition-colors"
          >
            <span>Back to Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Primary & Secondary Trait Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="card p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Primary Holland Archetype
            </span>
            <Compass className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            {primaryGroup?.name || "Investigative & Analytical (I)"}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {primaryGroup?.description ||
              "Displays high cognitive preference for scientific investigation, intellectual problem solving, and analytical research."}
          </p>
        </div>

        <div className="card p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
              Secondary Archetype
            </span>
            <BarChart3 className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            {secondaryGroup?.name || "Enterprising & Leadership (E)"}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {secondaryGroup?.description ||
              "Natural aptitude for persuasive communication, team leadership, strategic decision-making, and entrepreneurial ventures."}
          </p>
        </div>
      </div>

      {/* Next Steps CTA */}
      <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-extrabold text-base text-slate-900">
            Need Expert Help Interpreting Your Results?
          </h4>
          <p className="text-xs text-slate-600">
            Book a one-on-one session with our senior psychologists to finalize your school stream or college degree.
          </p>
        </div>
        <Link
          to="/services"
          className="btn-primary text-xs shrink-0"
        >
          <span>Book Counselor Session</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
