import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Send,
  ShieldCheck,
  Award,
  CheckCircle,
  MapPin
} from "lucide-react";
import { useSite } from "../../context/SiteContext";
import publicApi from "../../api/publicApi";
import { resolveImageUrl } from "../../utils/dataHelper";
import toast from "react-hot-toast";

export default function Footer() {
  const { siteData } = useSite();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const email = siteData?.contact?.email || siteData?.general?.orgEmail || "info@kyp5.com";
  const phone = siteData?.contact?.phone || siteData?.general?.orgPhone || "+91 83528 03233";
  const address = siteData?.contact?.address || "Educational Assessment & Guidance Center, Sector 62, Institutional Area, Noida / New Delhi NCR";
  const aboutText =
    siteData?.footer?.about ||
    "KYP5 (Know Your Potential, Personality, Progress & Path) is an advanced scientific psychometric assessment and career guidance platform empowering students, schools, and organizations with data-driven choices.";

  const logoSrc = resolveImageUrl(
    siteData?.branding?.logoDarkUrl || siteData?.branding?.logoUrl,
    "/assets/images/logo/main-logo.png"
  );

  const facebookUrl = siteData?.footer?.socialLinks?.facebook || "https://www.facebook.com/KnowYourP5/";
  const instagramUrl = siteData?.footer?.socialLinks?.instagram || "https://www.instagram.com/know_about_your_power";
  const linkedinUrl = siteData?.footer?.socialLinks?.linkedin || "https://linkedin.com";

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      setSubmitting(true);
      await publicApi.subscribeNewsletter({ email: newsletterEmail });
      toast.success("Subscribed successfully! Thank you for joining KYP5 updates.");
      setNewsletterEmail("");
    } catch (err) {
      toast.error(err.message || "Failed to subscribe. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800 print:hidden">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="p-1 rounded-lg bg-white inline-block">
                <img
                  src={logoSrc}
                  alt="KYP5 Logo"
                  className="h-8 w-auto object-contain"
                  onError={(e) => {
                    e.target.src = "/assets/images/logo/main-logo.png";
                  }}
                />
              </span>
              <span className="text-xl font-black text-white tracking-tight">
                KYP<span className="text-indigo-400">5</span>
              </span>
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed">
              {aboutText}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:bg-[#1877f2] hover:border-transparent text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 fill-current" />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:bg-pink-600 hover:border-transparent text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:bg-[#0a66c2] hover:border-transparent text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Explore Columns */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Explore Audiences
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/for-schools" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <span className="text-slate-500">›</span> For Schools & Institutions
                </Link>
              </li>
              <li>
                <Link to="/tests" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <span className="text-slate-500">›</span> Individual Psychometric Test
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <span className="text-slate-500">›</span> Pricing & School Plans
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <span className="text-slate-500">›</span> Guidance & Assessment Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/why-choose-us" className="hover:text-indigo-400 transition-colors">
                  Why Psychometric Testing?
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-indigo-400 transition-colors">
                  Trust & Accreditation
                </Link>
              </li>
              <li>
                <Link to="/our-blogs" className="hover:text-indigo-400 transition-colors">
                  Career Insights & Blog
                </Link>
              </li>
              <li>
                <Link to="/our-team" className="hover:text-indigo-400 transition-colors">
                  Certified Psychologists
                </Link>
              </li>
              <li>
                <Link to="/help-center" className="hover:text-indigo-400 transition-colors">
                  Help Center & FAQ
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-indigo-400 transition-colors">
                  Campus Drives Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Registered Office & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Registered Office
            </h4>
            
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>{phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>{email}</span>
              </li>
            </ul>

            <div className="pt-2">
              <p className="text-[11px] text-slate-400 mb-2 font-medium">Subscribe for career guidance updates</p>
              <form onSubmit={handleNewsletter} className="relative">
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="absolute right-1 top-1 bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer"
                  aria-label="Subscribe"
                >
                  <Send className="w-3 h-3" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Accreditation details line */}
        <div className="py-4 border-b border-slate-900 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-emerald-400" /> MSME Registered Institution
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-emerald-400" /> ISO 9001:2015 Quality Certified
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-emerald-400" /> Holland RIASEC & Gardner MI Model
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-emerald-400" /> Secure 256-bit Encrypted Portal
          </span>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {siteData?.general?.orgName || "KYP5 Assessment Portal"} · All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/contact-us" className="hover:text-slate-300 transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
