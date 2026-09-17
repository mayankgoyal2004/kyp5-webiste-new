import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopBar from "../components/common/TopBar";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Modal from "../components/common/Modal";
import { Download, CheckCircle, Compass, BarChart3, FileText } from "lucide-react";

export default function MainLayout() {
  const { pathname } = useLocation();
  const [sampleReportModalOpen, setSampleReportModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800">
      <TopBar />
      <Navbar />

      <main className="flex-1">
        <Outlet context={{ openSampleReport: () => setSampleReportModalOpen(true) }} />
      </main>

      <Footer />

      {/* Global Sample Report Modal */}
      <Modal
        isOpen={sampleReportModalOpen}
        onClose={() => setSampleReportModalOpen(false)}
        title="Sample Psychometric Report Preview"
        maxWidth="max-w-3xl"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4 bg-sky-50 p-4 rounded-2xl border border-sky-200">
            <div className="w-12 h-12 rounded-xl bg-cyan-600 text-white flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-[#0f172a]">
                KYP5 Standard Assessment Battery (15-Page Certified PDF)
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Includes RIASEC Personality Code, Gardner Intelligences, Aptitude Breakdown, Subject Stream Recommendations, and 4-Year Action Plan.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-cyan-600" />
                <span>Holland RIASEC Profiler</span>
              </div>
              <p className="text-slate-500">
                Detailed radar graph and percentile mapping for Realistic, Investigative, Artistic, Social, Enterprising, and Conventional traits.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-amber-600" />
                <span>Stream & Career Fit Index</span>
              </div>
              <p className="text-slate-500">
                Quantitative suitability score matching Science, Commerce, and Humanities streams with 900+ occupational codes.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => setSampleReportModalOpen(false)}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
            <a
              href="/assets/images/common-kyp5.jpg"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#0288d1] hover:bg-[#0277bd] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Full Sample PDF</span>
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
}
