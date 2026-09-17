import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HelpCircle, ChevronDown } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import publicApi from "../api/publicApi";
import { extractListData } from "../utils/dataHelper";
import RichTextContent from "../components/common/RichTextContent";

export default function HelpCenter() {
  const [guides, setGuides] = useState([]);
  const [openIndex, setOpenIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        const res = await publicApi.getHelpCenterGuides();
        const list = extractListData(res);
        if (list && list.length > 0) {
          setGuides(list);
        } else {
          setGuides([
            {
              id: "1",
              title: "How does the KYP5 psychometric scoring algorithm work?",
              description:
                "<p>KYP5 evaluates responses using the <strong>Holland RIASEC hexagram</strong> and Gardner's multiple intelligences model. Raw answers are normalized against verified Indian student distributions to compute your 3-letter profile and match it to 900+ careers.</p>",
            },
            {
              id: "2",
              title: "Can I switch the test language while taking the exam?",
              description:
                "<p>Yes! You can toggle between <strong>English, Punjabi, and Hindi</strong> on-the-fly using the language switcher at the top right of the examination screen without losing your progress.</p>",
            },
            {
              id: "3",
              title: "What happens if my internet disconnects during the test?",
              description:
                "<p>Our testing engine auto-saves each question response to our cloud backend in real time. Once your internet reconnects, you can resume exactly from your remaining time.</p>",
            },
            {
              id: "4",
              title: "How can schools and institutions conduct batch testing?",
              description:
                "<p>Institutions can register for a school partner account to receive customized access codes, track classroom progress via an educator dashboard, and generate consolidated institutional reports.</p>",
            },
            {
              id: "5",
              title: "Is the generated PDF assessment report valid for career counselors?",
              description:
                "<p>Yes, KYP5 certified PDF reports follow standard psychometric norms and are widely recognized by career counselors, universities, and educational psychologists across India.</p>",
            },
          ]);
        }
      } catch (err) {
        console.warn("Using default FAQ guides", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
  }, []);

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHeading
        badge="Knowledge Base & FAQ"
        title="Help Center & Student Guides"
        subtitle="Find instant answers to testing procedures, scoring metrics, report generation, and student accounts."
      />

      {loading ? (
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#1b93ad] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {guides.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.id || index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-slate-800 text-xs sm:text-sm hover:text-[#1b93ad] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[#1b93ad] shrink-0" />
                    <span>{item.title}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#1b93ad]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 border-t border-slate-100 bg-slate-50/50">
                    <div className="pt-3">
                      <RichTextContent content={item.description} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Support Box */}
      <div className="bg-gradient-to-r from-slate-900 to-[#1b93ad] rounded-3xl p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-white">Still have questions?</h3>
          <p className="text-xs text-cyan-100 mt-1">
            Our expert counselor support desk is ready to assist you.
          </p>
        </div>
        <Link
          to="/contact-us"
          className="bg-white hover:bg-cyan-50 text-slate-900 font-bold px-6 py-3 rounded-xl text-xs shadow-md transition-colors whitespace-nowrap"
        >
          Contact Support Desk
        </Link>
      </div>
    </div>
  );
}
