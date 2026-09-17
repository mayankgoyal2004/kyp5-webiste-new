import React from "react";
import { Mail, Phone, Handshake, Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useSite } from "../../context/SiteContext";

export default function TopBar() {
  const { siteConfig } = useSite();
  const phone = siteConfig?.contact?.phone || siteConfig?.general?.orgPhone || "+91 83528 03233";
  const email = siteConfig?.contact?.email || siteConfig?.general?.orgEmail || "info@kyp5.com";

  return (
    <div className="bg-[#1b93ad] text-white text-xs py-2 px-4 border-b border-white/10 relative z-30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left Information */}
        <div className="flex items-center gap-5 text-[12px] font-medium text-white/95">
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-white/90" />
            <span>{email}</span>
          </a>

          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-white/90" />
            <span>{phone}</span>
          </a>

          <a
            href="https://kyp5.com/assets/upload/msme.pdf"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Handshake className="w-3.5 h-3.5 text-white/90" />
            <span>MSME</span>
          </a>
        </div>

        {/* Right Information */}
        <div className="flex items-center gap-4 text-[12px]">
          <Link
            to="/tests"
            className="bg-[#2d3748] hover:bg-[#1a202c] text-white font-bold px-3.5 py-1 rounded-md transition-all text-[11px] tracking-wide"
          >
            Take Test
          </Link>

          <div className="flex items-center gap-2 text-white/90">
            <span className="hidden sm:inline text-xs font-semibold">Follow Us On :</span>
            <a
              href="https://www.facebook.com/KnowYourP5/"
              target="_blank"
              rel="noreferrer"
              className="w-6 h-6 rounded-full bg-[#1877f2] hover:opacity-90 flex items-center justify-center text-white transition-all"
              aria-label="Facebook"
            >
              <Facebook className="w-3 h-3 fill-current" />
            </a>
            <a
              href="https://www.instagram.com/know_about_your_power"
              target="_blank"
              rel="noreferrer"
              className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 hover:opacity-90 flex items-center justify-center text-white transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-3 h-3" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-6 h-6 rounded-full bg-[#0a66c2] hover:opacity-90 flex items-center justify-center text-white transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-3 h-3 fill-current" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
