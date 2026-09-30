import React, { useEffect, useState, useMemo } from "react";
import SectionHeading from "../components/common/SectionHeading";
import publicApi from "../api/publicApi";
import { extractListData, resolveImageUrl } from "../utils/dataHelper";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [categories, setCategories] = useState(["ALL"]);
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
          
          // Extract dynamic categories from API response or distinct list items
          const serverCats = Array.isArray(res?.categories) ? res.categories.filter(Boolean) : [];
          const itemCats = Array.from(new Set(list.map((g) => g.category).filter(Boolean)));
          const combinedCats = Array.from(new Set([...serverCats, ...itemCats]));
          
          if (combinedCats.length > 0) {
            setCategories(["ALL", ...combinedCats]);
          } else {
            setCategories(["ALL"]);
          }
        } else {
          const sampleList = [
            { id: "1", title: "School Career Workshop Drive", category: "Drives", image: "/assets/images/about/01.jpg" },
            { id: "2", title: "Psychometric Testing Lab Session", category: "Testing", image: "/assets/images/about/02.jpg" },
            { id: "3", title: "Principal & Counselor Round Table", category: "Conferences", image: "/assets/images/about/03.jpg" },
            { id: "4", title: "Student Guidance & Stream Orientation", category: "Drives", image: "/assets/images/course/01.jpg" },
            { id: "5", title: "Parent-Teacher Career Alignment", category: "Testing", image: "/assets/images/course/02.jpg" },
            { id: "6", title: "Certificate Distribution Ceremony", category: "Conferences", image: "/assets/images/course/03.jpg" },
          ];
          setGallery(sampleList);
          setCategories(["ALL", "Drives", "Testing", "Conferences"]);
        }
      } catch (err) {
        console.warn("Using sample gallery", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filtered = useMemo(() => {
    if (filter === "ALL") return gallery;
    return gallery.filter((g) => g.category?.toLowerCase() === filter.toLowerCase());
  }, [gallery, filter]);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <SectionHeading
        badge="Photo Gallery"
        title="Moments From Our Assessment Drives"
        subtitle="Visual highlights from school campuses, counselor seminars, and interactive career orientation drives across India."
      />

      {/* Dynamic Filter Tabs */}
      {categories.length > 1 && (
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => {
            const isActive = filter.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {loading ? (
        <div className="min-h-[250px] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-2">
          <p className="text-slate-600 text-sm font-semibold">No images found for "{filter}".</p>
          <button
            onClick={() => setFilter("ALL")}
            className="text-indigo-600 hover:text-indigo-800 text-xs font-bold underline cursor-pointer"
          >
            View All Photos
          </button>
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  {item.category && (
                    <span className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">
                      {item.category}
                    </span>
                  )}
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
