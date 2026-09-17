import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Zap, School, Award, ArrowRight } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import publicApi from "../api/publicApi";

export default function Pricing() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await publicApi.getPricingPlans();
        if (res && res.data && res.data.length > 0) {
          setPlans(res.data);
        } else {
          setPlans([
            {
              id: "1",
              name: "Silver Standard",
              badgeText: "For Schools",
              priceMonthly: 4999,
              priceAnnual: 49990,
              maxStudents: 500,
              features: [
                "Up to 500 Student Assessment Accounts",
                "Full RIASEC & Aptitude PDF Reports",
                "Dedicated School Referral Code",
                "Counselor Session Logger",
                "Email Support",
              ],
              buttonText: "Enroll School",
              buttonLink: "/for-schools",
              isFeatured: false,
            },
            {
              id: "2",
              name: "Gold Institutional",
              badgeText: "Most Popular",
              priceMonthly: 9999,
              priceAnnual: 99990,
              maxStudents: 1500,
              features: [
                "Up to 1,500 Student Accounts",
                "Co-Branded 15-Page PDF Reports",
                "Aggregate Batch Analytics",
                "Parent-Teacher Meeting Slides",
                "Dedicated Senior Counselor Support",
              ],
              buttonText: "Enroll School",
              buttonLink: "/for-schools",
              isFeatured: true,
            },
            {
              id: "3",
              name: "Enterprise Custom",
              badgeText: "Multi-Campus",
              priceMonthly: 19999,
              priceAnnual: 199990,
              maxStudents: 5000,
              features: [
                "Unlimited Student Accounts",
                "Custom Psychometric Battery Tailoring",
                "On-Campus Counselor Workshop Drives",
                "API & LMS Integration",
                "24/7 Account Management",
              ],
              buttonText: "Contact Us",
              buttonLink: "/contact-us",
              isFeatured: false,
            },
          ]);
        }
      } catch (err) {
        setPlans([
          {
            id: "1",
            name: "Silver Standard",
            badgeText: "For Schools",
            priceMonthly: 4999,
            priceAnnual: 49990,
            maxStudents: 500,
            features: [
              "Up to 500 Student Assessment Accounts",
              "Full RIASEC & Aptitude PDF Reports",
              "Dedicated School Referral Code",
              "Counselor Session Logger",
              "Email Support",
            ],
            buttonText: "Enroll School",
            buttonLink: "/for-schools",
            isFeatured: false,
          },
          {
            id: "2",
            name: "Gold Institutional",
            badgeText: "Most Popular",
            priceMonthly: 9999,
            priceAnnual: 99990,
            maxStudents: 1500,
            features: [
              "Up to 1,500 Student Accounts",
              "Co-Branded 15-Page PDF Reports",
              "Aggregate Batch Analytics",
              "Parent-Teacher Meeting Slides",
              "Dedicated Senior Counselor Support",
            ],
            buttonText: "Enroll School",
            buttonLink: "/for-schools",
            isFeatured: true,
          },
          {
            id: "3",
            name: "Enterprise Custom",
            badgeText: "Multi-Campus",
            priceMonthly: 19999,
            priceAnnual: 199990,
            maxStudents: 5000,
            features: [
              "Unlimited Student Accounts",
              "Custom Psychometric Battery Tailoring",
              "On-Campus Counselor Workshop Drives",
              "API & LMS Integration",
              "24/7 Account Management",
            ],
            buttonText: "Contact Us",
            buttonLink: "/contact-us",
            isFeatured: false,
          },
        ]);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHeading
        badge="Institutional Pricing & Tiers"
        title="Predictable, Transparent Plans for Every School"
        subtitle="Scale scientific guidance across all classes with flexible per-batch or annual institutional licenses."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between relative ${
              plan.isFeatured
                ? "bg-slate-900 text-white border-cyan-500 shadow-2xl ring-2 ring-cyan-500/50"
                : "bg-white text-slate-800 border-slate-200/80 shadow-sm hover:shadow-xl"
            }`}
          >
            {plan.badgeText && (
              <span
                className={`absolute top-4 right-4 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${
                  plan.isFeatured
                    ? "bg-cyan-500 text-slate-950"
                    : "bg-cyan-50 text-cyan-700 border border-cyan-200"
                }`}
              >
                {plan.badgeText}
              </span>
            )}

            <div className="space-y-4">
              <h3 className="text-xl font-extrabold">{plan.name}</h3>

              <div className="pt-2">
                <span className="text-3xl sm:text-4xl font-black">
                  ₹{Number(plan.priceMonthly).toLocaleString()}
                </span>
                <span className={`text-xs font-semibold ${plan.isFeatured ? "text-slate-400" : "text-slate-500"}`}>
                  {" "}
                  / month (Annual billing)
                </span>
              </div>

              <div className="text-xs font-bold text-cyan-500">
                Up to {plan.maxStudents || 500} Student Assessments
              </div>

              <div className={`pt-6 border-t ${plan.isFeatured ? "border-slate-800" : "border-slate-100"} space-y-3`}>
                {(Array.isArray(plan.features) ? plan.features : []).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs font-medium">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <Link
                to={plan.buttonLink || "/for-schools"}
                className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                  plan.isFeatured
                    ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25"
                    : "bg-slate-900 hover:bg-slate-800 text-white"
                }`}
              >
                <span>{plan.buttonText || "Choose Plan"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
