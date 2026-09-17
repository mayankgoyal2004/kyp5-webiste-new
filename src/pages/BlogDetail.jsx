import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import publicApi from "../api/publicApi";
import { extractItemData, resolveImageUrl } from "../utils/dataHelper";
import RichTextContent from "../components/common/RichTextContent";
import toast from "react-hot-toast";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await publicApi.getBlogById(id);
        const data = extractItemData(res);
        if (data && (data.title || data.id)) {
          setBlog(data);
        } else {
          setBlog({
            title: "How to Choose the Right Stream After Class 10: Science, Commerce, or Arts?",
            content: "Choosing your high school stream is one of the most critical foundational milestones in Indian education. Traditional advice often pushes students towards Science based purely on board percentages. However, psychometric research proves that sustained academic success depends far more on intrinsic interest and vocational aptitude than rote marks.\n\n### The Three Key Dimensions to Evaluate:\n1. **Aptitude Profile:** Do you exhibit strong numerical and abstract reasoning, or is your cognitive strength in language, critical thinking, and social dynamics?\n2. **Personality Alignment:** Introverted, research-oriented temperaments thrive in investigative STEM fields, whereas enterprising personalities often excel in commerce and business management.\n3. **Long-Term Career Viability:** Modern career landscapes now blend streams seamlessly—Bio-informatics, Fintech, and Digital Humanities offer high-growth avenues for interdisciplinary thinkers.",
            author: "KYP5 Counseling Wing",
            createdAt: new Date().toISOString(),
          });
        }
      } catch (e) {
        setBlog({
          title: "How to Choose the Right Stream After Class 10: Science, Commerce, or Arts?",
          content: "Choosing your high school stream is one of the most critical foundational milestones in Indian education. Traditional advice often pushes students towards Science based purely on board percentages. However, psychometric research proves that sustained academic success depends far more on intrinsic interest and vocational aptitude than rote marks.\n\n### The Three Key Dimensions to Evaluate:\n1. **Aptitude Profile:** Do you exhibit strong numerical and abstract reasoning, or is your cognitive strength in language, critical thinking, and social dynamics?\n2. **Personality Alignment:** Introverted, research-oriented temperaments thrive in investigative STEM fields, whereas enterprising personalities often excel in commerce and business management.\n3. **Long-Term Career Viability:** Modern career landscapes now blend streams seamlessly—Bio-informatics, Fintech, and Digital Humanities offer high-growth avenues for interdisciplinary thinkers.",
          author: "KYP5 Counseling Wing",
          createdAt: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#1b93ad] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const fallbackImg = "/assets/images/blog/01.jpg";
  const imgSrc = resolveImageUrl(blog?.thumbnail || blog?.image, fallbackImg);

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Link
        to="/our-blogs"
        className="inline-flex items-center gap-2 text-xs font-bold text-[#1b93ad] hover:text-[#136e82]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Articles</span>
      </Link>

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(blog?.createdAt || Date.now()).toLocaleDateString("en-IN", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {blog?.author || "KYP5 Clinical Psychologists"}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0f172a] leading-tight">
          {blog?.title}
        </h1>

        {imgSrc && (
          <div className="rounded-2xl overflow-hidden max-h-96 w-full">
            <img
              src={imgSrc}
              alt={blog?.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = fallbackImg;
              }}
            />
          </div>
        )}

        <div className="pt-4">
          <RichTextContent content={blog?.content || blog?.description || blog?.excerpt} />
        </div>
      </div>
    </div>
  );
}
