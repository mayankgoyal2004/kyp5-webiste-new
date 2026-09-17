import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Clock,
  HelpCircle,
  ShieldAlert,
  CheckSquare,
  Languages,
  ArrowRight,
  BookOpen,
  Sparkles,
  AlertCircle
} from "lucide-react";
import publicApi from "../api/publicApi";
import studentApi from "../api/studentApi";
import { useAuth } from "../context/AuthContext";
import { extractItemData } from "../utils/dataHelper";
import RichTextContent from "../components/common/RichTextContent";
import toast from "react-hot-toast";

export default function TestInstruction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [agreed, setAgreed] = useState(false);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        setLoading(true);
        if (isAuthenticated) {
          try {
            const res = await studentApi.getTestDetails(id, selectedLanguage);
            const data = extractItemData(res);
            if (data && data.test) {
              setTest(data.test);
              return;
            }
          } catch (e) {
            console.warn("Falling back to public test info", e);
          }
        }
        const pubRes = await publicApi.getTestById(id);
        const pubData = extractItemData(pubRes);
        if (pubData) {
          setTest(pubData);
        }
      } catch (err) {
        toast.error("Failed to load test instructions.");
        navigate("/tests");
      } finally {
        setLoading(false);
      }
    };

    fetchTestDetails();
  }, [id, isAuthenticated, selectedLanguage, navigate]);

  const handleStartTest = async () => {
    if (!agreed) {
      toast.error("Please agree to the examination instructions.");
      return;
    }

    if (!isAuthenticated) {
      toast.error("Please login or create an account to start the assessment.");
      navigate("/login", { state: { returnUrl: `/test/${id}/instructions` } });
      return;
    }

    try {
      setStarting(true);
      const res = await studentApi.startAttempt(id, selectedLanguage);
      const data = extractItemData(res);
      if (data && data.id) {
        navigate(`/test/attempt/${data.id}`);
      }
    } catch (err) {
      toast.error(err.message || "Could not start test attempt.");
    } finally {
      setStarting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#1b93ad] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Test Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <span className="text-xs font-bold text-[#1b93ad] uppercase tracking-wider bg-cyan-50 px-3 py-1 rounded-full">
            Standard Psychometric Battery
          </span>

          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-slate-500" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#1b93ad]"
            >
              <option value="en">English</option>
              <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
              <option value="hi">हिन्दी (Hindi)</option>
            </select>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a]">
          {test?.title || "Assessment Instructions"}
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <div className="text-[11px] text-slate-500 font-bold uppercase">Duration</div>
            <div className="text-base font-extrabold text-slate-800 mt-0.5">{test?.duration || 45} Minutes</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <div className="text-[11px] text-slate-500 font-bold uppercase">Questions</div>
            <div className="text-base font-extrabold text-slate-800 mt-0.5">{test?.questionCount || 0} Items</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <div className="text-[11px] text-slate-500 font-bold uppercase">Attempts</div>
            <div className="text-base font-extrabold text-slate-800 mt-0.5">{test?.allowedAttempts || 1} Allowed</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <div className="text-[11px] text-slate-500 font-bold uppercase">Auto-Submit</div>
            <div className="text-base font-extrabold text-emerald-600 mt-0.5">Enabled</div>
          </div>
        </div>
      </div>

      {/* Rules & Instructions Body */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-lg font-extrabold text-[#0f172a] border-b border-slate-100 pb-3">
          Standard Test Guidelines & Rules
        </h3>

        {test?.instructions || test?.termsConditions ? (
          <div className="space-y-4">
            {test.instructions && <RichTextContent content={test.instructions} />}
            {test.termsConditions && <RichTextContent content={test.termsConditions} />}
          </div>
        ) : (
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-cyan-100 text-[#1b93ad] font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                1
              </span>
              <p>
                There are no right or wrong answers in psychometric interest and personality batteries. Please answer truthfully based on your genuine preferences and instinct.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-cyan-100 text-[#1b93ad] font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                2
              </span>
              <p>
                Your answers are auto-saved in real time. If your device disconnects or reloads, your progress will be restored as long as the timer remains active.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-cyan-100 text-[#1b93ad] font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                3
              </span>
              <p>
                Do not switch browser tabs or minimize the testing window. Frequent window switching triggers anti-cheat warning logs.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-cyan-100 text-[#1b93ad] font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                4
              </span>
              <p>
                When the countdown timer expires, your exam will automatically submit and calculate your career report.
              </p>
            </div>
          </div>
        )}

        {/* Agreement Checkbox */}
        <div className="pt-4 border-t border-slate-100">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 rounded text-[#1b93ad] focus:ring-[#1b93ad] mt-1 cursor-pointer"
            />
            <span className="text-xs sm:text-sm font-semibold text-slate-700">
              I have read and understood all examination rules. I am ready to begin my assessment in a quiet environment.
            </span>
          </label>
        </div>

        {/* Start Action */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/tests" className="text-xs font-bold text-slate-500 hover:text-slate-800">
            Back to Tests
          </Link>

          <button
            onClick={handleStartTest}
            disabled={!agreed || starting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2995ac] hover:bg-[#207f94] text-white font-extrabold px-8 py-3.5 rounded-2xl shadow-lg shadow-cyan-600/25 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>{starting ? "Initializing Assessment..." : "Begin Assessment Now"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
