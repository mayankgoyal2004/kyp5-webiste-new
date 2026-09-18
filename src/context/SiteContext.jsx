import React, { createContext, useContext, useEffect, useState } from "react";
import publicApi from "../api/publicApi";
import { extractItemData } from "../utils/dataHelper";

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSiteConfig = async () => {
    try {
      setLoading(true);
      const res = await publicApi.getSiteConfig();
      const data = extractItemData(res);
      if (data) {
        setSiteData(data);
      }
    } catch (err) {
      console.warn("Using default site branding configuration:", err.message);
      // Fallback defaults matching authentic KYP5 branding
      setSiteData({
        general: {
          orgName: "KYP5 - Know Your Potential, Personality, Progress & Path",
          orgShortName: "KYP5",
          orgPhone: "+91 83528 03233",
          orgEmail: "info@kyp5.com",
          orgAddress: "Educational Assessment & Guidance Center, Sector 62, Institutional Area, Noida / New Delhi NCR",
        },
        branding: {
          primaryColor: "#4f46e5",
          secondaryColor: "#0f172a",
          logoUrl: "/assets/images/logo/main-logo.png",
          logoDarkUrl: "/assets/images/logo/main-logo.png",
          siteName: "KYP5",
          tagline: "Know Your Power, Potential, Personality, Purpose, & Path",
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
          about: "KYP5 (Know Your Potential, Personality, Progress & Path) is an advanced psychometric assessment and career guidance platform empowering students with data-driven career choices.",
          socialLinks: {
            facebook: "https://www.facebook.com/KnowYourP5/",
            instagram: "https://www.instagram.com/know_about_your_power",
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com",
          },
        },
        hero: {
          title: "Welcome to our Platform",
          subtitle: "We provide the best tools for your success. Scientific psychometric mapping for stream selection, aptitude discovery, and career excellence.",
          ctaText: "Get Started",
          ctaLink: "/tests",
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
      });
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
