import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import publicApi from "../api/publicApi";
import { useSite } from "../context/SiteContext";
import toast from "react-hot-toast";

export default function ContactUs() {
  const { siteData } = useSite();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const title = siteData?.contact?.title || "Get in Touch with Career Experts";
  const description =
    siteData?.contact?.description ||
    "Have a question about our psychometric assessments, school drives, or counseling sessions • We are here to help.";

  const phone = siteData?.contact?.phone || siteData?.general?.orgPhone || "+91 83528 03233";
  const email = siteData?.contact?.email || siteData?.general?.orgEmail || "info@kyp5.com";
  const address =
    siteData?.contact?.address ||
    siteData?.general?.orgAddress ||
    "Educational Assessment & Guidance Center, Sector 62, Institutional Area, Noida / New Delhi NCR";
  const workingHours = siteData?.contact?.workingHours || "Mon - Sat: 09:30 AM - 06:30 PM";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      await publicApi.sendContactMessage(formData);
      setSubmitted(true);
      toast.success("Thank you! Your message has been sent to our guidance counselors.");
    } catch (err) {
      toast.error(err.message || "Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHeading
        badge="Connect With Us"
        title={title}
        subtitle={description}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
            <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-4">
              Headquarters & Support Desk
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-[#1b93ad] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Telephone</div>
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="text-sm font-extrabold text-slate-800 hover:text-[#1b93ad] transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-[#1b93ad] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Official Email</div>
                  <a
                    href={`mailto:${email}`}
                    className="text-sm font-extrabold text-slate-800 hover:text-[#1b93ad] transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-[#1b93ad] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Center Address</div>
                  <p className="text-xs font-semibold text-slate-700 leading-relaxed mt-0.5">
                    {address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-[#1b93ad] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Counseling Hours</div>
                  <p className="text-xs font-semibold text-slate-700 mt-0.5">
                    {workingHours}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Message Received!</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Our counseling coordinators will review your query and contact you within 24 business hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", contactNumber: "", subject: "", message: "" });
                }}
                className="inline-block text-xs font-bold text-[#1b93ad] hover:text-[#136e82]"
              >
                Send Another Message →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
                Send a Guidance Inquiry
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ankit Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1b93ad]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. ankit@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1b93ad]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1b93ad]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Subject *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stream Selection Guidance"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1b93ad]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your student grade level, query, or institutional requirement..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1b93ad]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 bg-[#2995ac] hover:bg-[#207f94] text-white font-extrabold px-6 py-3 rounded-xl shadow-md transition-all text-xs disabled:opacity-50 cursor-pointer"
              >
                <span>{submitting ? "Sending Query..." : "Submit Inquiry"}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
