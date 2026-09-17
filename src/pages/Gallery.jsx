import React, { useEffect, useState } from "react";
import SectionHeading from "../components/common/SectionHeading";
import publicApi from "../api/publicApi";
import { extractListData, resolveImageUrl } from "../utils/dataHelper";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const res = await publicApi.getGallery();
        const list = extractListData(res);
        if (list && list.length > 0) {
          setGallery(list);
        } else {
          setGallery([
            { id: "1", title: "School Career Workshop Drive", category: "Drives", image: "/assets/images/about/01.jpg" },
            { id: "2", title: "Psychometric Testing Lab Session", category: "Testing", image: "/assets/images/about/02.jpg" },
            { id: "3", title: "Principal & Counselor Round Table", category: "Conferences", image: "/assets/images/about/03.jpg" },
            { id: "4", title: "Student Guidance & Stream Orientation", category: "Drives", image: "/assets/images/course/01.jpg" },
            { id: "5", title: "Parent-Teacher Career Alignment", category: "Testing", image: "/assets/images/course/02.jpg" },
            { id: "6", title: "Certificate Distribution Ceremony", category: "Conferences", image: "/assets/images/course/03.jpg" },
          ]);
        }
      } catch (err) {
        console.warn("Using sample gallery", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const categories = ["ALL", "Drives", "Testing", "Conferences"];
  const filtered = filter === "ALL" ? gallery : gallery.filter((g) => g.category === filter);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <SectionHeading
        badge="Photo Gallery"
        title="Moments From Our Assessment Drives"
        subtitle="Visual highlights from school campuses, counselor seminars, and interactive career orientation drives across India."
      />

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === cat
                ? "bg-[#2995ac] text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="min-h-[250px] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#1b93ad] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => {
            const fallbackImg = `/assets/images/course/0${(idx % 3) + 1}.jpg`;
            const imgSrc = resolveImageUrl(item.image, fallbackImg);

            return (
              <div
                key={item.id || idx}
                className="group relative h-64 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-slate-100 border border-slate-200"
              >
                <img
                  src={imgSrc}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = fallbackImg;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-bold text-cyan-300 tracking-wider">
                    {item.category || "Campus Event"}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5 line-clamp-1">
                    {item.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
