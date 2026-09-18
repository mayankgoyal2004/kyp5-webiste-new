import React from "react";
import HeroSection from "../components/home/HeroSection";
import AudiencesSection from "../components/home/AudiencesSection";
import StatCounters from "../components/common/StatCounters";
import TrustSection from "../components/home/TrustSection";
import TestCategoriesSection from "../components/home/TestCategoriesSection";
import MethodologySection from "../components/home/MethodologySection";
import SampleReportPreview from "../components/home/SampleReportPreview";
import ForSchoolsBanner from "../components/home/ForSchoolsBanner";
import ServicesGrid from "../components/home/ServicesGrid";
import WhyChooseSection from "../components/home/WhyChooseSection";
import TeamSection from "../components/home/TeamSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import LatestBlogsSection from "../components/home/LatestBlogsSection";

export default function Home() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <AudiencesSection />
      <TrustSection />
      <TestCategoriesSection />
      <MethodologySection />
      <SampleReportPreview />
      <ForSchoolsBanner />
      <ServicesGrid />
      <WhyChooseSection />
      <TeamSection />
      <TestimonialsSection />
      <LatestBlogsSection />
    </div>
  );
}
