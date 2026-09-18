import React, { useEffect, useState } from "react";
import SectionHeading from "../components/common/SectionHeading";
import publicApi from "../api/publicApi";
import { extractItemData } from "../utils/dataHelper";
import RichTextContent from "../components/common/RichTextContent";

export default function PrivacyPolicy() {
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        setLoading(true);
        const res = await publicApi.getPrivacyPolicy();
        const data = extractItemData(res);
        if (data && (data.content || data.title)) {
          setDoc(data);
        } else {
          setDoc({
            title: "Privacy Policy",
            subtitle: "How we safeguard and treat your personal data",
            content: "<h1>Privacy Policy</h1><p>At <strong>KYP5 Assessment Portal</strong>, we are deeply committed to safeguarding student and institutional privacy.</p><h2>1. Data Collection & Purpose</h2><p>We collect basic student demographic details (Name, Age, School, Class) and assessment question responses strictly for the algorithmic computation of aptitude and personality reports.</p><h2>2. Zero Commercial Advertising & Sale of Data</h2><p>KYP5 will <strong>NEVER</strong> sell, rent, or trade student assessment data to third-party advertisers or external marketing entities.</p><h2>3. Institutional Access</h2><p>If an assessment is undertaken using a verified school referral code, authorized counselors and administrators of that specific school will have access to student performance snapshots for guidance purposes only.</p><h2>4. Security & Encryption</h2><p>All communication is protected by industry-standard 256-bit SSL encryption and cloud-level database isolation.</p>",
          });
        }
      } catch (e) {
        setDoc({
          title: "Privacy Policy",
          subtitle: "How we safeguard and treat your personal data",
          content: "<h1>Privacy Policy</h1><p>At <strong>KYP5 Assessment Portal</strong>, we are deeply committed to safeguarding student and institutional privacy.</p><h2>1. Data Collection & Purpose</h2><p>We collect basic student demographic details (Name, Age, School, Class) and assessment question responses strictly for the algorithmic computation of aptitude and personality reports.</p><h2>2. Zero Commercial Advertising & Sale of Data</h2><p>KYP5 will <strong>NEVER</strong> sell, rent, or trade student assessment data to third-party advertisers or external marketing entities.</p><h2>3. Institutional Access</h2><p>If an assessment is undertaken using a verified school referral code, authorized counselors and administrators of that specific school will have access to student performance snapshots for guidance purposes only.</p><h2>4. Security & Encryption</h2><p>All communication is protected by industry-standard 256-bit SSL encryption and cloud-level database isolation.</p>",
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
        badge="Legal & Compliance"
        title={doc?.title || "Privacy Policy"}
        subtitle={doc?.subtitle || "How we safeguard and protect your personal information"}
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
