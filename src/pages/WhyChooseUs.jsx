import React from "react";
import WhyChooseSection from "../components/home/WhyChooseSection";
import MethodologySection from "../components/home/MethodologySection";
import SampleReportPreview from "../components/home/SampleReportPreview";

export default function WhyChooseUs() {
  return (
    <div className="py-8 space-y-8">
      <WhyChooseSection />
      <MethodologySection />
      <SampleReportPreview />
    </div>
  );
}
