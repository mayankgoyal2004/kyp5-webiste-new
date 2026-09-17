import React from "react";
import WhyChooseSection from "../components/home/WhyChooseSection";
import TeamSection from "../components/home/TeamSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import { useSite } from "../context/SiteContext";
import RichTextContent from "../components/common/RichTextContent";

export default function WhyChooseUs() {
  const { siteData } = useSite();

  const title = siteData?.whyChooseUs?.title || "Engineered for Accuracy, Built for Students";
  const subtitle =
    siteData?.whyChooseUs?.subtitle ||
    "Discover what sets our psychometric testing engine and career guidance algorithms apart from generic surveys.";
  const description = siteData?.whyChooseUs?.description;

  return (
    <div className="py-8 space-y-12">
      {description && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{title}</h2>
            <RichTextContent content={description} />
          </div>
        </section>
      )}

      {/* Main Why Choose Grid */}
      <WhyChooseSection />

      {/* Verified Reviews */}
      <TestimonialsSection />

      {/* Expert Advisory Team */}
      <TeamSection />
    </div>
  );
}
