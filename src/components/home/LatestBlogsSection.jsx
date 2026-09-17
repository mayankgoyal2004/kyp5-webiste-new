import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import publicApi from "../../api/publicApi";
import { extractListData, resolveImageUrl } from "../../utils/dataHelper";

export default function LatestBlogsSection() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await publicApi.getBlogs({ limit: 3 });
        const list = extractListData(res);
        if (list && list.length > 0) {
          setBlogs(list.slice(0, 3));
        } else {
          setBlogs([
            {
              id: "1",
              title: "How to Choose the Right Stream After Class 10: Science, Commerce, or Arts?",
              excerpt: "A comprehensive guide on evaluating your psychological temperament and aptitude rather than peer pressure.",
              thumbnail: "/assets/images/blog/01.jpg",
              author: "KYP5 Counseling Wing",
              createdAt: new Date().toISOString(),
            },
            {
              id: "2",
              title: "Understanding the Holland RIASEC Code: What Your Personality Says About Your Job Fit",
              excerpt: "Explore how modern vocational psychology maps human interests to over 500+ emerging tech and design careers.",
              thumbnail: "/assets/images/blog/02.jpg",
              author: "Dr. Ananya Sharma",
              createdAt: new Date().toISOString(),
            },
            {
              id: "3",
              title: "Top 10 In-Demand Emerging Careers in India for the Next Decade (2026-2035)",
              excerpt: "From AI alignment to renewable energy economics, discover career fields with massive future growth.",
              thumbnail: "/assets/images/blog/03.jpg",
              author: "Prof. Rajesh Mehta",
              createdAt: new Date().toISOString(),
            },
          ]);
        }
      } catch (err) {
        console.warn("Using sample blogs", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Latest Articles"
          title="Career Insights & Research"
          subtitle="Explore our library of evidence-based psychological articles, student success guides, and national career outlooks."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => {
            const fallbackImg = `/assets/images/blog/0${(idx % 3) + 1}.jpg`;
            const imgSrc = resolveImageUrl(blog.thumbnail || blog.image, fallbackImg);

            return (
              <div
                key={blog.id || idx}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = fallbackImg;
                      }}
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(blog.createdAt || Date.now()).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {blog.author || "Counseling Wing"}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-[#0f172a] group-hover:text-[#1b93ad] transition-colors line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {blog.excerpt || blog.shortDescription || "Read full research article on psychometric assessments and career paths."}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                  <Link
                    to={`/our-blogs/${blog.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1b93ad] hover:text-[#136e82] transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/our-blogs"
            className="inline-flex items-center gap-2 bg-[#2d3748] hover:bg-[#1a202c] text-white font-bold px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-sm transition-all"
          >
            <span>Explore All Blog Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
