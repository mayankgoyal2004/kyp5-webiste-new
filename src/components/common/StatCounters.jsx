import React, { useEffect, useState } from "react";
import { Users, School, Award, FileCheck2 } from "lucide-react";
import publicApi from "../../api/publicApi";

export default function StatCounters() {
  const [counters, setCounters] = useState([]);

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const res = await publicApi.getCounters();
        if (res && res.data && res.data.length > 0) {
          setCounters(res.data);
        } else {
          setCounters([
            { id: "1", label: "Students Assessed", value: 25000, icon: "users" },
            { id: "2", label: "Partner Schools & Institutes", value: 120, icon: "school" },
            { id: "3", label: "Certified Career Counselors", value: 45, icon: "award" },
            { id: "4", label: "Report Accuracy Rate", value: 98, icon: "trending-up" },
          ]);
        }
      } catch (err) {
        setCounters([
          { id: "1", label: "Students Assessed", value: 25000, icon: "users" },
          { id: "2", label: "Partner Schools & Institutes", value: 120, icon: "school" },
          { id: "3", label: "Certified Career Counselors", value: 45, icon: "award" },
          { id: "4", label: "Report Accuracy Rate", value: 98, icon: "trending-up" },
        ]);
      }
    };
    fetchCounters();
  }, []);

  const getIcon = (iconName, index) => {
    switch (index) {
      case 0:
        return <Users className="w-6 h-6 text-cyan-600" />;
      case 1:
        return <School className="w-6 h-6 text-amber-600" />;
      case 2:
        return <Award className="w-6 h-6 text-emerald-600" />;
      default:
        return <FileCheck2 className="w-6 h-6 text-indigo-600" />;
    }
  };

  return (
    <div className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-100">
        {counters.map((c, i) => (
          <div
            key={c.id || i}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors text-center sm:text-left"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-100/80 flex items-center justify-center shrink-0">
              {getIcon(c.icon, i)}
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
                {Number(c.value).toLocaleString()}{c.label?.includes("Rate") ? "%" : "+"}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
                {c.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
