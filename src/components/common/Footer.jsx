import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Send,
  Sparkles
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
  const aboutText =
    siteData?.footer?.about ||
    "KYP5 (Know Your Potential, Personality, Progress & Path) is an advanced psychometric assessment and career guidance platform empowering students with data-driven career choices.";

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
    <footer className="bg-[#0b1b2b] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img
                src={logoSrc}
                alt="KYP5 Logo"
                className="h-11 w-auto object-contain brightness-0 invert"
                onError={(e) => {
                  e.target.src = "/assets/images/logo/main-logo.png";
                }}
              />
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed">
              {aboutText}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-[#1877f2] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5 fill-current" />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-[#0a66c2] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5 fill-current" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about-us" className="hover:text-[#1b93ad] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/why-choose-us" className="hover:text-[#1b93ad] transition-colors">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#1b93ad] transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/our-team" className="hover:text-[#1b93ad] transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/our-blogs" className="hover:text-[#1b93ad] transition-colors">
                  Our Blogs
                </Link>
              </li>
              <li>
                <Link to="/help-center" className="hover:text-[#1b93ad] transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Assessments & Activities */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Assessments
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/tests" className="hover:text-[#1b93ad] transition-colors">
                  Assessment Catalog
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#1b93ad] transition-colors">
                  Campus Drives Gallery
                </Link>
              </li>
              <li>
                <Link to="/upcoming-events" className="hover:text-[#1b93ad] transition-colors">
                  Upcoming Events & Workshops
                </Link>
              </li>
              <li>
                <Link to="/student/dashboard" className="hover:text-[#1b93ad] transition-colors">
                  Student Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-xs text-slate-400">
              Subscribe for career guidance updates, stream selection tips, and scholarships.
            </p>

            <form onSubmit={handleNewsletter} className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1b93ad]"
              />
              <button
                type="submit"
                disabled={submitting}
                className="absolute right-1.5 top-1.5 bg-[#2995ac] hover:bg-[#207f94] text-white p-1.5 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                aria-label="Subscribe"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="pt-2 text-xs space-y-1 text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#1b93ad] shrink-0" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#1b93ad] shrink-0" />
                <span>{email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {siteData?.general?.orgName || "KYP5 Assessment Portal"}. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/contact-us" className="hover:text-slate-300 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
