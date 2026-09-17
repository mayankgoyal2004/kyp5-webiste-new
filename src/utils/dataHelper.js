/**
 * Utility functions for extracting API payloads and formatting media URLs.
 */

export const extractListData = (res) => {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data)) return res.data;
  if (res?.data && Array.isArray(res.data.data)) return res.data.data;
  if (res?.data && Array.isArray(res.data.items)) return res.data.items;
  if (Array.isArray(res?.items)) return res.items;
  return [];
};

export const extractItemData = (res) => {
  if (!res) return null;
  if (res.data !== undefined) return res.data;
  return res;
};

export const resolveImageUrl = (path, fallback = "/assets/images/common-kyp5.jpg") => {
  if (!path || typeof path !== "string" || path.trim() === "") return fallback;
  const clean = path.trim();
  if (clean.startsWith("http://") || clean.startsWith("https://") || clean.startsWith("data:")) {
    return clean;
  }
  const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:7777/api/";
  const origin = apiBase.replace(/\/api\/ • $/, "");
  const cleanPath = clean.startsWith("/") ? clean : `/${clean}`;
  return `${origin}${cleanPath}`;
};
