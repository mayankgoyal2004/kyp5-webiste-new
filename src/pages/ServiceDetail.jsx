import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Calendar, Phone, Mail, HelpCircle, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import publicApi from "../api/publicApi";
import { extractItemData } from "../utils/dataHelper";
import RichTextContent from "../components/common/RichTextContent";

export default function ServiceDetail() {
  const { title } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const res = await publicApi.getServiceBySlug(title);
        const data = extractItemData(res);
        if (data && (data.title || data.id)) {
          setService(data);
        } else {
          setService({
            title: decodeURIComponent(title || "Career Guidance Solution"),
            price: "Custom Package",
            briefIntro: "Comprehensive psychometric evaluation and career counseling designed for students and institutions.",
            aboutTitle: "About This Specialized Program",
            aboutDescription: "<p>Our team of clinical psychologists and career specialists conduct structured assessment batteries and one-on-one strategy sessions to ensure absolute clarity.</p><p>Students receive actionable guidance on entrance exams, vocational matches, and higher education degree mappings.</p>",
            workProcessTitle: "How the Process Works",
            workProcessSteps: [
              { title: "Stage 1: Psychometric Battery", desc: "Student completes online assessment measuring RIASEC traits and cognitive aptitude." },
              { title: "Stage 2: Algorithmic Synthesis", desc: "Automated scoring compares responses against validated occupational models." },
              { title: "Stage 3: 1-on-1 Guidance", desc: "Detailed discussion with certified counselor to finalize stream & target universities." },
            ],
            benefitsMainTitle: "Key Advantages",
            benefitsCards: [
              { title: "Eliminates Guesswork", desc: "Data-driven clarity based on psychological research rather than subjective bias." },
              { title: "Parent-Student Alignment", desc: "Brings families together with concrete reports and career prospect data." },
            ],
          });
        }
      } catch (e) {
        setService({
          title: decodeURIComponent(title || "Career Guidance Solution"),
          price: "Custom Package",
          briefIntro: "Comprehensive psychometric evaluation and career counseling designed for students and institutions.",
          aboutTitle: "About This Specialized Program",
          aboutDescription: "<p>Our team of clinical psychologists and career specialists conduct structured assessment batteries and one-on-one strategy sessions to ensure absolute clarity.</p><p>Students receive actionable guidance on entrance exams, vocational matches, and higher education degree mappings.</p>",
          workProcessTitle: "How the Process Works",
          workProcessSteps: [
            { title: "Stage 1: Psychometric Battery", desc: "Student completes online assessment measuring RIASEC traits and cognitive aptitude." },
            { title: "Stage 2: Algorithmic Synthesis", desc: "Automated scoring compares responses against validated occupational models." },
            { title: "Stage 3: 1-on-1 Guidance", desc: "Detailed discussion with certified counselor to finalize stream & target universities." },
          ],
          benefitsMainTitle: "Key Advantages",
          benefitsCards: [
            { title: "Eliminates Guesswork", desc: "Data-driven clarity based on psychological research rather than subjective bias." },
            { title: "Parent-Student Alignment", desc: "Brings families together with concrete reports and career prospect data." },
          ],
        });
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [title]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Link
        to="/services"
        className="inline-flex items-center gap-2 text-xs font-extrabold text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Services</span>
      </Link>

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
        <div className="space-y-3 border-b border-slate-100 pb-6">
          <span className="text-[11px] font-black text-indigo-600 uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
            {service?.price || "Professional Guidance"}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
            {service?.title}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            {service?.briefIntro || service?.description}
          </p>
        </div>

        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-slate-900">
            {service?.aboutTitle || "Program Overview"}
          </h3>
          <RichTextContent content={service?.aboutDescription || service?.description} />
        </div>

        {/* Process Steps */}
        {service?.workProcessSteps && service.workProcessSteps.length > 0 && (
          <div className="space-y-6 pt-4 border-t border-slate-100">
            <h3 className="text-lg font-black text-slate-900">
              {service?.workProcessTitle || "How It Works"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.workProcessSteps.map((step, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                    0{idx + 1}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc || step.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Banner */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950 p-6 rounded-2xl text-white">
          <div>
            <h4 className="text-base font-bold text-white">Need Customized Counseling?</h4>
            <p className="text-xs text-slate-400 mt-0.5">Speak with a certified psychologist and career mentor today.</p>
          </div>
          <Link
            to="/contact-us"
            className="btn-primary text-xs py-2.5 px-6 whitespace-nowrap"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
