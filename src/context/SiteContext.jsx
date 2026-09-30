import React, { createContext, useContext, useEffect, useState } from "react";
import publicApi from "../api/publicApi";
import { extractItemData, resolveImageUrl } from "../utils/dataHelper";

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSiteConfig = async () => {
    try {
      setLoading(true);
      let res;
      try {
        res = await publicApi.getSiteConfig();
      } catch (e1) {
        try {
          res = await publicApi.getDirectSiteConfig();
        } catch (e2) {
          try {
            res = await publicApi.getSiteSettings();
          } catch (e3) {
            res = await publicApi.getDirectSiteSettings();
          }
        }
      }

      let data = extractItemData(res);
      if (data && typeof data === "object") {
        // Ensure data has unified structure
        const normalized = {
          ...data,
          branding: data.branding || data.data?.branding || {},
          general: data.general || data.data?.general || {},
          contact: data.contact || data.data?.contact || {},
          footer: data.footer || data.data?.footer || {},
          hero: data.hero || data.data?.hero || {},
          about: data.about || data.data?.about || {},
          whyChooseUs: data.whyChooseUs || data.data?.whyChooseUs || {},
        };
        // Provide backward compatible .data pointer
        normalized.data = normalized;
        setSiteData(normalized);

        // Dynamically update favicon if provided by backend
        const faviconUrl = normalized.branding?.faviconUrl || normalized.branding?.favIcon || normalized.branding?.logoUrl;
        if (faviconUrl) {
          const existingFavicon = document.querySelector("link[rel*='icon']");
          if (existingFavicon) {
            existingFavicon.href = resolveImageUrl(faviconUrl, "/assets/images/logo/fav-kyp5.png");
          }
        }

        // Dynamically update document title if provided
        const siteName = normalized.branding?.siteName || normalized.general?.orgShortName || "KYP5";
        const tagline = normalized.branding?.tagline || "Scientific Career Guidance";
        if (siteName) {
          document.title = `${siteName} — ${tagline}`;
        }
      }
    } catch (err) {
      console.warn("Using default site branding configuration:", err.message);
      // Fallback defaults matching authentic KYP5 branding
      const fallback = {
        general: {
          orgName: "KYP5 - Know Your Potential, Personality, Progress & Path",
          orgShortName: "KYP5",
          orgPhone: "+91 83528 03233",
          orgEmail: "info@kyp5.com",
          orgAddress: "Educational Assessment & Guidance Center, Sector 62, Institutional Area, Noida / New Delhi NCR",
          msmeDocUrl: import.meta.env.VITE_MSME_DOC_URL || `${(import.meta.env.VITE_WEBSITE_URL || (typeof window !== "undefined" ? window.location.origin : "https://kyp5.com")).replace(/\/+$/, "")}/assets/upload/msme.pdf`,
        },
        branding: {
          primaryColor: "#4f46e5",
          secondaryColor: "#0f172a",
          logoUrl: "/assets/images/logo/main-logo.png",
          logoDarkUrl: "/assets/images/logo/main-logo.png",
          siteName: "KYP5",
          tagline: "Scientific Career Guidance",
        },
        contact: {
          title: "Get In Touch With Career Experts",
          description: "Reach out to our certified psychometricians and student guidance counselors.",
          phone: "+91 83528 03233",
          email: "info@kyp5.com",
          address: "Educational Assessment & Guidance Center, Sector 62, Institutional Area, Noida / New Delhi NCR",
          workingHours: "Mon - Sat: 09:30 AM - 06:30 PM",
        },
        footer: {
          copyrightText: "© 2026 KYP5. All Rights Reserved.",
          about: "KYP5 (Know Your Potential, Personality, Progress & Path) is an advanced psychometric assessment and career guidance platform empowering students with data-driven career choices.",
          socialLinks: {
            facebook: "https://www.facebook.com/KnowYourP5/",
            instagram: "https://www.instagram.com/know_about_your_power",
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com",
          },
        },
        hero: {
          title: "Discover Your True Potential with Scientific Career Guidance",
          subtitle: "We provide the best tools for your success. Scientific psychometric mapping for stream selection, aptitude discovery, and career excellence.",
          ctaText: "Enroll School",
          ctaLink: "/for-schools",
          image: "/assets/hero.png",
        },
        about: {
          title: "Democratizing Scientific Career Guidance Across India",
          subtitle: "Know Your Potential, Personality, Progress & Path",
          description: "KYP5 was founded by career researchers, clinical psychologists, and educators to eliminate arbitrary stream selection and bring psychometric clarity to every Indian household.",
        },
        whyChooseUs: {
          title: "Engineered for Accuracy, Built for Students",
          subtitle: "Discover what sets our psychometric testing engine and career guidance algorithms apart from generic surveys.",
        },
      };
      fallback.data = fallback;
      setSiteData(fallback);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteConfig();
  }, []);

  return (
    <SiteContext.Provider
      value={{
        siteData,
        siteConfig: siteData, // Alias for backward compatibility
        loading,
        refreshConfig: fetchSiteConfig,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => useContext(SiteContext);
export default SiteContext;
