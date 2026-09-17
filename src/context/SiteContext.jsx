import React, { createContext, useContext, useEffect, useState } from "react";
import publicApi from "../api/publicApi";

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [siteConfig, setSiteConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchConfig = async () => {
    try {
      const res = await publicApi.getSiteConfig();
      if (res && res.data) {
        setSiteConfig(res.data);
      }
    } catch (err) {
      console.warn("Using default site branding configuration:", err.message);
      // Fallback defaults
      setSiteConfig({
        general: {
          orgName: "KYP5 — Know Your Potential, Personality, Progress & Path",
          orgShortName: "KYP5",
          orgPhone: "+91 83528 03233",
          orgEmail: "info@kyp5.com",
          orgAddress: "Educational Assessment & Career Guidance Headquarters, India",
        },
        branding: {
          primaryColor: "#0288d1",
          secondaryColor: "#0f172a",
          logoUrl: "/assets/images/logo/kyp5.png",
          siteName: "KYP5 Career Portal",
          tagline: "Know Your Potential, Personality, Progress & Path",
        },
        contact: {
          title: "Get In Touch With Career Experts",
          description: "Reach out to our certified psychometricians and student guidance counselors.",
          phone: "+91 83528 03233",
          email: "info@kyp5.com",
          address: "Sector 62, Institutional Area, Noida / New Delhi NCR",
        },
        footer: {
          about: "KYP5 is an advanced psychometric testing and scientific career guidance platform mapping human potential to optimal academic and professional paths.",
          socialLinks: {
            facebook: "https://facebook.com",
            instagram: "https://instagram.com",
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com",
          },
        },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <SiteContext.Provider value={{ siteConfig, loading, refreshConfig: fetchConfig }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => useContext(SiteContext);
export default SiteContext;
