import React, { useEffect, useState } from "react";
import SectionHeading from "../components/common/SectionHeading";
import publicApi from "../api/publicApi";
import { extractItemData } from "../utils/dataHelper";
import RichTextContent from "../components/common/RichTextContent";

export default function TermsConditions() {
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        setLoading(true);
        const res = await publicApi.getTermsConditions();
        const data = extractItemData(res);
        if (data && (data.content || data.title)) {
          setDoc(data);
        } else {
          setDoc({
            title: "Terms & Conditions",
            subtitle: "Our system agreement, rules, and guidelines",
            content: "<h1>Terms & Conditions</h1><p>Welcome to <strong>Online Exam Platform</strong>!</p><p>These terms and conditions outline the rules and regulations for the use of Online Exam Platform's Website and Assessment systems.</p><p>By accessing this website we assume you accept these terms and conditions. Do not continue to use our platform if you do not agree to take all of the terms and conditions stated on this page.</p><h2>1. Intellectual Property Rights</h2><p>Other than the content you own, under these Terms, Online Exam Platform and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted a limited license only for purposes of viewing the material and participating in assigned online tests.</p><h2>2. Academic Integrity & Restrictions</h2><p>You are specifically restricted from all of the following:</p><ul><li>Publishing any test questions or answers in any other media</li><li>Selling, sublicensing, and/or otherwise commercializing any platform content</li><li>Engaging in any cheating, collusion, or external assistance during monitored examinations.</li></ul><p>Any violation of academic integrity will lead to immediate cancellation of your tests, voiding of result certificates, and suspension of your account.</p><h2>3. Limitation of Liability</h2><p>In no event shall Online Exam Platform, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website.</p>",
          });
        }
      } catch (e) {
        setDoc({
          title: "Terms & Conditions",
          subtitle: "Our system agreement, rules, and guidelines",
          content: "<h1>Terms & Conditions</h1><p>Welcome to <strong>Online Exam Platform</strong>!</p><p>These terms and conditions outline the rules and regulations for the use of Online Exam Platform's Website and Assessment systems.</p><p>By accessing this website we assume you accept these terms and conditions. Do not continue to use our platform if you do not agree to take all of the terms and conditions stated on this page.</p><h2>1. Intellectual Property Rights</h2><p>Other than the content you own, under these Terms, Online Exam Platform and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted a limited license only for purposes of viewing the material and participating in assigned online tests.</p><h2>2. Academic Integrity & Restrictions</h2><p>You are specifically restricted from all of the following:</p><ul><li>Publishing any test questions or answers in any other media</li><li>Selling, sublicensing, and/or otherwise commercializing any platform content</li><li>Engaging in any cheating, collusion, or external assistance during monitored examinations.</li></ul><p>Any violation of academic integrity will lead to immediate cancellation of your tests, voiding of result certificates, and suspension of your account.</p><h2>3. Limitation of Liability</h2><p>In no event shall Online Exam Platform, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website.</p>",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDoc();
  }, []);

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <SectionHeading
        badge="Legal & Agreement"
        title={doc?.title || "Terms & Conditions"}
        subtitle={doc?.subtitle || "Our system agreement, rules, and guidelines"}
      />

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
        {loading ? (
          <div className="min-h-[200px] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <RichTextContent content={doc?.content} />
        )}
      </div>
    </div>
  );
}
