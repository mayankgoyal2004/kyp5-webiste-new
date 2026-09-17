import React from "react";
import { Mail, Phone, Facebook, Instagram, Linkedin, Award } from "lucide-react";
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
    <div className="bg-[#1b93ad] text-white text-xs font-semibold py-2 px-4 sm:px-6 lg:px-8 border-b border-cyan-600/30">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Contact Info + MSME */}
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-1.5 hover:text-cyan-100 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{email}</span>
          </a>

          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-1.5 hover:text-cyan-100 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{phone}</span>
          </a>

          <a
            href="https://kyp5.com/assets/upload/msme.pdf"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1 hover:text-cyan-100 transition-colors"
          >
            <Award className="w-3.5 h-3.5" />
            <span>MSME</span>
          </a>
        </div>

        {/* Right: Take Test Button + Socials */}
        <div className="flex items-center gap-4 sm:gap-6 ml-auto sm:ml-0">
          <Link
            to="/tests"
            className="bg-[#1e2348] hover:bg-[#141833] text-white text-[11px] font-bold px-3.5 py-1 rounded-md transition-colors shadow-xs"
          >
            Take Test
          </Link>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline text-[11px] text-cyan-100 font-medium">
              Follow Us On :
            </span>
            <div className="flex items-center gap-1.5">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-5 h-5 rounded-full bg-cyan-800/40 hover:bg-[#1877f2] flex items-center justify-center text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-3 h-3 fill-current" />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-5 h-5 rounded-full bg-cyan-800/40 hover:bg-pink-600 flex items-center justify-center text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-3 h-3" />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="w-5 h-5 rounded-full bg-cyan-800/40 hover:bg-[#0a66c2] flex items-center justify-center text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3 h-3 fill-current" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
