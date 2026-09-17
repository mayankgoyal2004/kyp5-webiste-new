import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Calendar, Phone, Mail, HelpCircle, ArrowRight } from "lucide-react";
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
        <div className="w-10 h-10 border-4 border-[#1b93ad] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <Link
        to="/services"
        className="inline-flex items-center gap-2 text-xs font-bold text-[#1b93ad] hover:text-[#136e82]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Services</span>
      </Link>

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
        <div className="space-y-3 border-b border-slate-100 pb-6">
          <span className="text-xs font-black text-[#1b93ad] uppercase tracking-wider bg-cyan-50 px-3 py-1 rounded-full">
            {service?.price || "Professional Guidance"}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#0f172a] leading-tight">
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
                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#1b93ad] text-white flex items-center justify-center font-black text-xs">
                    0{idx + 1}
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">{step.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc || step.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Banner */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-[#1b93ad] p-6 rounded-2xl text-white">
          <div>
            <h4 className="text-base font-bold text-white">Need Customized Counseling?</h4>
            <p className="text-xs text-cyan-100 mt-0.5">Speak with a certified psychologist today.</p>
          </div>
          <Link
            to="/contact-us"
            className="bg-white text-slate-900 hover:bg-cyan-50 font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition-colors whitespace-nowrap"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
