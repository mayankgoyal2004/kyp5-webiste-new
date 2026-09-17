import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  School,
  CheckCircle,
  Users,
  BarChart3,
  FileCheck2,
  ArrowRight,
  ShieldCheck,
  Search,
  Sparkles
} from "lucide-react";
import publicApi from "../../api/publicApi";
import toast from "react-hot-toast";

export default function ForSchoolsBanner() {
  const [referralInput, setReferralInput] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verifiedSchool, setVerifiedSchool] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!referralInput.trim()) {
      toast.error("Please enter a school referral code.");
      return;
    }

    try {
      setVerifying(true);
      const res = await publicApi.verifyReferralCode(referralInput.trim());
      if (res && res.data && res.data.valid) {
        setVerifiedSchool(res.data.institution);
        toast.success(`Verified: ${res.data.institution.name}`);
      }
    } catch (err) {
      setVerifiedSchool(null);
      toast.error(err.message || "Invalid or inactive referral code.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#0b3b60] to-[#0f172a] text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: School Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-400/10 text-cyan-300 text-xs font-bold border border-cyan-400/20">
              <School className="w-4 h-4" />
              <span>For Schools, Colleges & Educational Trusts</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Transform Your School Into a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-300">
                Career Center of Excellence
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Enable full-batch psychometric testing for 100% of your students. Generate automated stream selection reports, track student progress, and empower teachers with counselor-ready dashboards.
            </p>

            {/* School Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-200">
                  Bulk assessment codes with zero IT setup
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-200">
                  Dedicated school referral link & branding
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-200">
                  Comprehensive 15-page student PDF reports
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-200">
                  School-wide analytics & counselor logs
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/for-schools"
                className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-2xl shadow-lg shadow-cyan-500/25 transition-all text-sm transform hover:-translate-y-0.5"
              >
                <span>Enroll Your School Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3.5 rounded-2xl border border-white/20 transition-all text-sm"
              >
                <span>View School Plans</span>
              </Link>
            </div>
          </div>

          {/* Right: Quick Referral Verification Box */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">
                    School Referral Verification
                  </h3>
                  <p className="text-xs text-slate-300">
                    Are you a student with a school code • </p>
                </div>
              </div>

              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-2">
                    Enter School / Teacher Referral Code:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. DPS2026 or STMARYS"
                      value={referralInput}
                      onChange={(e) => setReferralInput(e.target.value.toUpperCase())}
                      className="w-full bg-slate-950/60 border border-slate-600 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 uppercase tracking-wider font-mono font-bold focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      type="submit"
                      disabled={verifying}
                      className="absolute right-2 top-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-1.5 rounded-xl text-xs transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {verifying ? "Checking..." : "Verify"}
                    </button>
                  </div>
                </div>

                {verifiedSchool && (
                  <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-4 text-xs space-y-2 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verified Partner Institution:</span>
                    </div>
                    <div className="text-sm font-extrabold text-white">
                      {verifiedSchool.name}
                    </div>
                    <Link
                      to={`/register ? ref=${verifiedSchool.referralCode}`}
                      className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 font-bold underline text-xs pt-1"
                    >
                      <span>Proceed to Student Registration with this school →</span>
                    </Link>
                  </div>
                )}
              </form>

              <div className="text-xs text-slate-400 pt-2 border-t border-white/10 flex items-center justify-between">
                <span>Want to register your institution • </span>
                <Link to="/for-schools" className="text-cyan-400 font-bold hover:underline">
                  Sign up School →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
