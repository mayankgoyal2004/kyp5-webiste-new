import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  School,
  CheckCircle,
  Building,
  Users,
  ShieldCheck,
  FileSpreadsheet,
  ArrowRight,
  Sparkles,
  Send,
  HelpCircle,
  GraduationCap
} from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import publicApi from "../api/publicApi";
import toast from "react-hot-toast";

export default function ForSchools() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    planCode: "SILVER",
    customReferralCode: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [registeredResult, setRegisteredResult] = useState(null);

  const [verifyCode, setVerifyCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in institution name, owner email, and password.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await publicApi.registerInstitution(formData);
      if (res && res.data) {
        setRegisteredResult(res.data);
        toast.success("Institution registered successfully! Referral code generated.");
      }
    } catch (err) {
      toast.error(err.message || "Failed to register institution.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyReferral = async (e) => {
    e.preventDefault();
    if (!verifyCode.trim()) {
      toast.error("Please enter a referral code.");
      return;
    }

    try {
      setVerifying(true);
      const res = await publicApi.verifyReferralCode(verifyCode.trim());
      if (res && res.data && res.data.valid) {
        setVerifyResult(res.data.institution);
        toast.success(`Active School: ${res.data.institution.name}`);
      }
    } catch (err) {
      setVerifyResult(null);
      toast.error(err.message || "Invalid or inactive referral code.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 space-y-16">
      {/* Top Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0b3b60] to-[#0f172a] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-400/10 text-cyan-300 text-xs font-bold border border-cyan-400/20">
              <School className="w-4 h-4" />
              <span>Institutional Assessment Program</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Empower Every Student in Your School with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-300">
                Scientific Guidance
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Enable effortless batch-wide psychometric testing for Classes 8 through 12. Eliminate stream confusion, boost board exam confidence, and equip school counselors with actionable data.
            </p>
          </div>
        </div>
      </section>

      {/* Verification & Self-Service Registration Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Referral Code Verifier */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-[#0f172a]">
                Verify School Referral Code
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If your school or coaching institute provided you with a unique assessment code, enter it below to verify your student discount and institute mapping.
              </p>

              <form onSubmit={handleVerifyReferral} className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Referral Code:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DPS2026 or STMARYS"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value.toUpperCase())}
                    className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={verifying}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  {verifying ? "Verifying..." : "Verify Code"}
                </button>
              </form>

              {verifyResult && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs space-y-2 animate-in fade-in">
                  <div className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    <span>Active Partner School Verified!</span>
                  </div>
                  <div className="font-extrabold text-slate-800 text-sm">{verifyResult.name}</div>
                  <Link
                    to={`/register?ref=${verifyResult.referralCode}`}
                    className="inline-block mt-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs"
                  >
                    Take Test with {verifyResult.name} →
                  </Link>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
              Need assistance? Contact our school support team at <a href="mailto:schools@kyp5.com" className="text-cyan-600 font-bold underline">schools@kyp5.com</a>
            </div>
          </div>

          {/* Right: Onboard Institution Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider">
                Instant Self-Service Setup
              </span>
              <h3 className="text-2xl font-extrabold text-[#0f172a] mt-1">
                Register Your School / College
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Fill this form to create your institutional account and generate your custom student referral code instantly.
              </p>
            </div>

            {registeredResult ? (
              <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-6 text-xs space-y-4 animate-in fade-in">
                <div className="flex items-center gap-2 text-cyan-800 font-extrabold text-base">
                  <CheckCircle className="w-5 h-5 text-cyan-600" />
                  <span>Registration Successful!</span>
                </div>
                <p className="text-slate-700">
                  Your school workspace has been initialized. Share this unique link with your students:
                </p>
                <div className="bg-white p-3 rounded-xl border border-cyan-200 font-mono font-bold text-cyan-800 break-all select-all">
                  {registeredResult.institution?.referralUrl}
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <span className="font-bold text-slate-700">School Code:</span>
                  <span className="bg-cyan-600 text-white font-mono font-bold px-3 py-1 rounded-lg text-xs">
                    {registeredResult.institution?.referralCode}
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      School / Institution Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. St. Peter's International School"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Administrator / Principal Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="principal@school.edu.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Contact Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Admin Portal Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Custom Referral Code (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. STMARYS2026"
                      value={formData.customReferralCode}
                      onChange={(e) => setFormData({ ...formData, customReferralCode: e.target.value.toUpperCase() })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 uppercase font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Initial Plan Tier
                    </label>
                    <select
                      value={formData.planCode}
                      onChange={(e) => setFormData({ ...formData, planCode: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="SILVER">Silver Standard Plan (Up to 500 Students)</option>
                      <option value="GOLD">Gold Premium Plan (Up to 1,500 Students)</option>
                      <option value="ENTERPRISE">Enterprise Custom Package</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#0288d1] hover:bg-[#0277bd] text-white font-bold py-3.5 rounded-2xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  {submitting ? "Registering Institution..." : "Complete Institution Registration →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Institutional Key Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Why Top Schools Partner With KYP5"
          title="Designed for Principal & Counselor Workflows"
          subtitle="Everything your school needs to conduct seamless aptitude & stream selection drives."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Effortless Batch Testing</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No software installations needed. Students take the test on computer labs, tablets, or smartphones with instant auto-save and zero server downtime.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Counselor Log Integration</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              School counselors can record session notes, log recommended streams, and maintain longitudinal progress records for Parent-Teacher Meets.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Co-Branded PDF Reports</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Each student receives an accredited 15-page career report featuring your school's logo and counselor remarks for premium institutional presentation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
