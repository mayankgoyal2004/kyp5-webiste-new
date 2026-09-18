import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  School,
  CheckCircle2,
  Copy,
  Share2,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Building2,
  Users,
  MessageCircle,
  Mail,
  ArrowRight,
  ExternalLink,
  Info
} from "lucide-react";
import toast from "react-hot-toast";
import publicApi from "../api/publicApi";
import SectionHeading from "../components/common/SectionHeading";

export default function InstitutionRegister() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialPlan = searchParams.get("plan") || "SILVER";
  const initialBilling = searchParams.get("billing") || "ANNUAL";

  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    institutionType: "SCHOOL", // SCHOOL | COLLEGE | COACHING | NGO
    planCode: initialPlan,
    billingCycle: initialBilling,
    customReferralCode: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [registeredResult, setRegisteredResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Plan pricing metadata
  const planDetails = {
    BRONZE: {
      name: "Bronze Starter",
      monthly: 1999,
      annual: 19990,
      seats: 100,
      badge: "Coaching & Institutes",
    },
    SILVER: {
      name: "Silver Standard",
      monthly: 4999,
      annual: 49990,
      seats: 500,
      badge: "Most Popular",
    },
    GOLD: {
      name: "Gold Institutional",
      monthly: 12999,
      annual: 119990,
      seats: 2000,
      badge: "Educational Group",
    },
    ENTERPRISE: {
      name: "Enterprise Custom",
      monthly: 29999,
      annual: 299990,
      seats: 10000,
      badge: "Multi-Campus",
    },
  };

  const currentPlan = planDetails[formData.planCode] || planDetails.SILVER;
  const isAnnual = formData.billingCycle === "ANNUAL";
  const planPrice = isAnnual ? currentPlan.annual : currentPlan.monthly;

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all mandatory fields.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
        address: formData.address,
        planCode: formData.planCode,
        customReferralCode: formData.customReferralCode ? formData.customReferralCode.trim().toUpperCase() : undefined,
      };

      const res = await publicApi.registerInstitution(payload);

      if (res && res.data) {
        toast.success("School account registered & package activated successfully!");
        setRegisteredResult(res.data);
      } else {
        toast.error("Registration completed, but failed to retrieve credentials.");
      }
    } catch (err) {
      toast.error(err.message || "Institution registration failed. Please check if email or code is already in use.");
    } finally {
      setSubmitting(false);
    }
  };

  const getStudentShareUrl = () => {
    if (!registeredResult?.institution?.referralCode) return "";
    const origin = window.location.origin;
    return origin + "/register ? ref=" + registeredResult.institution.referralCode;
  };

  const handleCopyLink = () => {
    const url = getStudentShareUrl();
    if (url) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Referral link copied to clipboard!");
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleWhatsAppShare = () => {
    const code = registeredResult?.institution?.referralCode || "";
    const schoolName = registeredResult?.institution?.name || "Our School";
    const url = getStudentShareUrl();
    const text = encodeURIComponent(
      "Dear Students & Parents,\n\n" +
      schoolName + " has partnered with KYP5 to offer scientific Psychometric & Career Stream Assessment.\n\n" +
      "Please register and complete your assessment using our school link:\n" +
      url + "\n\n" +
      "School Referral Code: " + code + "\n\n" +
      "All the best for your career journey!"
    );
    window.open("https://api.whatsapp.com/send ? text=" + text, "_blank");
  };

  const handleEmailShare = () => {
    const code = registeredResult?.institution?.referralCode || "";
    const schoolName = registeredResult?.institution?.name || "Our School";
    const url = getStudentShareUrl();
    const subject = encodeURIComponent("KYP5 Career Assessment Invitation - " + schoolName);
    const body = encodeURIComponent(
      "Dear Students,\n\n" +
      schoolName + " invites you to take your certified Psychometric & Career Stream Assessment.\n\n" +
      "Click the link below to sign up under our school quota:\n" +
      url + "\n\n" +
      "School Referral Code: " + code + "\n\n" +
      "Regards,\nPrincipal & Counseling Team"
    );
    window.location.href = "mailto: • subject=" + subject + "&body=" + body;
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHeading
        badge="School & Partner Onboarding"
        title="Register Your Institution & Buy Assessment Package"
        subtitle="Subscribe in 2 minutes, get your unique Referral Code, and enable seamless student test participation."
      />

      {registeredResult ? (
        /* Success & Share Dashboard */
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border-2 border-emerald-500/40 shadow-2xl space-y-8 animate-in fade-in zoom-in-95 duration-300">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <span className="inline-block text-xs font-black uppercase tracking-wider px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
              Registration & Subscription Activated
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Welcome, {registeredResult.institution?.name}!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
              Your institutional package is live with <strong>{registeredResult.subscription?.seatLimit || currentPlan.seats} licensed student seats</strong>.
            </p>
          </div>

          {/* Referral Code & Share Link Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-xl border border-slate-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-700 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                  Your Unique School Code
                </span>
                <div className="text-2xl sm:text-3xl font-mono font-black tracking-wider text-white mt-0.5">
                  {registeredResult.institution?.referralCode}
                </div>
              </div>
              <div className="text-right sm:text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400">Package Tier</span>
                <div className="text-sm font-extrabold text-cyan-300">
                  {registeredResult.subscription?.planName || currentPlan.name}
                </div>
              </div>
            </div>

            {/* Direct Student URL Box */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Direct Student Registration Link (Auto-Applies Code)</span>
              </label>
              <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-700 rounded-2xl p-2 pl-4">
                <input
                  type="text"
                  readOnly
                  value={getStudentShareUrl()}
                  className="w-full bg-transparent text-xs font-mono text-cyan-200 focus:outline-none select-all"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs shrink-0 flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? "Copied!" : "Copy Link"}</span>
                </button>
              </div>
            </div>            {/* Instant Share Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs transition-all cursor-pointer shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleEmailShare}
                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl text-xs transition-all cursor-pointer shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Share via Email</span>
              </button>
            </div>
          </div>

          {/* Quick Guidance Box */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 text-xs text-indigo-950 space-y-2">
            <h4 className="font-bold flex items-center gap-2 text-indigo-950">
              <Info className="w-4 h-4 text-indigo-600" />
              <span>What happens next?</span>
            </h4>
            <ul className="space-y-1 text-slate-700 pl-6 list-disc">
              <li>When students click your link, they are automatically connected to <strong>{registeredResult.institution?.name}</strong>.</li>
              <li>Students take the psychometric assessment without needing individual payments.</li>
              <li>You can log in to view student submissions, download class reports, and organize counselor sessions.</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <Link
              to="/login"
              className="btn-primary w-full sm:w-auto"
            >
              <span>Login to Institution Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={() => {
                setRegisteredResult(null);
                navigate("/pricing");
              }}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              Register Another Campus / View Plans
            </button>
          </div>
        </div>
      ) : (
        /* Registration & Checkout Form */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Side */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                School Registration & Setup
              </h2>
              <p className="text-xs text-slate-500">
                Enter your official school credentials to create your counselor workspace.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              {/* Institution Details */}
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-indigo-700 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>1. Institution Information</span>
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    School / Institution Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Delhi Public School, Noida"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Institution Type
                    </label>
                    <select
                      value={formData.institutionType}
                      onChange={(e) => setFormData({ ...formData, institutionType: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
                    >
                      <option value="SCHOOL">K-12 School (CBSE / ICSE / IB)</option>
                      <option value="COLLEGE">Junior College / High School</option>
                      <option value="COACHING">Coaching & Tuition Institute</option>
                      <option value="NGO">Educational Trust / NGO</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      City / Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Noida, Uttar Pradesh"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    />
                  </div>
                </div>
              </div>

              {/* Admin Account Credentials */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-indigo-700 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>2. Administrator & Login Credentials</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Official Admin Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="principal@dpsnoida.edu.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Official Phone / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Admin Portal Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Min 6 characters"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Custom Referral Code (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. DPSNOIDA2026"
                      value={formData.customReferralCode}
                      onChange={(e) => setFormData({ ...formData, customReferralCode: e.target.value.toUpperCase() })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono uppercase text-slate-800 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    />
                  </div>
                </div>
              </div>

              {/* Package Selection */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-indigo-700 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span>3. Package & Billing Details</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.entries(planDetails).map(([code, p]) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setFormData({ ...formData, planCode: code })}
                      className={"p-3 rounded-2xl border text-left transition-all cursor-pointer " + (
                        formData.planCode === code ? "border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-600/30" : "border-slate-200 bg-white hover:border-slate-300"
                      )}
                    >
                      <div className="text-xs font-black text-slate-800">{p.name.split(" ")[0]}</div>
                      <div className="text-[10px] text-slate-500">{p.seats} Seats</div>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, billingCycle: "MONTHLY" })}
                    className={"flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer " + (
                      formData.billingCycle === "MONTHLY" ? "bg-indigo-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    )}
                  >
                    Monthly Billing
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, billingCycle: "ANNUAL" })}
                    className={"flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer " + (
                      formData.billingCycle === "ANNUAL" ? "bg-indigo-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    )}
                  >
                    Annual (Save 20%)
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full text-xs sm:text-sm py-4"
              >
                {submitting ? (
                  <span>Processing Institution Registration...</span>
                ) : (
                  <>
                    <span>Confirm Registration & Activate Referral Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Summary Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl space-y-6">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400">
                  Order Breakdown
                </span>
                <h3 className="text-xl font-black mt-0.5">{currentPlan.name}</h3>
                <p className="text-xs text-slate-400">
                  {currentPlan.badge} {" · "} {currentPlan.seats} Student Quota
                </p>
              </div>

              <div className="space-y-3 border-t border-slate-800 pt-4 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Package Duration</span>
                  <span className="font-bold text-white">{isAnnual ? "Annual License" : "Monthly License"}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Student Seat Quota</span>
                  <span className="font-bold text-white">{currentPlan.seats} Students</span>
                </div>
                <div className="border-t border-slate-800 pt-3 flex justify-between text-sm font-black">
                  <span>Total Amount</span>
                  <span className="text-indigo-400 text-xl font-black">
                    {"₹"}{Number(planPrice).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="bg-slate-800/80 rounded-2xl p-4 space-y-2 border border-slate-700/60 text-xs">
                <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Institutional Benefits Included:</span>
                </div>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Instant Custom Referral Code & WhatsApp Share Link</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Co-branded 15-page diagnostic reports with School Logo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Counselor session logs & student stream analytics</span>
                  </li>
                </ul>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>256-bit Encrypted Transaction {" · "} Instant Workspace Setup</span>
              </div>
            </div>

            {/* Assistance Box */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
              <h4 className="font-bold text-xs text-slate-900">Need Custom Purchase Order or MOUs?</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                If your institution requires official Purchase Orders, Bank NEFT/RTGS, or multi-branch quotations, our counseling directors are ready to assist.
              </p>
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:underline"
              >
                <span>Talk to Institutional Coordinator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
