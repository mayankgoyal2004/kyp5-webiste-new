import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading";
import publicApi from "../api/publicApi";
import { useSite } from "../context/SiteContext";
import toast from "react-hot-toast";

export default function ContactUs() {
  const { siteConfig } = useSite();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const phone = siteConfig?.contact?.phone || "+91 83528 03233";
  const email = siteConfig?.contact?.email || "info@kyp5.com";
  const address = siteConfig?.contact?.address || "Educational Assessment & Guidance Center, Sector 62, Institutional Area, Noida / New Delhi NCR";

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
        title="Get in Touch with Career Experts"
        subtitle="Have a question about our psychometric assessments, school drives, or counseling sessions? We are here to help."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
            <h3 className="text-xl font-extrabold text-[#0f172a]">
              Direct Contact Channels
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">Phone & WhatsApp</div>
                  <a href={`tel:${phone.replace(/\s+/g, "")}`} className="font-bold text-slate-800 hover:text-cyan-600">
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">Official Inquiries</div>
                  <a href={`mailto:${email}`} className="font-bold text-slate-800 hover:text-cyan-600">
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">Guidance Center</div>
                  <p className="font-semibold text-slate-700 leading-relaxed">{address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">Operating Hours</div>
                  <p className="font-semibold text-slate-700">Monday – Saturday: 9:00 AM – 6:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">Message Delivered!</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Thank you for contacting KYP5. Our guidance counselors will review your message and reach back via phone or email within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", contactNumber: "", subject: "", message: "" });
                }}
                className="inline-block mt-4 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-extrabold text-[#0f172a] border-b border-slate-100 pb-3">
                Send a Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gurpreet Singh"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Subject *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. School Bulk Testing Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can our psychometric assessment and counseling team assist you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0288d1] hover:bg-[#0277bd] text-white font-bold px-8 py-3.5 rounded-2xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? "Sending..." : "Submit Inquiry"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
