import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass, Users, School, Brain, Briefcase, GraduationCap } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import publicApi from "../../api/publicApi";
import { extractListData, resolveImageUrl } from "../../utils/dataHelper";

export default function ServicesGrid() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultServices = [
    {
      id: "career-counseling",
      title: "One-on-One Career Guidance",
      description: "Personalized psychometric debriefing sessions with certified career psychologists to navigate subject selection and college admissions.",
      icon: Compass,
    },
    {
      id: "school-stream-selection",
      title: "School Stream Selection Drives",
      description: "End-to-end testing battery for Class 8 to 10 students with detailed parent counseling workshops and institution-wide analytics.",
      icon: School,
    },
    {
      id: "multiple-intelligence-profiling",
      title: "Multiple Intelligence Mapping",
      description: "Identify linguistic, logical, spatial, kinesthetic, musical, and interpersonal strengths to customize learning methodologies.",
      icon: Brain,
    },
    {
      id: "parent-career-guidance",
      title: "Parent & Family Career Alignment",
      description: "Guided strategy workshops to bridge student aspirations with parental expectations based on objective psychological data.",
      icon: Users,
    },
    {
      id: "study-abroad-advisory",
      title: "Higher Education & College Profiling",
      description: "Match student psychometric indicators with premier Indian and international university degrees, scholarships, and careers.",
      icon: GraduationCap,
    },
    {
      id: "counselor-training-workshops",
      title: "Educator & Counselor Certification",
      description: "Train teachers and institutional counselors to interpret psychometric dossiers and provide scientific guidance.",
      icon: Users,
    },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await publicApi.getServices();
        const list = extractListData(res);
        if (list && list.length > 0) {
          setServices(list);
        } else {
          setServices(defaultServices);
        }
      } catch (err) {
        setServices(defaultServices);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="container-page">
        <SectionHeading
          badge="Guidance & Assessment"
          title="Our Specialized Services"
          subtitle="Comprehensive psychometric solutions designed to support students, parents, educators, and schools at every milestone."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => {
            const Icon = srv.icon || Compass;
            const targetUrl = "/service-details/" + encodeURIComponent(srv.title || srv.slug || srv.id || idx);

            return (
              <div
                key={srv.id || idx}
                className="card p-7 sm:p-8 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {srv.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <Link
                    to={targetUrl}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="btn-outline text-sm px-6 py-3"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
