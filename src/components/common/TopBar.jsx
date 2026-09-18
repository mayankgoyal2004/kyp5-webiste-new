import React from "react";
import { Mail, Phone, Facebook, Instagram, Linkedin, ShieldCheck, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useSite } from "../../context/SiteContext";

export default function TopBar() {
  const { siteData } = useSite();

  const email = siteData?.contact?.email || siteData?.general?.orgEmail || "info@kyp5.com";
  const phone = siteData?.contact?.phone || siteData?.general?.orgPhone || "+91 83528 03233";
  const facebookUrl = siteData?.footer?.socialLinks?.facebook || "https://www.facebook.com/KnowYourP5/";
  const instagramUrl = siteData?.footer?.socialLinks?.instagram || "https://www.instagram.com/know_about_your_power";
  const linkedinUrl = siteData?.footer?.socialLinks?.linkedin || "https://linkedin.com";

  return (
    <div className="w-full print:hidden">
      {/* Tricolor top indicator stripe matching testpsychometric.com */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-white to-green-600"></div>

      {/* Sleek dark slate bar */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-slate-300 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 h-8">
          
          {/* Left: Accreditation & Mission */}
          <div className="flex items-center gap-3 truncate">
            <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/90 text-white">
              <ShieldCheck className="w-2.5 h-2.5" />
            </span>
            <p className="truncate text-xs">
              Scientific Assessment & Career Guidance Portal · <span className="font-semibold text-white">ISO 9001 & MSME Certified</span>
            </p>
          </div>

          {/* Right: Contact & Quick Links */}
          <div className="flex items-center gap-4 sm:gap-6 ml-auto">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-indigo-400" />
              <span>{phone}</span>
            </a>

            <a
              href={`mailto:${email}`}
              className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <span>{email}</span>
            </a>

            {/* Social Links */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-5 h-5 rounded-full bg-slate-800/80 hover:bg-[#1877f2] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-2.5 h-2.5 fill-current" />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-5 h-5 rounded-full bg-slate-800/80 hover:bg-pink-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-2.5 h-2.5" />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="w-5 h-5 rounded-full bg-slate-800/80 hover:bg-[#0a66c2] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-2.5 h-2.5 fill-current" />
              </a>
            </div>

            {/* Direct Quick Test Link */}
            <Link
              to="/tests"
              className="inline-flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] px-2.5 py-0.5 rounded-full transition-colors"
            >
              <span>Take Test</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
