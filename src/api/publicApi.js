import apiClient from "./client";

export const publicApi = {
  // Site Configuration & Branding
  getSiteConfig: () => apiClient.get("public/settings/site-config"),
  getSiteSettings: () => apiClient.get("public/settings/site"),
  getPrivacyPolicy: () => apiClient.get("public/settings/privacy-policy"),
  getTermsConditions: () => apiClient.get("public/settings/terms-conditions"),

  // Counters / Stats
  getCounters: () => apiClient.get("public/counters"),

  // Why Choose Us Cards
  getWhyChooseCards: () => apiClient.get("public/why-choose-cards"),

  // Pricing & Subscription Plans (B2B SaaS / School / Student)
  getPricingPlans: () => apiClient.get("public/pricing-plans"),
  getSaasPlans: () => apiClient.get("public/pricing-plans/saas"),

  // Tests Catalog
  getTests: (params) => apiClient.get("public/tests", { params }),
  getTestById: (id) => apiClient.get(`public/tests/${id}`),

  // Services & Solutions
  getServices: () => apiClient.get("public/services"),
  getServiceBySlug: (slug) => apiClient.get(`public/services/${slug}`),

  // Events & Webinars
  getEvents: (params) => apiClient.get("public/events", { params }),
  getEventById: (id) => apiClient.get(`public/events/${id}`),

  // Team & Psychologists
  getTeam: () => apiClient.get("public/teams"),

  // Testimonials
  getTestimonials: () => apiClient.get("public/testimonials"),

  // Gallery
  getGallery: (params) => apiClient.get("public/gallery", { params }),

  // Blogs & Categories
  getBlogs: (params) => apiClient.get("public/blogs", { params }),
  getBlogById: (id) => apiClient.get(`public/blogs/${id}`),
  getBlogCategories: () => apiClient.get("public/blog-categories"),

  // Help Center & Guides
  getHelpCenterGuides: (params) => apiClient.get("public/help-center", { params }),

  // Partners & Accreditations
  getPartners: () => apiClient.get("public/partners"),

  // Contact Form Submission
  sendContactMessage: (payload) => apiClient.post("public/contact", payload),

  // Newsletter Subscription
  subscribeNewsletter: (payload) => apiClient.post("public/newsletter", payload),

  // Institution Public Actions
  verifyReferralCode: (code) => apiClient.get(`public/institution/verify-referral/${code}`),
  registerInstitution: (payload) => apiClient.post("public/institution/register", payload),
};

export default publicApi;
