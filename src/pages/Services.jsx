import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Compass, UserCheck, Building, GraduationCap, Award, ArrowRight } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import publicApi from "../api/publicApi";
import { extractListData } from "../utils/dataHelper";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await publicApi.getServices();
        const list = extractListData(res);
        if (list && list.length > 0) {
          setServices(list);
        } else {
          setServices([
            {
              id: "1",
              title: "One-on-One Career Counseling",
              price: "Expert Mentorship",
              briefIntro:
                "Dedicated sessions with registered psychometricians to interpret your report and finalize subject streams.",
            },
            {
              id: "2",
              title: "Institutional School Assessment Drives",
              price: "Campus Package",
              briefIntro:
                "End-to-end on-campus psychometric assessments for batches from Class 8 to 12 with counselor support.",
            },
            {
              id: "3",
              title: "College Major & Vocational Mapping",
              price: "Higher Education",
              briefIntro:
                "Advanced vocational guidance matching higher education degrees and emerging international college programs.",
            },
          ]);
        }
      } catch (err) {
        console.warn("Using sample services", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHeading
        badge="Psychometric Services"
        title="Comprehensive Career Solutions"
        subtitle="Empowering students, parents, and academic institutions with scientific diagnostics and personalized counseling."
      />

      {loading ? (
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#1b93ad] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={service.id || idx}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-[#1b93ad] flex items-center justify-center group-hover:bg-[#1b93ad] group-hover:text-white transition-colors">
                  <Compass className="w-6 h-6" />
                </div>

                <div className="text-xs font-black text-[#1b93ad] uppercase tracking-wider">
                  {service.price || "Professional Guidance"}
                </div>

                <h3 className="text-lg font-extrabold text-[#0f172a] group-hover:text-[#1b93ad] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {service.briefIntro || service.description || "Holistic career testing and counseling."}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                <Link
                  to={`/services/${service.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1b93ad] hover:text-[#136e82]"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
