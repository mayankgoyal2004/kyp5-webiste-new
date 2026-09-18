import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Zap,
  School,
  Award,
  ArrowRight,
  ShieldCheck,
  Users,
  Sparkles,
  HelpCircle,
  BarChart3,
  FileSpreadsheet,
  Share2,
  ChevronDown
} from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import publicApi from "../api/publicApi";

export default function Pricing() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState("ANNUAL"); // "MONTHLY" | "ANNUAL"
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const res = await publicApi.getPricingPlans();
        if (res && res.data && res.data.length > 0) {
          setPlans(res.data);
        } else {
          setPlans(DEFAULT_PLANS);
        }
      } catch (err) {
        setPlans(DEFAULT_PLANS);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const DEFAULT_PLANS = [
    {
      id: "plan-bronze",
      code: "BRONZE",
      name: "Bronze Starter",
      badgeText: "Coaching & Institutes",
      description: "Ideal for tuition centers and coaching institutes conducting pilot career drives.",
      priceMonthly: 1999,
      priceAnnual: 19990,
      maxStudents: 100,
      features: [
        "Up to 100 Student Assessments / Year",
        "Stream Identifier & Holland RIASEC Battery",
        "Instant Student PDF Career Reports",
        "Unique Institution Referral Code for Students",
        "Basic Student Roster & Completion Tracking",
        "Standard Email Support",
      ],
      isFeatured: false,
    },
    {
      id: "plan-silver",
      code: "SILVER",
      name: "Silver Standard",
      badgeText: "Most Popular for Schools",
      description: "Designed for standard schools and academies managing grades 8 through 12.",
      priceMonthly: 4999,
      priceAnnual: 49990,
      maxStudents: 500,
      features: [
        "Up to 500 Student Assessment Licenses",
        "All Psychometric & Career Stream Assessments",
        "Full 15-Page Career & Personality Reports",
        "School Co-Branded PDF Reports with Logo",
        "Batch CSV Student Roster & Invitation Links",
        "Counselor Session Notes & Recommendation Logger",
        "Priority Support & Onboarding Assistance",
      ],
      isFeatured: true,
    },
    {
      id: "plan-gold",
      code: "GOLD",
      name: "Gold Institutional",
      badgeText: "Pro Educational Group",
      description: "Built for large multi-section schools and educational societies.",
      priceMonthly: 12999,
      priceAnnual: 119990,
      maxStudents: 2000,
      features: [
        "Up to 2,000 Student Assessment Licenses",
        "Complete Aptitude, RIASEC, EQ & Stream Batteries",
        "Institutional White-Labeling on Student Dashboards",
        "Class & Section-Wise Performance Comparative Analytics",
        "Parent-Teacher Meeting (PTM) Presentation Slides",
        "Dedicated Senior Career Psychologist Support",
        "Custom Assessment Campaign Scheduling",
      ],
      isFeatured: false,
    },
    {
      id: "plan-enterprise",
      code: "ENTERPRISE",
      name: "Enterprise Custom",
      badgeText: "Universities & Districts",
      description: "Tailored multi-campus governance for universities, school groups & government bodies.",
      priceMonthly: 29999,
      priceAnnual: 299990,
      maxStudents: 10000,
      features: [
        "10,000+ Unlimited Student Assessment Seats",
        "Custom Psychometric Battery Tailoring & Localizations",
        "Full Subdomain & Multi-Branch Hierarchy Management",
        "Direct LMS & ERP API Integration Webhooks",
        "Dedicated Account Director & On-Campus Workshops",
        "24/7 SLA Guarantee & Dedicated Phone Support",
      ],
      isFeatured: false,
    },
  ];

  const faqs = [
    {
      q: "How does the School Referral Code work for students?",
      a: "Once your school subscribes, you receive a unique Referral Code (e.g. DPS-NOIDA-2026) and a direct link. You can share this link on your student WhatsApp groups or school notice boards. Students who sign up through your link are automatically enrolled into your school's quota without needing individual payment."
    },
    {
      q: "Can we add more student seats later if our batch exceeds the plan limit?",
      a: "Yes, absolutely! You can upgrade your tier at any time from the School Dashboard, or purchase supplementary student seat packs at discounted institutional rates."
    },
    {
      q: "Do student reports include our school name and logo?",
      a: "Yes! For Silver, Gold, and Enterprise tiers, every student's 15-page diagnostic career report is automatically branded with your school's official logo, name, and counselor signature block."
    },
    {
      q: "Are the psychometric assessments scientifically validated?",
      a: "KYP5 batteries are developed and standardized by certified organizational and career psychologists based on John Holland's RIASEC vocational framework, aptitude standards, and Indian curriculum stream selections."
    },
    {
      q: "Can we get official purchase orders or invoices?",
      a: "Yes! Your account generates comprehensive digital receipts and invoices upon payment confirmation."
    }
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header & Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
          <School className="w-3.5 h-3.5" />
          <span>Institutional Packages & Pricing</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Empower Your Students with <span className="text-indigo-600">Scientific Career Guidance</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Select an institutional plan tailored to your student cohort size. Conduct seamless stream selection drives, co-brand 15-page student reports, and track real-time analytics.
        </p>

        {/* Billing Switcher */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setBillingCycle("MONTHLY")}
            className={
              "px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer " +
              (billingCycle === "MONTHLY"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Monthly Billing
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("ANNUAL")}
            className={
              "px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all relative cursor-pointer " +
              (billingCycle === "ANNUAL"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            <span>Annual Billing</span>
            <span className="ml-2 bg-emerald-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(plans.length > 0 ? plans : DEFAULT_PLANS).map((plan) => {
          const isAnnual = billingCycle === "ANNUAL";
          const displayPrice = isAnnual
            ? (plan.priceAnnual || plan.priceMonthly * 10)
            : (plan.priceMonthly || 4999);

          return (
            <div
              key={plan.code || plan.id}
              className={
                "rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between relative " +
                (plan.isFeatured
                  ? "bg-slate-900 text-white border-indigo-500 shadow-2xl ring-2 ring-indigo-500/40"
                  : "bg-white text-slate-800 border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1")
              }
            >
              {plan.badgeText && (
                <span
                  className={
                    "absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm " +
                    (plan.isFeatured
                      ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white"
                      : "bg-indigo-50 text-indigo-700 border border-indigo-200")
                  }
                >
                  {plan.badgeText}
                </span>
              )}

              <div className="space-y-4">
                <div className="pt-2">
                  <h3 className="text-xl font-black">{plan.name}</h3>
                  <p className={"text-xs mt-1 line-clamp-2 " + (plan.isFeatured ? "text-slate-400" : "text-slate-500")}>
                    {plan.description || "Comprehensive psychometric evaluation and school management package."}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100/10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-black">
                      {"₹"}{Number(displayPrice).toLocaleString("en-IN")}
                    </span>
                    <span className={"text-xs font-semibold " + (plan.isFeatured ? "text-slate-400" : "text-slate-500")}>
                      /{isAnnual ? "year" : "month"}
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-indigo-400 mt-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>Up to {plan.maxStudents || 500} Student Seats</span>
                  </div>
                </div>

                <div className={"pt-4 border-t space-y-2.5 " + (plan.isFeatured ? "border-slate-800" : "border-slate-100")}>
                  {(Array.isArray(plan.features) ? plan.features : []).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className={plan.isFeatured ? "text-slate-300" : "text-slate-700"}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4">
                <button
                  type="button"
                  onClick={() => navigate("/institution/register?plan=" + (plan.code || "SILVER") + "&billing=" + billingCycle)}
                  className={
                    "w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer " +
                    (plan.isFeatured
                      ? "btn-primary shadow-lg shadow-indigo-600/30"
                      : "btn-outline border-slate-300 hover:border-indigo-600 hover:text-indigo-600")
                  }
                >
                  <span>Get Started for School</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Institutional Workflow Steps */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            4-Step Institutional Onboarding
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Get your school running psychometric assessments in less than 5 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 font-black flex items-center justify-center text-sm">
              01
            </div>
            <h4 className="font-bold text-sm text-white">Register School</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Fill in your school details, choose your student seat capacity, and complete instant setup.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 font-black flex items-center justify-center text-sm">
              02
            </div>
            <h4 className="font-bold text-sm text-white">Get Referral Code</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Instantly receive your custom School Code & One-Click Registration Link for your students.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center text-sm">
              03
            </div>
            <h4 className="font-bold text-sm text-white">Share with Students</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Share via WhatsApp, SMS, or School Portal. Students take their tests smoothly from any device.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 font-black flex items-center justify-center text-sm">
              04
            </div>
            <h4 className="font-bold text-sm text-white">Live School Roster</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Track submissions live, download 15-page branded PDF reports, and organize counselor sessions.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Got Questions About School Licenses?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Everything you need to know about billing, quotas, student access, and reporting.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-4.5 flex items-center justify-between gap-4 font-bold text-sm text-slate-800 hover:text-indigo-600 cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={
                      "w-4 h-4 text-slate-400 transition-transform " +
                      (isOpen ? "rotate-180 text-indigo-600" : "")
                    }
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
