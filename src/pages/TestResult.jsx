import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Award,
  Download,
  CheckCircle,
  FileText,
  Compass,
  BarChart3,
  Sparkles,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import studentApi from "../api/studentApi";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";

export default function TestResult() {
  const { attemptId } = useParams();
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reportStatus, setReportStatus] = useState("PROCESSING");

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
          const status = res.data.generatedReport?.status || res.data.assessmentResult?.reportStatus || "PROCESSING";
          setReportStatus(status);
        }
      } catch (err) {
        console.warn("Could not fetch fresh result", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [attemptId]);

  // Polling for report readiness if in PROCESSING
  useEffect(() => {
    if (reportStatus === "READY") return;

    const interval = setInterval(async () => {
      try {
        const res = await studentApi.getResultById(attemptId);
        if (res && res.data) {
          const status = res.data.generatedReport?.status || res.data.assessmentResult?.reportStatus;
          if (status === "READY") {
            setReportStatus("READY");
            setResultData(res.data);
            clearInterval(interval);
          }
        }
      } catch (e) {}
    }, 5000);

    return () => clearInterval(interval);
  }, [attemptId, reportStatus]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
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
      <div className="bg-gradient-to-br from-[#0b3b60] to-[#0f172a] rounded-3xl p-8 sm:p-12 text-white shadow-2xl space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
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

        {/* PDF Download Button */}
        <div>
          {reportStatus === "READY" ? (
            <a
              href={resultData?.generatedReport?.filePath || "/assets/images/common-kyp5.jpg"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-2xl shadow-lg transition-all text-xs sm:text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Report PDF</span>
            </a>
          ) : (
            <div className="inline-flex items-center gap-2 bg-white/10 text-slate-300 font-bold px-5 py-3 rounded-2xl text-xs border border-white/15 animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Generating Certified PDF...</span>
            </div>
          )}
        </div>
      </div>

      {/* Primary & Secondary Trait Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full">
              Primary Holland Archetype
            </span>
            <Compass className="w-6 h-6 text-cyan-600" />
          </div>
          <h3 className="text-xl font-extrabold text-[#0f172a]">
            {primaryGroup?.name || "Investigative & Analytical (I)"}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {primaryGroup?.description ||
              "Displays high cognitive preference for scientific investigation, intellectual problem solving, and analytical research."}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
              Secondary Archetype
            </span>
            <BarChart3 className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-xl font-extrabold text-[#0f172a]">
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
          <h4 className="font-extrabold text-base text-[#0f172a]">
            Need Expert Help Interpreting Your Results • </h4>
          <p className="text-xs text-slate-600">
            Book a one-on-one session with our senior psychologists to finalize your school stream or college degree.
          </p>
        </div>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-3 rounded-2xl text-xs transition-colors shrink-0"
        >
          <span>Book Counselor Session</span>
          <ArrowRight className="w-4 h-4 text-cyan-400" />
        </Link>
      </div>
    </div>
  );
}
